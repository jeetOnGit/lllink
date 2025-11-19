"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   if (session?.user?.username) {
  //     setUser(session?.user?.username);
  //   }
  // }, [session]);

  const pathName = usePathname();
  const shwoNavBar = ["/", "/generate"].includes(pathName);

  return (
    <>
      {shwoNavBar && (
        <nav className="bg-white w-[80vw] mx-auto fixed top-5 right-[10vw] py-3 px-5 rounded-full flex justify-between border">
          <div className="logo flex gap-15 items-center">
            <Link href="/">
              <img
                loading="eager"
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
                alt=""
                className="nav-desktop-logo h-8 max-[640px]:h-4"></img>
            </Link>

            <ul className="flex gap-2 text-sm max-[996px]:hidden">
              <Link href="/">
                <li>Templates</li>
              </Link>
              <Link href="/">
                <li>Marketplace</li>
              </Link>
              <Link href="/">
                <li>Discover</li>
              </Link>
              <Link href="/">
                <li>Pricing</li>
              </Link>
              <Link href="/">
                <li>Learn</li>
              </Link>
            </ul>
          </div>

         {status === "loading" && (
            <div className="flex gap-3 items-center">
              <p>Loading...</p>
            </div>
          )}

          {/* 2. Authenticated State */}
          {status === "authenticated" && (
            <div className="flex gap-3 items-center">
              <p>Hi, {session.user.username || session.user.name}</p>
              <button
                className="bg-gray-300 rounded-lg px-6 py-3 cursor-pointer max-[640px]:px-3 max-[640px]:py-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Log out
              </button>
            </div>
          )}

          {/* 3. Unauthenticated State */}
          {status === "unauthenticated" && (
            <div className="flex gap-3">
              <Link
                className="bg-gray-300 rounded-lg px-6 py-3 max-[640px]:px-3 max-[640px]:py-2"
                href="/login"
              >
                Log in
              </Link>
              <Link
                className="bg-gray-800 px-8 py-3 rounded-full text-white max-[640px]:px-3 max-[640px]:py-2"
                href="/register"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
