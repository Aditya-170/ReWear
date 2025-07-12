"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUserProducts } from '@/app/context/UserProductsContext';

const ProductDetail = () => {
  const params = useParams();
  const { productId } = params;
  const { products } = useUserProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [showSwapList, setShowSwapList] = useState(false);
  const [selectedSwapId, setSelectedSwapId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleSwapClick = () => {
    setShowSwapList(true);
  };

  const handleSubmitSwap = async () => {
    if (!product || !selectedSwapId) return;

    const selectedProduct = products.find((p) => p._id === selectedSwapId);
    if (!selectedProduct) return;

    // Dummy point system (adjust based on your real data)
    const point1 = product.points || 0;
    const point2 = selectedProduct.points || 0;
    const pointDifference = Math.abs(point1 - point2);

    const swapPayload = {
      owner1: selectedProduct.ownerId,
      product1: selectedProduct._id,
      owner2: product.ownerId,
      product2: product._id,
      pointDifference,
    };

    try {
      const res = await fetch('/api/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swapPayload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Swap request submitted successfully!");
        setShowSwapList(false);
        setSelectedSwapId(null);
      } else {
        alert("Failed to submit swap: " + (data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the swap.");
    }
  };


  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (error) return <div className="text-white text-center mt-20">{error}</div>;
  if (!product) return null;

  const images = product.images || [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-2 mt-10">
        <div className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-900/60 to-slate-900/80">
              <div className="font-extrabold text-2xl text-purple-300 mb-4 tracking-wide drop-shadow-lg">Gallery</div>
              {images.length > 0 ? (
                <img
                  src={images[mainImgIdx]}
                  alt={product.title}
                  className="w-full max-w-xs h-64 object-cover rounded-2xl border-4 border-purple-400 shadow-xl mb-4 transition-all duration-300"
                />
              ) : (
                <div className="w-full max-w-xs h-64 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 font-semibold border-4 border-purple-400 mb-4">
                  No Image
                </div>
              )}
              {images.length > 1 && (
                <div className="flex gap-3 flex-wrap justify-center mt-2">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Product image ${idx + 1}`}
                      className={`w-14 h-14 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 shadow-md ${idx === mainImgIdx
                        ? 'border-purple-400 ring-2 ring-purple-300 scale-105'
                        : 'border-gray-500 opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      onClick={() => setMainImgIdx(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between p-8 min-w-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent">
                  {product.title}
                </h1>
                <div className="text-xl font-bold text-blue-300 mb-2">Description</div>
                <p className="text-base md:text-lg text-purple-100 mb-6 leading-relaxed font-medium">
                  {product.description}
                </p>
                <div className="mt-6 pt-6 border-t border-purple-400/20">
                  <div className="text-xl font-bold text-blue-300 mb-3">Product Details</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-purple-100">
                    {product.category && <div><span className="font-bold text-purple-200">Category:</span> {product.category}</div>}
                    {product.type && <div><span className="font-bold text-purple-200">Type:</span> {product.type}</div>}
                    {product.size && <div><span className="font-bold text-purple-200">Size:</span> {product.size}</div>}
                    {product.condition && <div><span className="font-bold text-purple-200">Condition:</span> {product.condition}</div>}
                    {product.tags && <div className="col-span-2"><span className="font-bold text-purple-200">Tags:</span> {product.tags.split(',').map((tag, i) => (
                      <span key={i} className="inline-block ml-2 px-2 py-1 bg-white/10 text-purple-200 text-xs rounded-full border border-white/20">{tag.trim()}</span>
                    ))}</div>}
                    {product.status && <div><span className="font-bold text-purple-200">Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === 'Available' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>{product.status}</span></div>}
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleSwapClick}
                  className="w-full sm:w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-lg py-3 rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all"
                >
                  Swap
                </button>
                <button
                  className="w-full sm:w-1/2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-extrabold text-lg py-3 rounded-xl shadow-lg hover:shadow-green-500/40 transition-all"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swap List */}
        {showSwapList && (
          <div className="mt-10 px-4">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Select a product to swap</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
              {products?.length === 0 ? (
                <p className="text-purple-100">No products available for swap.</p>
              ) : (
                products.map((item) => (
                  <div
                    key={item._id}
                    className={`min-w-[160px] bg-[#1f012f] rounded-lg shadow-md border-2 p-3 transition-transform hover:scale-105 cursor-pointer ${selectedSwapId === item._id ? "border-pink-500 ring-2 ring-pink-400" : "border-purple-700"
                      }`}
                    onClick={() => setSelectedSwapId(item._id)}
                  >
                    <img
                      src={item.images?.[0] || "/fallback.jpg"}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium text-center text-white truncate">{item.title}</p>
                  </div>
                ))
              )}
            </div>

            {selectedSwapId && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSubmitSwap}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-pink-400/40 transition-all"
                >
                  Submit Swap
                </button>
              </div>
            )}
          </div>
        )}

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.7s ease-in;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: none; }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
