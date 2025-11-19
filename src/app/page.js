"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
    const {data: session} = useSession()
  
  const router = useRouter();
  const [handle, setHandle] = useState("")
  const [text, setText] = useState("");

  useEffect(() => {
    if(session?.user?.username){
      setHandle(session.user.username)
    }
    
  }, [session])

  const createTree = () => {
    if (text.trim() === "") return;
    router.push(`/generate?handle=${text.trim().toLowerCase()}`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-linear-to-b from-white via-gray-50 to-gray-100 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-center pt-[12vw] px-[8vw] py-20 gap-10 max-[570px]:pt-20">
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 max-[570px]:text-2xl">
            Share everything you <span className="text-blue-600">create</span> — 
            with one link.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Build your personalized bio link in seconds. Connect all your social media, content, and products in one place — beautifully.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 justify-center lg:justify-start">
            <input
              value={handle || ""}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className="bg-white text-black border border-gray-300 rounded-full py-3 px-6 w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your-handle"
            />
            <button
              onClick={createTree}
              className="bg-blue-600 text-white font-semibold rounded-full px-6 py-3 hover:bg-blue-700 transition cursor-pointer"
            >
              Create your page
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://illustrations.popsy.co/white/online-shopping.svg"
            alt="Bio link illustration"
            className="w-[400px] lg:w-[500px] max-[570px]:w-[300px]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-[8vw] bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Why creators love Linktree Clone
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center gap-3">
            <img
              src="images/allinone.jpg"
              alt="Connect everything"
              className="w-32 h-32"
            />
            <h3 className="text-xl font-semibold text-gray-800">All links in one place</h3>
            <p className="text-gray-600">
              Combine all your social, work, and personal links into a single clean profile.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <img
              src="images/setup.jpg"
              alt="Simple setup"
              className="w-32 h-32"
            />
            <h3 className="text-xl font-semibold text-gray-800">Simple & instant setup</h3>
            <p className="text-gray-600">
              Type your handle, pick your style, and launch your page — no coding required.
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <img
              src="images/grow_ill.jpg"
              alt="Grow audience"
              className="w-32 h-32"
            />
            <h3 className="text-xl font-semibold text-gray-800">Grow your audience</h3>
            <p className="text-gray-600">
              Use analytics to track your clicks and see what your followers love most.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-center py-20 px-[8vw]">
        <h2 className="text-4xl font-extrabold mb-6">
          Start your journey with one simple link.
        </h2>
        <p className="text-lg mb-8 text-blue-100">
          It’s free, fast, and powerful — whether you’re an artist, creator, or entrepreneur.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="bg-white text-black rounded-full py-3 px-6 w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="your-handle"
          />
          <button
            onClick={createTree}
            className="bg-yellow-400 text-black font-semibold rounded-full px-6 py-3 hover:bg-yellow-300 transition cursor-pointer"
          >
            Get started free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-2">lllink</h3>
            <p className="text-sm text-gray-500">
              Made with ❤️ by Jeet using Next.js
            </p>
          </div>

          <ul className="flex gap-6 text-sm">
            <Link href="https://jeetonweb.netlify.app/" className="hover:text-white">Portfolio</Link>
            <Link href="https://www.linkedin.com/in/connectwithjeet/" className="hover:text-white">Contact</Link>
            <Link href="https://github.com/jeetOnGit/lllink" className="hover:text-white">GitHub</Link>
          </ul>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} Linktree Clone. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
