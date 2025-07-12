"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useUser();

  const handleAccept = async (notificationId, swapId) => {
    try {
      const res = await fetch("/api/notifications/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId, swapId }),
      });

      if (res.ok) {
        // Update UI: remove or refresh
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId
              ? { ...n, status: "accepted", isRead: true }
              : n
          )
        );
      } else {
        console.error("Failed to accept notification");
      }
    } catch (err) {
      console.error("Error accepting notification:", err);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkUserId: user.id }),
        });

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-black/90 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 border border-purple-500/20 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-purple-200 mb-6 text-center">Your Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-purple-400 text-center">No notifications yet.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
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
                  <button
                    onClick={() => handleAccept(note._id, note.swap)}
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all text-sm"
                  >
                    Accept Swap
                  </button>
                )}
              </li>
            ))}

          </ul>
        )}
      </div>
    </div>
  );
}
