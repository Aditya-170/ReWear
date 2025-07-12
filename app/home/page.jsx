"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight, Star, Users, Package, Recycle, Search, Heart, Sparkles, TrendingUp, Shield, Leaf } from 'lucide-react';
import Link from 'next/link';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      id: 1,
      title: "Vintage Denim Collection",
      subtitle: "Timeless pieces with character",
      bgColor: "from-purple-600/40 to-indigo-600/40",
      emoji: "🧥",
      description: "Discover authentic vintage denim pieces"
    },
    {
      id: 2,
      title: "Elegant Evening Wear",
      subtitle: "Perfect for special occasions",
      bgColor: "from-purple-600/40 to-pink-600/40",
      emoji: "👗",
      description: "Sophisticated dresses for every event"
    },
    {
      id: 3,
      title: "Casual Comfort",
      subtitle: "Everyday essentials",
      bgColor: "from-purple-600/40 to-blue-600/40",
      emoji: "👕",
      description: "Comfortable styles for daily wear"
    },
    {
      id: 4,
      title: "Designer Footwear",
      subtitle: "Step out in style",
      bgColor: "from-purple-600/40 to-violet-600/40",
      emoji: "👟",
      description: "Premium shoes at affordable prices"
    },
    {
      id: 5,
      title: "Cozy Knitwear",
      subtitle: "Warmth meets style",
      bgColor: "from-purple-600/40 to-fuchsia-600/40",
      emoji: "🧶",
      description: "Soft knits for chilly days"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm border border-purple-500/20">
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${image.bgColor} flex items-center justify-center relative overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-16 h-16 border-2 border-purple-300/50 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-purple-300/50 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-purple-300/30 rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-purple-300/30 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center text-purple-100 px-8">
                <div className="text-8xl mb-4 animate-pulse">{image.emoji}</div>
                <h3 className="text-3xl font-bold mb-2">{image.title}</h3>
                <p className="text-xl text-purple-200 mb-4">{image.subtitle}</p>
                <p className="text-purple-300">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full hover:bg-purple-500/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-purple-200" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full hover:bg-purple-500/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-purple-200" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-purple-300 scale-125'
                : 'bg-purple-400/50 hover:bg-purple-300/70'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      condition: "Excellent condition",
      points: "150 points",
      category: "Jackets",
      emoji: "🧥"
    },
    {
      id: 2,
      title: "Black Evening Dress",
      condition: "Like new",
      points: "200 points",
      category: "Dresses",
      emoji: "👗"
    },
    {
      id: 3,
      title: "Designer Sneakers",
      condition: "Good condition",
      points: "120 points",
      category: "Shoes",
      emoji: "👟"
    },
    {
      id: 4,
      title: "Cozy Knit Sweater",
      condition: "Excellent condition",
      points: "80 points",
      category: "Sweaters",
      emoji: "🧶"
    }
  ];

  const categories = [
    { name: "Dresses", icon: "👗", count: "2.5K+", color: "from-purple-500 to-pink-500" },
    { name: "Tops", icon: "👕", count: "3.2K+", color: "from-purple-500 to-blue-500" },
    { name: "Bottoms", icon: "👖", count: "1.8K+", color: "from-purple-500 to-indigo-500" },
    { name: "Shoes", icon: "👟", count: "2.1K+", color: "from-purple-500 to-violet-500" },
    { name: "Accessories", icon: "👜", count: "1.5K+", color: "from-purple-500 to-fuchsia-500" },
    { name: "Jackets", icon: "🧥", count: "900+", color: "from-purple-500 to-pink-500" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-full p-1">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search for sustainable fashion items..."
                    className="flex-1 px-6 py-4 bg-transparent text-purple-200 placeholder-purple-400 focus:outline-none"
                  />
                  <button className="mr-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center text-purple-100 mb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mb-6">
                🌱 Sustainable Fashion Platform
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              ReWear
            </h1>

            <p className="text-xl mb-12 max-w-3xl mx-auto text-purple-200 leading-relaxed">
              Join the sustainable fashion revolution. Exchange, swap, and discover pre-loved clothing while reducing textile waste and building a greener future.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/swaps">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>Start Swapping</span>
                  </span>
                </button>
              </Link>

              <Link href="/products">
                <button className="group relative px-8 py-4 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full font-semibold text-purple-200 hover:bg-purple-500/30 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Browse Items</span>
                  </span>
                </button>
              </Link>

              <Link href="/products/new">
                <button className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 rounded-full font-semibold text-purple-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>List an Item</span>
                  </span>
                </button>
              </Link>
            </div>
            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group p-6 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-200 mb-2">50K+</div>
                <div className="text-purple-300">Items Swapped</div>
              </div>

              <div className="group p-6 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-200 mb-2">25K+</div>
                <div className="text-purple-300">Active Users</div>
              </div>

              <div className="group p-6 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-200 mb-2">15K+</div>
                <div className="text-purple-300">Tons Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="px-4 py-20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-200 mb-4">Discover Fashion Categories</h2>
            <p className="text-purple-300 text-lg">Explore our curated collection of sustainable fashion</p>
          </div>

          <ImageCarousel />
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-200 mb-4">Browse Categories</h2>
            <p className="text-purple-300 text-lg">Discover amazing pre-loved items across all categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative p-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  <div className="relative text-center">
                    <div className="text-5xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-2">{category.name}</h3>
                    <p className="text-purple-300">{category.count} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="px-4 py-20 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-200 mb-4">Featured Items</h2>
            <p className="text-purple-300 text-lg">Handpicked sustainable fashion finds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:bg-purple-900/30 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="text-6xl relative z-10">{item.emoji}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-purple-200 mb-2">{item.title}</h3>
                    <p className="text-sm text-purple-300 mb-3">{item.condition}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">{item.points}</span>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-200 mb-4">Making a Difference Together</h2>
            <p className="text-purple-300 text-lg">Join thousands of users creating positive environmental impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-4 text-center">Sustainable Fashion</h3>
              <p className="text-purple-300 text-center">Reduce textile waste and environmental impact by giving clothes a second life through our community exchange platform.</p>
            </div>

            <div className="group p-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-4 text-center">Community Driven</h3>
              <p className="text-purple-300 text-center">Connect with like-minded individuals who share your passion for sustainable living and fashion.</p>
            </div>

            <div className="group p-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:bg-purple-900/30 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-purple-200 mb-4 text-center">Point System</h3>
              <p className="text-purple-300 text-center">Earn points for every item you contribute and redeem them for pieces that match your style.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;