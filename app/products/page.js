"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Get unique categories for filter
  const categories = ['All', ...new Set(products.map(product => product.category).filter(Boolean))];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  // Only show up to visibleCount products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden pb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Discover Amazing
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Products</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
                Explore our curated collection of premium items, each carefully selected for quality and style.
              </p>
              {/* Search Bar - Integrated in hero */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-xl text-base"
                    onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {/* No Products Found */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && filteredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2 block hover:cursor-pointer"
                    prefetch={false}
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden aspect-square">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Status Badge - Only show if status exists */}
                      {product.status && (
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'Available' 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-red-500/90 text-white'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {product.title}
                      </h3>
                      {typeof product.point !== 'undefined' && (
                        <div className="mb-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow">
                          {product.point} points
                        </div>
                      )}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Product Details */}
                      <div className="space-y-2 text-sm">
                        {product.category && (
                          <div className="flex items-center text-gray-300">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                            <span className="font-medium">Category:</span>
                            <span className="ml-1 text-gray-400">{product.category}</span>
                          </div>
                        )}
                        {product.type && (
                          <div className="flex items-center text-gray-300">
                            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                            <span className="font-medium">Type:</span>
                            <span className="ml-1 text-gray-400">{product.type}</span>
                          </div>
                        )}
                        {product.size && (
                          <div className="flex items-center text-gray-300">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            <span className="font-medium">Size:</span>
                            <span className="ml-1 text-gray-400">{product.size}</span>
                          </div>
                        )}
                        {product.condition && (
                          <div className="flex items-center text-gray-300">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            <span className="font-medium">Condition:</span>
                            <span className="ml-1 text-gray-400">{product.condition}</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {product.tags && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {product.tags.split(',').map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/20"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              {visibleCount < filteredProducts.length && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleCount((c) => c + 12)}
                    className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl transition-all duration-300"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          )}

          {/* Results Count */}
          {!loading && filteredProducts.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Showing {visibleProducts.length} of {filteredProducts.length} products
              </p>
            </div>
          )}
        </div>

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
} 