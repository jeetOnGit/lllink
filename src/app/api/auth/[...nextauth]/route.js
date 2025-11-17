import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
import { compare } from "bcryptjs";

// --- KEY CHANGE #1: Define the adapter *outside* the handler ---
// This allows us to modify its methods
const dbAdapter = MongoDBAdapter(clientPromise, {
  collections: {
    Users: "users",
    Accounts: "accounts",
  },
});

const handler = NextAuth({
  // --- KEY CHANGE #2: Override the adapter's default 'createUser' method ---
  adapter: {
    ...dbAdapter, // Import all default adapter methods

    // Now, we replace 'createUser' with our own logic
    async createUser(user) {
      // 'user' is the default object from Google: { name, email, image }
      const client = await clientPromise;
      const db = client.db("linktree");

      // 1. Create a username from the Google name or email
      const baseName = user.name || user.email.split("@")[0];
      const username = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");

      // 2. Build *your* custom user object
      const customUser = {
        username: username,
        email: user.email,
        password: null, // No password for Google users
        pic: user.image || "",
        links: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 3. Insert your custom user into the 'users' collection
      const result = await db.collection("users").insertOne(customUser);
      
      const newUserId = result.insertedId;

      // 4. Return the user in the format NextAuth's adapter *expects*
      // We map our custom fields back to the 'AdapterUser' type
      return {
        id: newUserId.toString(),
        email: customUser.email,
        emailVerified: null, // Default to null as Google provides this
        name: customUser.username, // Map 'username' to 'name'
        image: customUser.pic, // Map 'pic' to 'image'
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  allowDangerousEmailAccountLinking: true,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("linktree");

        const user = await db.collection("users").findOne({
          username: { $regex: new RegExp(`^${credentials.username}$`, "i") },
        });

        if (!user) throw new Error("No user found with that username");

        // --- GOOD PRACTICE: Check for null password ---
        // This stops Google users from trying to log in with credentials
        if (!user.password) throw new Error("Please log in with your Google account");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // This return value is passed to the 'jwt' callback 'user' object
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          image: user.pic || null,
        };
      },
    })
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: { strategy: "jwt" },

  callbacks: {
    // We removed the 'signIn' callback here.
    // The adapter + allowDangerousEmailAccountLinking handles linking.
    // Our custom 'createUser' handles new users.

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // This logic correctly gets the username from *both* providers:
        // 1. From Credentials: 'user.username' will exist
        // 2. From Google: 'user.name' (which we mapped from 'username') will exist
        token.username = user.username || user.name || token.username; 
        token.email = user.email || token.email;
        token.picture = user.image || token.picture;
   }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.includes("/generate")) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/generate`;
    }
  }
});

export { handler as GET, handler as POST };