
// [handle]/page.js
import Link from "next/link";
import clientPromise from "../../../lib/mongodb";



export default async function Page({ params }) {

  const { handle } = await params;
  const client = await clientPromise;
  const db = client.db("linktree");
  const user = await db.collection("users").findOne({ username: handle.toLowerCase() });
  
  if (!user) {
    return <div className="text-center text-red-500">User not found <Link href='/login'>Try Login</Link></div>;
  }


  return <div className="flex min-h-screen bg-white justify-center items-center">
    <div className="flex flex-col justify-between gap-2 w-[50vw]   py-12 rounded-md">
      <div className="flex flex-col justify-between items-center gap-3">
        <img className="w-12 h-12" src={user.pic || "vercel.svg"} alt="Processing Picture" />
        <h5 className="font-semibold text-2xl">@{user.username}</h5>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="py-12">
        <ul className="flex flex-col items-center gap-5">
          {user.links?.map((i, index) => {
            return <li key={index} className=""><a href={i.link} className="bg-white text-black py-2 px-5 rounded-md">{i.linkText}</a></li>
          })}
        </ul>
      </div>
    </div>



  </div>;
}
