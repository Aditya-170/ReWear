"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const tabs = [
  { label: "Manage Users", value: "users" },
  { label: "Manage Orders", value: "orders" },
  { label: "Manage Listings", value: "listings" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [usersVisibleCount, setUsersVisibleCount] = useState(8);
  const [productsVisibleCount, setProductsVisibleCount] = useState(8);

  useEffect(() => {
    // Fetch users
    setUsersLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setUsersLoading(false));
    // Fetch products
    setProductsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setProductsLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-purple-200 tracking-wide">Admin Panel</h1>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-2 rounded-xl font-semibold border transition-all duration-300 text-sm shadow-md
                  ${activeTab === tab.value
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg"
                    : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mb-4 text-center text-lg font-semibold text-purple-200">
            {activeTab === "users" && "Manage Users"}
            {activeTab === "orders" && "Manage Orders"}
            {activeTab === "listings" && "Manage Listings"}
          </div>

          {/* User Cards */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {usersLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 text-purple-200">No users found.</div>
              ) : (
                <>
                  {users.slice(0, usersVisibleCount).map((user) => (
                    <div key={user._id} className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                          {user.name ? user.name[0] : "U"}
                        </div>
                      </div>
                      {/* Details */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <div className="font-bold text-lg text-purple-100 mb-1">{user.name}</div>
                        <div className="text-purple-200 text-sm mb-1">{user.email}</div>
                        <div className="text-purple-300 text-xs">{user.number}</div>
                        <div className="text-purple-400 text-xs mt-1">Points: {user.points} | Swaps: {user.numberOfSwaps} | Member: {new Date(user.memberSince).toLocaleDateString()}</div>
                        <div className="text-purple-400 text-xs mt-1">Label: {user.label}</div>
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col gap-3 w-full sm:w-auto sm:items-end">
                        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                          Action 1
                        </button>
                        <button className="px-6 py-2 rounded-xl bg-white/10 text-purple-200 font-semibold border border-white/20 shadow hover:bg-white/20 transition-all duration-300">
                          Action 2
                        </button>
                      </div>
                    </div>
                  ))}
                  {usersVisibleCount < users.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setUsersVisibleCount((c) => c + 8)}
                        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300"
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Product Listings */}
          {activeTab === "listings" && (
            <div className="space-y-6">
              {productsLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-12 text-purple-200">No products found.</div>
              ) : (
                <>
                  {products.slice(0, productsVisibleCount).map((product) => (
                    <div key={product._id} className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.title} className="w-20 h-20 rounded-xl object-cover border-4 border-purple-400 shadow" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">?</div>
                        )}
                      </div>
                      {/* Details */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <div className="font-bold text-lg text-purple-100 mb-1">{product.title}</div>
                        <div className="text-purple-200 text-sm mb-1">{product.description}</div>
                        <div className="text-purple-300 text-xs">Category: {product.category} | Type: {product.type} | Size: {product.size}</div>
                        <div className="text-purple-400 text-xs mt-1">Points: {product.point} | Status: {product.status}</div>
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col gap-3 w-full sm:w-auto sm:items-end">
                        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                          Action 1
                        </button>
                        <button className="px-6 py-2 rounded-xl bg-white/10 text-purple-200 font-semibold border border-white/20 shadow hover:bg-white/20 transition-all duration-300">
                          Action 2
                        </button>
                      </div>
                    </div>
                  ))}
                  {productsVisibleCount < products.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setProductsVisibleCount((c) => c + 8)}
                        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300"
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== "users" && activeTab !== "listings" && (
            <div className="text-purple-300 text-center py-12">No data to display yet.</div>
          )}
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
