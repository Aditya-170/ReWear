"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
export default function ContactPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in.");

    const name = user.fullName || "Anonymous";
    const email = user.primaryEmailAddress?.emailAddress || "";
    const phone = user.phoneNumbers?.[0]?.phoneNumber || "";
    const clerkId = user.id;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          title,
          description,
          clerkId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully!");
        setTitle("");
        setDescription("");
      } else {
        alert("Failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/90 backdrop-blur-sm px-6 py-12 text-white flex items-center justify-center">
        <div className="w-full max-w-2xl bg-[#1a1a1a] border border-purple-500/30 p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-purple-200 mb-6 text-center">
            We are here for solving your issues
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-purple-300 mb-2 text-sm">
                Title
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded bg-black text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter a short title..."
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-purple-300 mb-2 text-sm">
                Description
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 rounded bg-black text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Describe your issue or question..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
        <Footer/>
    </>
  );
}
