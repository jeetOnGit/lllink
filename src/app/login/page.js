"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/generate",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="p-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Login</button>
      </form>

      <button
        onClick={() => signIn("google", { callbackUrl: "/generate" })}
        className="mt-4 bg-red-500 text-white rounded p-2"
      >
        Continue with Google
      </button>
    </div>
  );
}
