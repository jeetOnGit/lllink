"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const {data: session} = useSession()

    const userPic = session?.user?.username;

  const pathName = usePathname();
  const shwoNavBar = ["/", "/generate"].includes(pathName);
  
  return (
    <>
      {shwoNavBar && (
        <nav className="bg-white w-[80vw] mx-auto fixed top-5 right-[10vw] py-3 px-5 rounded-full flex justify-between">
          <div className="logo flex gap-15 items-center">
            <Link href="/">
              <img
                loading="eager"
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
                alt=""
                className="nav-desktop-logo h-8"></img>
            </Link>

            <ul className="flex gap-2 text-sm">
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

         {
          userPic ?
          <p>Hi, {userPic}</p>
          :
           <div className="flex gap-3">
            <button><Link className="bg-gray-300 rounded-lg px-6 py-3" href='/'>Log in</Link></button>
            <button className="">
              <Link className="bg-gray-800 px-8 py-3 rounded-full text-white" href='/'>
              Sign up
              </Link>
            </button>
          </div>
         }


        </nav>
      )}
    </>
  );
};

export default Navbar;
