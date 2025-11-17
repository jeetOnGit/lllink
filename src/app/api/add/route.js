import clientPromise from "../../../../lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const { username, links, pic } = body;

  const client = await clientPromise;
  const db = client.db("linktree");
  const normalizedUsername = username.toLowerCase();
  const result = await db.collection("users").updateOne(
    { username: normalizedUsername },
    {
      $set: { pic },
      $addToSet: { links: { $each: links } },
    },
    { upsert: true }
  );

  if (result.matchedCount === 0) {
    return Response.json({ success: false, message: "User not found" });
  }

  return Response.json({ success: true, error: false, message: "links added" });
}
