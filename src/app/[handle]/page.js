import Link from "next/link";
import { notFound } from "next/navigation";
import clientPromise from "../../../lib/mongodb"; 


export default async function Page({ params }) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  if (!handle) {
    notFound();
  }
  const client = await clientPromise;
  const db = client.db("linktree");
  const user = await db.collection("users").findOne({
    username: { $regex: new RegExp(`^${handle}$`, "i") },
  });

  if (!user) {
    notFound();
  }
  // let profilePic = user.pic; // Get pic from the users table

  // if (!profilePic) {
  //   // If user.pic is empty, try to find it in the accounts table
  //   console.log("User 'pic' is empty, checking 'accounts' collection...");
  //   const account = await db
  //     .collection("accounts")
  //     .findOne({ userId: user._id.toString() });

  //   if (account && account.image) {
  //     profilePic = account.image; // Use the image from the accounts table
  //     console.log("Found image in 'accounts':", profilePic);
  //   } else {
  //     console.log("No image found in 'accounts' collection.");
  //   }
  // }
  const bio =
    "This is my bio! I love creating content and sharing my links with the world.";

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center py-12">
      <div className="flex flex-col gap-6 w-full max-w-md px-4">
        {/* Profile Info Section */}
        <div className="flex flex-col items-center gap-3">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={user.pic || "images/user.png"} 
            alt={`${user.username}'s profile picture`}
          />
          <h1 className="font-bold text-2xl text-gray-900">
            @{user.username}
          </h1>
          <p className="text-center text-gray-600">{bio}</p>
        </div>

        {/* Links Section */}
        <div className="w-full">
          <ul className="flex flex-col items-center gap-4">
            {user.links?.length > 0 ? (
              user.links.map((link, index) => (
                <li key={index} className="w-full">
                  <a
                    href={link.link} // Use 'link' from your schema
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white text-gray-800 font-semibold py-4 px-5 rounded-lg text-center shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    {link.linkText} {/* Use 'linkText' from your schema */}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">
                This user hasn't added any links yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}