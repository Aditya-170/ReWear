"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const swaps = [
    {
        id: "SWP001",
        user1: "Anjali Kapoor",
        user2: "Rahul Singh",
        product1: { title: "Denim Jacket", image: "/item1.jpg" },
        product2: { title: "Leather Boots", image: "/item4.jpg" },
    },
    {
        id: "SWP0as02",
        user1: "Sneha Joshi",
        user2: "Priya Mehta",
        product1: { title: "Wool Sweater", image: "/item3.jpg" },
        product2: { title: "Flannel Shirt", image: "/item2.jpg" },
    },
    {
        id: "SasWP002",
        user1: "Sneha Joshi",
        user2: "Priya Mehta",
        product1: { title: "Wool Sweater", image: "/item3.jpg" },
        product2: { title: "Flannel Shirt", image: "/item2.jpg" },
    },
    {
        id: "SWP00as2",
        user1: "Sneha Joshi",
        user2: "Priya Mehta",
        product1: { title: "Wool Sweater", image: "/item3.jpg" },
        product2: { title: "Flannel Shirt", image: "/item2.jpg" },
    },
    {
        id: "SfdWP002",
        user1: "Sneha Joshi",
        user2: "Priya Mehta",
        product1: { title: "Wool Sweater", image: "/item3.jpg" },
        product2: { title: "Flannel Shirt", image: "/item2.jpg" },
    },
    {
        id: "SWP00asdd2",
        user1: "Sneha Joshi",
        user2: "Priya Mehta",
        product1: { title: "Wool Sweater", image: "/item3.jpg" },
        product2: { title: "Flannel Shirt", image: "/item2.jpg" },
    },
    // Add more swap entries if needed
];

export default function SwapsPage() {
    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-[#140024] to-[#2d0052] text-white px-6 pt-24 py-10 min-h-screen">
                <div className="max-w-6xl mx-auto mb-10">
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-pink-400">
                        My Swaps
                    </h2>
                    <div className="space-y-6">
                        {swaps.map((swap) => (
                            <div
                                key={swap.id}
                                className="bg-[#1f012f] border border-purple-700 rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-pink-500/20 transition-shadow"
                            >
                                <div className="flex-1">
                                    <p className="text-pink-400 font-bold text-sm mb-2">
                                        Swap ID: {swap.id}
                                    </p>
                                    <p className="text-white text-sm">
                                        <span className="text-purple-300">{swap.user1}</span> swapped with{' '}
                                        <span className="text-purple-300">{swap.user2}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap justify-center">
                                    <div className="text-center">
                                        <img
                                            src={"/img4.png"}
                                            alt={swap.product1.title}
                                            className="w-24 h-24 object-cover rounded-md border border-pink-400"
                                        />
                                        <p className="text-xs mt-1 text-white">{swap.product1.title}</p>
                                    </div>
                                    <p className="text-xl font-bold text-pink-300">⇄</p>
                                    <div className="text-center">
                                        <img
                                            src={"/img4.png"}
                                            alt={swap.product2.title}
                                            className="w-24 h-24 object-cover rounded-md border border-pink-400"
                                        />
                                        <p className="text-xs mt-1 text-white">{swap.product2.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}