"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserProducts } from '@/app/context/UserProductsContext';

const PurchasedPage = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products, userProfile } = useUserProducts();
  
  useEffect(() => {
    const fetchPurchasedItems = async () => {
      if (!userProfile?._id) return;

      try {
        const res = await fetch("/api/view-purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userProfile._id }),
        });

        const data = await res.json();
        setPurchasedItems(data);
      } catch (err) {
        console.error("Failed to fetch purchased items:", err);
        setPurchasedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedItems();
  }, [userProfile?._id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text mb-12 mt-10">
            Your Purchased Items
          </h1>

          {loading ? (
            <p className="text-center text-purple-100">Loading...</p>
          ) : purchasedItems.length === 0 ? (
            <p className="text-center text-purple-300">No purchases found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-5 shadow-2xl hover:shadow-purple-500/30 transition-all"
                >
                  <img
                    src={item.images?.[0] || "/fallback.png"}
                    alt={item.title}
                    className="w-full h-52 object-cover rounded-xl border border-purple-600 mb-4"
                  />
                  <h2 className="text-xl font-bold text-purple-200 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-purple-300 mb-2 truncate">
                    {item.description}
                  </p>
                  <div className="text-sm text-purple-400">
                    <span className="font-semibold text-purple-200">Category:</span>{" "}
                    {item.category || "N/A"}
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500/80 rounded-full">
                      Purchased
                    </span>
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
};

export default PurchasedPage;
