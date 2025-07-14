"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import { useUserProducts } from '@/app/context/UserProductsContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart,
  Scatter
} from "recharts";


export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { products, userProfile } = useUserProducts();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch("/api/user-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id }),
      });
      const data = await res.json();
      setChartData(data);
    };
    if (user?.id) fetchAnalytics();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchUserProducts = async () => {
      try {
        const res = await fetch("/api/products/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
          }),
        });

        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Error loading listings:", err);
      }
    };


    const fetchOrCreateProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            name: user.fullName,
            email: user.emailAddresses[0]?.emailAddress,
            number: user.phoneNumbers[0]?.phoneNumber || null,
          }),
        });

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching/creating profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
    fetchOrCreateProfile();
  }, [user, userProfile?._id]);

  if (loading || !user || !profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#140024] to-[#2d0052] text-white">
          <p className="text-lg text-purple-300">Loading profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-[#140024] to-[#2d0052] text-white px-6 pt-24 py-10 min-h-screen">
        {/* Profile Header */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-center">
          <div className="flex justify-center">
            <img
              src={user.imageUrl || "/img4.png"}
              alt={user.fullName || "Profile Picture"}
              className="w-40 h-40 rounded-full object-cover border-4 border-pink-500 shadow-lg"
            />
          </div>
          <div className="md:col-span-2 space-y-4 text-center md:text-left bg-[#1f012f] p-6 rounded-xl border border-purple-700 shadow-md">
            <h2 className="text-3xl font-extrabold text-[#ff4ecd]">{profile.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <p><span className="font-semibold text-white">📧 Email:</span> {profile.email}</p>
              <p><span className="font-semibold text-white">📱 Phone:</span> {profile.number || "Not Provided"}</p>
              <p><span className="font-semibold text-white">🌟 Points Earned:</span> {profile.points} pts</p>
              <p><span className="font-semibold text-white">👕 Clothes Swapped:</span> {profile.numberOfSwaps}</p>
              <p><span className="font-semibold text-white">📅 Member Since:</span> {new Date(user.createdAt).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}</p>
              <p><span className="font-semibold text-white">🏆 Level:</span> {profile.label || "Regular"}</p>
            </div>
            <p className="text-purple-300 italic pt-2">“Reusing fashion, rewriting the future ✨”</p>
          </div>
        </div>

        {/* Listings */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold mb-4 text-pink-400">My Listings</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
            {listings.map((item) => (
              <div
                key={item._id}
                className="min-w-[160px] bg-[#1f012f] rounded-lg shadow-md border border-purple-700 p-3 hover:scale-105 transition-transform"
              >
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm font-medium text-center text-white truncate">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Charts */}
        <h3 className="text-2xl font-bold text-purple-300 mb-6 text-center">Monthly Swaps & Purchases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🟣 Swaps Line Chart */}
          <div className="bg-[#1f012f] p-4 rounded-xl border border-purple-700 shadow-md">
            <h4 className="text-lg font-semibold text-purple-300 mb-2 text-center">Swaps Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" />
                <XAxis dataKey="month" stroke="#D8B4FE" />
                <YAxis stroke="#D8B4FE" />
                <Tooltip />
                <Line type="monotone" dataKey="swaps" stroke="#A78BFA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🩷 Purchases Bar Chart */}
          <div className="bg-[#1f012f] p-4 rounded-xl border border-purple-700 shadow-md">
            <h4 className="text-lg font-semibold text-purple-300 mb-2 text-center">Purchases Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" />
                <XAxis dataKey="month" stroke="#D8B4FE" />
                <YAxis stroke="#D8B4FE" />
                <Tooltip />
                <Bar dataKey="purchases" fill="#F472B6" barSize={40} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


        <h3 className="text-2xl font-bold text-purple-300 mt-12 mb-6 text-center">
          Activity Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 🔵 Scatter Chart: Points Earned per Month */}
          <div className="bg-[#1f012f] p-4 rounded-xl border border-purple-700 shadow-md">
            <h4 className="text-lg font-semibold text-purple-300 mb-2 text-center">
              Points Used Per Month
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#5B21B6" />
                <XAxis
                  type="category"
                  dataKey="month"
                  name="Month"
                  stroke="#D8B4FE"
                />
                <YAxis
                  type="number"
                  dataKey="points"
                  name="Points"
                  stroke="#D8B4FE"
                />
                <Tooltip />
                <Scatter
                  name="Points"
                  data={chartData}
                  fill="#C084FC"
                  line
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* 🟣 Pie Chart: Swaps vs Listings vs Purchases */}
          <div className="bg-[#1f012f] p-4 rounded-xl border border-purple-700 shadow-md">
            <h4 className="text-lg font-semibold text-purple-300 mb-2 text-center">
              Swaps vs Listings vs Purchases
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Swaps",
                      value: chartData.reduce((acc, d) => acc + d.swaps, 0),
                    },
                    {
                      name: "Listings",
                      value: chartData.reduce((acc, d) => acc + d.listings, 0),
                    },
                    {
                      name: "Purchases",
                      value: chartData.reduce((acc, d) => acc + d.purchases, 0),
                    },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  <Cell fill="#A78BFA" />
                  <Cell fill="#F472B6" />
                  <Cell fill="#C084FC" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>

      <Footer />
    </>
  );
}