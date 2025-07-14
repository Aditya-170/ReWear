import React from "react";
import {
  Sparkles,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-sm border-t border-purple-500/20 w-full">
      {/* Outer container with proper padding */}
      <div className="w-full px-6 py-10">
        {/* Top footer content - flex layout */}
        <div className="flex justify-between flex-wrap gap-y-10">
          {/* Brand Info */}
          <div className="min-w-[200px] max-w-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-purple-200">ReWear</span>
            </div>
            <p className="text-purple-300">
              Sustainable fashion for a better tomorrow. <br />
              At ReWear, we believe in reducing waste, reimagining style, and making fashion accessible without harming the planet. <br />
              
            </p>

          </div>

          {/* Quick Links */}
          <div className="min-w-[150px]">
            <h4 className="text-purple-200 font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="/products" className="block text-purple-300 hover:text-purple-200 transition-colors">Browse Items</a>
              <a href="/purchased" className="block text-purple-300 hover:text-purple-200 transition-colors">List Item</a>
              <a href="/profile" className="block text-purple-300 hover:text-purple-200 transition-colors">My Account</a>
            </div>
          </div>

          {/* Support */}
          <div className="min-w-[150px]">
            <h4 className="text-purple-200 font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a href="contact" className="block text-purple-300 hover:text-purple-200 transition-colors">Help Center</a>
              <a href="contact" className="block text-purple-300 hover:text-purple-200 transition-colors">Contact Us</a>
              <a href="#" className="block text-purple-300 hover:text-purple-200 transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Connect */}
          <div className="min-w-[150px]">
            <h4 className="text-purple-200 font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4 mb-4">
              <a href="#" className="text-purple-300 hover:text-purple-200"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-purple-300 hover:text-purple-200"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-purple-300 hover:text-purple-200"><Facebook className="w-5 h-5" /></a>
            </div>
            <div className="space-y-2">
              <a href="https://twitter.com" className="block text-purple-300 hover:text-purple-200">Twitter</a>
              <a href="https://instagram.com" className="block text-purple-300 hover:text-purple-200">Instagram</a>
              <a href="https://facebook.com" className="block text-purple-300 hover:text-purple-200">Facebook</a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-purple-500/20 mt-10 pt-6 text-center">
          <p className="text-purple-300 text-sm">
            &copy; 2025 ReWear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
