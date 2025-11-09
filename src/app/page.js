"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () =>{
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#2665d6] min-h-screen grid grid-cols-2">
        <div className="flex items-center justify-center flex-col mx-[10vw] gap-3">
          <h2 className="text-[#d2e823] text-5xl font-extrabold">A link in bio built for you.</h2>
          <p className="text-[#d2e823] text-">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

          <div className="flex gap-4 justify-start">
            <input value={text} onChange={(e) => setText(e.target.value)} type="text" className="bg-white rounded-md py-2 px-4 focus:outline" placeholder="your link" />
            <button onClick={()=>createTree()}><Link className="bg-[#d2e823] rounded-full px-3 py-3 text-black font-semibold" href='/generate'>Get started for free</Link></button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col mr-[10vw] mt-[2vw]">
          <img src="images/ss.PNG" alt="" />
        </div>
      </section>

      <section className="bg-green-700 min-h-screen grid grid-cols-2">
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="images/ss.PNG" alt="" />
        </div>

        <div className="flex items-center justify-center flex-col mx-[10vw] gap-3">
          <h2 className="text-[#d2e823] text-5xl font-extrabold">A link in bio built for you.</h2>
          <p className="text-[#d2e823] text-">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

          <div className="flex gap-4 justify-start">
            <input type="text" className="bg-white rounded-md py-2 px-4 focus:outline" placeholder="linktree.ee/" />
            <button><Link className="bg-[#d2e823] rounded-full px-3 py-3 text-black font-semibold" href='/generate'>Get started for free</Link></button>
            
          </div>
        </div>
      </section>
    </main>
  );
}
