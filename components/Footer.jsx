import React from "react";
import { ChevronLeft, ChevronRight, Star, Users, Package, Recycle, Search, Heart, Sparkles, TrendingUp, Shield, Leaf } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-sm border-t border-purple-500/20">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-purple-200">ReWear</span>
          </div>
          <p className="text-purple-300 mb-4">Sustainable fashion for a better tomorrow.</p>
        </div>
        
        <div>
          <h4 className="text-purple-200 font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Browse Items</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">List Item</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">My Account</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-purple-200 font-semibold mb-4">Support</h4>
          <div className="space-y-2">
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Help Center</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Contact Us</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-purple-200 font-semibold mb-4">Connect</h4>
          <div className="space-y-2">
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Twitter</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Instagram</a>
            <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
        <p className="text-purple-300">&copy; 2025 ReWear. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
}
