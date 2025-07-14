import React, { useEffect, useState } from "react";
import { Medal } from "lucide-react";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch("/api/leaderboard");
                const data = await res.json();

                const withBadges = data.map((user) => {
                    let badge = "";
                    if (user.rank === 1) badge = "Eco Hero";
                    else if (user.rank === 2) badge = "Trailblazer";
                    else if (user.rank === 3) badge = "Swapper Pro";
                    return { ...user, badge };
                });

                setLeaderboard(withBadges);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto mt-7 px-4">
            <div className="bg-black border border-purple-700 rounded-2xl p-6 shadow-xl">
                <h2 className="text-center text-3xl font-extrabold text-purple-400 mb-6">
                    🌿 Top Swappers Leaderboard
                </h2>

                <div className="grid grid-cols-1 divide-y divide-purple-800">
                    {leaderboard.map((user) => (
                        <div
                            key={user.rank}
                            className={`flex items-center justify-between py-4 px-2 m-2 transition-all rounded-xl ${user.rank === 1
                                    ? "bg-purple-900/50"
                                    : user.rank === 2
                                        ? "bg-purple-800/40"
                                        : user.rank === 3
                                            ? "bg-purple-800/30"
                                            : "hover:bg-purple-800/20"
                                }`}
                        >
                            {/* Rank */}
                            <div className="flex items-center gap-3 w-1/12 justify-center">
                                {user.rank <= 3 ? (
                                    <Medal
                                        className={`w-5 h-5 ${user.rank === 1
                                                ? "text-yellow-400"
                                                : user.rank === 2
                                                    ? "text-gray-300"
                                                    : "text-orange-400"
                                            }`}
                                    />
                                ) : (
                                    <span className="text-purple-300 text-sm font-semibold">#{user.rank}</span>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-4 w-7/12">
                                <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold shadow-md border-2 border-purple-600">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <div className="text-purple-100 font-medium text-base">{user.name}</div>
                                    <div className="text-purple-400 text-xs italic">{user.badge}</div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="w-4/12 text-right text-purple-200 text-sm">
                                <div className="flex justify-end gap-4">
                                    <div className="bg-purple-700/30 text-purple-100 px-3 py-1 rounded-full shadow-md border border-purple-600 text-xs font-semibold">
                                        {user.swaps} Swaps
                                    </div>
                                    <div className="bg-purple-700/20 text-purple-300 px-3 py-1 rounded-full shadow-sm border border-purple-500 text-xs font-medium">
                                        Member Since {new Date(user.memberSince).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
