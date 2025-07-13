"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from '@clerk/nextjs';

export default function SwapsPage() {
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const userId = user.id;
    if (!userId) return;
    useEffect(() => {
        const fetchSwaps = async () => {
            try {
                const res = await fetch("/api/swapitems", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });

                const data = await res.json();
                setSwaps(data);
            } catch (err) {
                console.error("Error fetching swaps:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSwaps();
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-[#140024] to-[#2d0052] text-white px-6 pt-24 py-10 min-h-screen">
                <div className="max-w-6xl mx-auto mb-10">
                    <h2 className="text-3xl font-extrabold text-center mb-8 text-pink-400">
                        My Swaps
                    </h2>

                    {loading ? (
                        <p className="text-center text-purple-300">Loading swaps...</p>
                    ) : swaps.length === 0 ? (
                        <p className="text-center text-purple-300">No swaps found.</p>
                    ) : (
                        <div className="space-y-6">
                            {swaps.map((swap) => (
                                <div
                                    key={swap._id}
                                    className="bg-[#1f012f] border border-purple-700 rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-pink-500/20 transition-shadow"
                                >
                                    <div className="flex-1">
                                        <p className="text-pink-400 font-bold text-sm mb-2">
                                            Swap ID: {swap._id}
                                        </p>
                                        <p className="text-white text-sm">
                                            You swapped with{" "}
                                            <span className="text-purple-300">{swap.owner2Name}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 flex-wrap justify-center">
                                        <div className="text-center">
                                            <img
                                                src={swap.product1.image || "/placeholder.png"}
                                                alt={swap.product1.title}
                                                className="w-24 h-24 object-cover rounded-md border border-pink-400"
                                            />
                                            <p className="text-xs mt-1 text-white">
                                                {swap.product1.title}
                                            </p>
                                        </div>
                                        <p className="text-xl font-bold text-pink-300">⇄</p>
                                        <div className="text-center">
                                            <img
                                                src={swap.product2.image || "/placeholder.png"}
                                                alt={swap.product2.title}
                                                className="w-24 h-24 object-cover rounded-md border border-pink-400"
                                            />
                                            <p className="text-xs mt-1 text-white">
                                                {swap.product2.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
