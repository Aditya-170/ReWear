"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Trash2, ArrowUpCircle } from "lucide-react";
import { toast } from "react-toastify";


const tabs = [
  { label: "Manage Users", value: "users" },
  { label: "Manage Orders", value: "orders" },
  { label: "Manage Listings", value: "listings" },
  { label: "Manage Issues", value: "issues" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [usersVisibleCount, setUsersVisibleCount] = useState(8);
  const [productsVisibleCount, setProductsVisibleCount] = useState(8);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminInput, setAdminInput] = useState("");



  useEffect(() => {
    setUsersLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setUsersLoading(false));
    setProductsLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setProductsLoading(false));
    setOrdersLoading(true);
    fetch("/api/all-puchases")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .finally(() => setOrdersLoading(false));
    setContactsLoading(true);
    fetch("/api/contact/view")
      .then((res) => res.json())
      .then((data) => {
        const sortedContacts = (data.contacts || []).sort((a, b) => {
          if (a.status === "Unread" && b.status === "Read") return -1;
          if (a.status === "Read" && b.status === "Unread") return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setContacts(sortedContacts);
      })
      .finally(() => setContactsLoading(false));
  }, []);

  const handleMarkAsRead = async (contactId) => {
    try {
      const res = await fetch("/api/contact/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      });
      const data = await res.json();
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c._id === contactId ? { ...c, status: "Read" } : c))
        );
      } else {
        alert("Failed to update status: " + data.message);
      }
    } catch (err) {
      alert("Error marking as read.");
    }
  };
  const handleDeleteUser = async (clerkUserId) => {
    try {
      const res = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.clerkUserId !== clerkUserId));
        toast.success("User Deleted")
      } else {
        alert("Failed to delete user: " + data.message);
      }
    } catch (err) {
      alert("Error deleting user.");
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch("/api/delete-product", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        toast.success("Product Deleted");
      } else {
        alert("Failed to delete product: " + data.message);
      }
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  const checkPassword = () => {
    if (adminInput === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setIsAuthorized(true);
    } else {
      toast.error("Wrong password");
    }
  };
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-white/10 border border-purple-500/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-purple-200">Enter Admin Password</h2>
          <input
            type="password"
            value={adminInput}
            onChange={(e) => setAdminInput(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={checkPassword}
            className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 pt-24 pb-16 px-4 md:px-10">
        <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.3)] p-6 md:p-10 animate-fade-in">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-md">Admin Dashboard</h1>
            <p className="text-purple-200 mt-2">Manage users, orders, listings, and support issues.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-2 rounded-xl font-semibold border text-sm shadow-md transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-xl
                    ${activeTab === tab.value
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500"
                    : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"}
                  `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-6 text-center text-xl font-semibold text-purple-100">
            {tabs.find((t) => t.value === activeTab)?.label}
          </div>



          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {usersLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-12 text-purple-200">No users found.</div>
              ) : (
                <>
                  {users.slice(0, usersVisibleCount).map((user) => (
                    <div
                      key={user._id}
                      className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-md"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                        {user.name ? user.name[0] : "U"}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="font-bold text-lg text-purple-100">{user.name}</div>
                        <div className="text-purple-200 text-sm">{user.email}</div>
                        <div className="text-purple-300 text-xs">{user.number}</div>
                        <div className="text-purple-400 text-xs mt-1">Points: {user.points} | Swaps: {user.numberOfSwaps}</div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDeleteUser(user.clerkUserId)}
                          className="px-4 py-2 rounded-lg bg-red-600/90 text-white hover:bg-red-700 flex items-center gap-2"
                        >                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-green-600/90 text-white hover:bg-green-700 flex items-center gap-2">
                          <ArrowUpCircle className="w-4 h-4" /> Upgrade
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === "listings" && (
            <div className="space-y-6">
              {productsLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading products...</div>
              ) : (
                <>
                  {products.slice(0, productsVisibleCount).map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-md"
                    >
                      <img src={product.images?.[0]} alt={product.title} className="w-20 h-20 rounded-xl object-cover border-4 border-purple-400 shadow" />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="font-bold text-lg text-purple-100">{product.title}</div>
                        <div className="text-purple-300 text-xs">{product.category} | Size: {product.size}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="px-5 py-2 rounded-xl bg-red-600/90 text-white font-semibold shadow hover:bg-red-700 flex items-center gap-2"
                      > <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {ordersLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading orders...</div>
              ) : (
                <>
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-md"
                    >
                      <img src={order.product?.images?.[0]} alt={order.product?.title} className="w-20 h-20 rounded-xl object-cover border-4 border-purple-400 shadow" />
                      <div className="flex-1 text-center sm:text-left">
                        <div className="font-bold text-lg text-purple-100">{order.product?.title}</div>
                        <div className="text-purple-200 text-sm">Buyer: {order.buyer?.name}</div>
                        <div className="text-purple-400 text-xs">{new Date(order.purchaseDate).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === "issues" && (
            <div className="space-y-6">
              {contactsLoading ? (
                <div className="text-center py-12 text-purple-200 animate-pulse">Loading issues...</div>
              ) : (
                <>
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 shadow-md ${contact.status === "Unread" ? "border-pink-500/60" : ""}`}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg text-purple-100">{contact.title}</div>
                        <div className="text-purple-300 text-sm mb-1 whitespace-pre-wrap">{contact.description}</div>
                        <div className="text-purple-200 text-xs">{contact.email} | {contact.phone}</div>
                        <div className="text-purple-400 text-xs mt-1">{new Date(contact.createdAt).toLocaleString()}</div>
                        <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-semibold ${contact.status === "Unread" ? "bg-pink-500/90" : "bg-green-600/80"} text-white`}>{contact.status}</span>
                      </div>
                      {contact.status === "Unread" && (
                        <button
                          onClick={() => handleMarkAsRead(contact._id)}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
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
