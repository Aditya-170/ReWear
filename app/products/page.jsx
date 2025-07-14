import React, { Suspense } from "react";
import ProductsList from "./productClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center text-white pt-20">Loading products...</div>}>
      <ProductsList />
    </Suspense>
  );
}
