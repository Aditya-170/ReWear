"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { toast, ToastContainer } from "react-toastify";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("swap"); // swap | status
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchNotifications = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id }),
      });

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (notificationId, swapId) => {
    try {
      const res = await fetch("/api/notifications/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId, swapId }),
      });

      if (res.ok) {
        toast.success("Swap accepted successfully!");
        fetchNotifications();
      } else {
        toast.error("Failed to accept swap");
      }
    } catch (err) {
      console.error("Error accepting notification:", err);
      toast.error("Error accepting swap");
    }
  };

  const handleReject = async (notificationId, swapId) => {
    try {
      const res = await fetch("/api/notifications/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId, swapId }),
      });

      if (res.ok) {
        toast.success("Swap rejected");
        fetchNotifications();
      } else {
        toast.error("Failed to reject swap");
      }
    } catch (err) {
      console.error("Error rejecting notification:", err);
      toast.error("Error rejecting swap");
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [user]);

  const swapNotifications = notifications.filter((n) => n.status === "pending");
  const resultNotifications = notifications.filter((n) => n.status !== "pending");

  const renderNote = (note) => (
    <li key={note._id} className="p-4 rounded bg-purple-500/10 border border-purple-500/30">
      <div className="flex items-center justify-between">
        <p className="text-purple-200">{note.message}</p>
        {note.status === "accepted" ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : note.status === "pending" ? (
          <Clock className="w-5 h-5 text-yellow-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400" />
        )}
      </div>
      <p className="text-xs text-purple-400 mt-1">
        {new Date(note.createdAt).toLocaleString()}
      </p>

      {note.status === "pending" && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => handleAccept(note._id, note.swap)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all text-sm"
          >
            Accept Swap
          </button>
          <button
            onClick={() => handleReject(note._id, note.swap)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </li>
  );

  return (
    <>
      <ToastContainer position="top-center " autoClose={3000} />
      <Navbar />

      <div className="min-h-screen bg-black/90 text-white py-16 px-4 mt-5">
        <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 border border-purple-500/20 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-purple-200 mb-6 text-center">Your Notifications</h2>

          <div className="flex justify-center gap-6 mb-6">
            <button
              onClick={() => setFilter("swap")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === "swap"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-800/40 text-purple-200"
              }`}
            >
              Swap Requests
            </button>
            <button
              onClick={() => setFilter("status")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === "status"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-800/40 text-purple-200"
              }`}
            >
              Accepted / Rejected
            </button>
          </div>

          {loading ? (
            <p className="text-center text-purple-300">Refreshing...</p>
          ) : notifications.length === 0 ? (
            <p className="text-purple-400 text-center">No notifications yet.</p>
          ) : (
            <ul className="space-y-4">
              {(filter === "swap" ? swapNotifications : resultNotifications).map(renderNote)}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
