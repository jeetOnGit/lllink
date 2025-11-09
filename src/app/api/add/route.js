import clientPromise from "../../../../lib/mongodb";


export async function POST(request) {
  const body = await request.json()
  const {username, links, pic } = body;
  
  const client = await clientPromise;
  const db = client.db("linktree");

  const result = await db.collection("users").updateOne(
    { username: username.toLowerCase() },
    {
      $set: { pic },
      $push: { links: {$each: links}}
    }


  )

  if(result.matchCount === 0){
    return Response.json({ success: false, message: "User not found" })
  }

  return Response.json({success: true, error: false, message: "links added",})
}