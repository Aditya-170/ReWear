"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const UserProductsContext = createContext();

export const UserProductsProvider = ({ children }) => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;

      try {
        // Step 1: Call /api/profile to get or create user profile
        const profileRes = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkUserId: user.id,
            name: user.fullName || user.username || "Unnamed",
            email: user.emailAddresses?.[0]?.emailAddress || "",
            number: null, 
          }),
        });

        const profileData = await profileRes.json();
        setUserProfile(profileData);

        // Step 2: Fetch user's own products
        const productRes = await fetch("/api/userProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        const productData = await productRes.json();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to load user data or products:", error);
        setProducts([]);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  return (
    <UserProductsContext.Provider value={{ products, userProfile, loading }}>
      {children}
    </UserProductsContext.Provider>
  );
};

export const useUserProducts = () => useContext(UserProductsContext);
