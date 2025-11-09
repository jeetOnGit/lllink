import clientPromise from "../../../../lib/mongodb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db("linktree");

  const existing = await db.collection("users").findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (existing) {
    return NextResponse.json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await hash(password, 10);

  await db.collection("users").insertOne({
    username,
    email,
    password: hashedPassword,
    pic:"",
    links:[],
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, message: "User registered successfully" });
}
