"use client";

import { useSession } from "next-auth/react";
// import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Generate = () => {

  const {data: session} = useSession()

  const username = session?.user?.username;
  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false)


  const handleChange = (index, link, linkText) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linkText };
        } else {
          return item;
        }
      });
    });
  };

  const addLink = () => {
    setLinks(links.concat({ link: "", linkText: "" }));
  };

  const submitLink = async () => {
    if (!username) {
      toast.error("Please log in first!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          links,
          pic,
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linkText: "" }]);
        setPic("");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("❌ Error submitting link:", err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2665d6] min-h-screen grid grid-cols-2 pt-6">
      <div className="text-white flex flex-col justify-center items-left ps-20">
        <h1 className="font-semibold text-4xl">Generate Your Master Link!</h1>
        <ToastContainer />
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Your Handle (Auto-filled from login)</label>
            <input
              value={username || ""}
              disabled
              className="bg-white rounded-lg py-2 px-2 text-black focus:outline-none"
              placeholder={username}
              type="text"
              name=""
              id=""
            />
          </div>

          {/* <div className="flex flex-col gap-1"></div> */}

          <div className="flex flex-col gap-1">
            <label htmlFor="">Enter Your Link</label>
            {links &&
              links.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col w-full justify-between gap-1">
                    <input
                      value={item.link || ""}
                      onChange={(e) => {
                        handleChange(index, e.target.value, item.linkText);
                      }}
                      className="bg-white rounded-lg py-2 px-2 text-black focus:outline-none"
                      placeholder="Your Link e.g https://www.google.com/"
                      type="text"
                      name=""
                      id=""
                    />
                    <input
                      value={item.linkText || ""}
                      onChange={(e) => {
                        handleChange(index, item.link, e.target.value);
                      }}
                      className="bg-white rounded-lg py-2 px-2 text-black focus:outline-none"
                      placeholder="Your text"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                );
              })}

            <button
              onClick={() => addLink()}
              className="bg-black text-white px-6 py-2 rounded-full cursor-pointer text-left w-fit">
              + Add link
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {/* <label htmlFor="">Your Picture Link</label>
            <input
              value={pic || ""}
              onChange={(e) => {
                setPic(e.target.value);
              }}
              className="bg-white rounded-lg py-2 px-2 text-black focus:outline-none"
              placeholder="Link for your picture"
              type="text"
              name=""
              id=""
            /> */}
            <button
              onClick={()=>submitLink()}
              disabled={loading}
              className={`bg-black text-white w-fit px-6 py-2 rounded-full mt-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Create Master Link"}
            </button>
          </div>
        </div>
      </div>

      <div className="h-full">
        <img className="mt-[5vw]" src="images/ss.PNG" alt="" />
      </div>
    </div>
  );
};

export default Generate;
