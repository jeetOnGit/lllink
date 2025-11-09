"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome, {session.user.username || session.user.email}</p>
    </div>
  );
}
