"use client";

import Navbar from "@/components/Navbar";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-black/90 backdrop-blur-sm px-6 py-12 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#1a1a1a] border border-purple-500/30 p-10 rounded-xl shadow-lg">
       <div className="flex items-center justify-center mb-6">
              <Info className="w-8 h-8 text-pink-400 mr-2" />
              <h1 className="text-4xl font-bold text-purple-200 text-center">
                About ReWear
              </h1>
            </div>
        <p className="text-purple-300 text-lg leading-relaxed">
          <span className="text-white font-semibold">ReWear</span> is more than
          just a clothing exchange platform — it's a movement toward sustainable
          fashion and conscious living. We aim to reduce textile waste by
          enabling users to easily swap or donate their unused clothes through a
          seamless, user-friendly interface.
        </p>
        <p className="text-purple-300 text-lg mt-4 leading-relaxed">
          Whether you're cleaning out your closet or looking for something
          stylish and pre-loved, ReWear helps you connect with a community that
          shares the same eco-friendly mindset.
        </p>
        <p className="text-purple-300 text-lg mt-4 leading-relaxed">
          Join us in making fashion circular — one swap at a time.
        </p>
      </div>
    </div>
    </>
  );
}
