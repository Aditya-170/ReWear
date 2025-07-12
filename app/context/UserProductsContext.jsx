"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const UserProductsContext = createContext();

export const UserProductsProvider = ({ children }) => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch("/api/userProduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load user products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [user?.id]);

  return (
    <UserProductsContext.Provider value={{ products, loading }}>
      {children}
    </UserProductsContext.Provider>
  );
};

export const useUserProducts = () => useContext(UserProductsContext);
