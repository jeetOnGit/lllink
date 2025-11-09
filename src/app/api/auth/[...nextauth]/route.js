import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../../lib/mongodb";
import { compare } from "bcryptjs";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    // For Auth Providers

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // For userName and Password

    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("linktree");
        const user = await db.collection("users").findOne({
          username: { $regex: new RegExp(`^${credentials.username}$`, "i") },
        });

        if (!user) throw new Error("No user found with that username");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      },

      
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.username = user.username;
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
