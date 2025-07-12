"use client";
import { useUser } from '@clerk/nextjs';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  return data.url;
}

const AddProduct = () => {
  const router = useRouter();
  const { user } = useUser();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const additionalInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImageFiles([...imageFiles, ...Array.from(e.dataTransfer.files)]);
  };

  const handleRemoveImage = (idx) => {
    setImageFiles(imageFiles.filter((_, i) => i !== idx));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleAdditionalUploadClick = () => {
    additionalInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    let images = [];
    try {
      images = await Promise.all(
        imageFiles.map(file => uploadToCloudinary(file))
      );
    } catch (err) {
      setMessage('Image upload failed.');
      setUploading(false);
      return;
    }
    setUploading(false);
    const payload = { ...form, images, ownerId: user.id };
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setMessage('Product added successfully!');
      setTimeout(() => router.push('/products'), 1500);
    } else {
      setMessage('Error adding product.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 md:p-14 animate-fade-in">
          {/* Image Upload Section */}
          <div>
            <div className="mb-8">
              <label className="block mb-3 font-bold text-lg text-purple-200">Main Product Image</label>
              {imageFiles.length > 0 ? (
                <div className="relative group">
                  <img
                    src={URL.createObjectURL(imageFiles[0])}
                    alt="Main preview"
                    className="w-full h-64 object-cover rounded-2xl border-4 border-purple-400 shadow-xl mb-2"
                  />
                  <button
                    onClick={() => handleRemoveImage(0)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold shadow-lg hover:bg-red-600 transition-all duration-200 z-10"
                    type="button"
                    title="Remove main image"
                  >×</button>
                </div>
              ) : (
                <div
                  onClick={handleUploadAreaClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="h-64 border-2 border-dashed border-purple-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-purple-900/60 to-slate-900/80 hover:bg-purple-900/40 transition-all duration-300"
                >
                  <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                  <span className="text-4xl text-purple-300 mb-2">📷</span>
                  <span className="text-purple-300 font-semibold">Click or drag images here</span>
                </div>
              )}
            </div>

            {imageFiles.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-purple-200">Other Images</label>
                  <button onClick={handleAdditionalUploadClick} type="button" className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition-all duration-300">+ Add</button>
                  <input type="file" multiple accept="image/*" ref={additionalInputRef} onChange={handleImageChange} className="hidden" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {imageFiles.slice(1).map((file, idx) => (
                    <div key={idx + 1} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-20 object-cover rounded-lg border-2 border-purple-400 shadow"
                      />
                      <button
                        onClick={() => handleRemoveImage(idx + 1)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-all duration-200"
                        type="button"
                      >×</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">Add New Product</h2>
            <input name="title" placeholder="Enter product title" value={form.title} onChange={handleChange} required className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={4} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
              <input name="type" placeholder="Type" value={form.type} onChange={handleChange} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
              <input name="size" placeholder="Size" value={form.size} onChange={handleChange} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
              <input name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
            </div>
            <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" />
            <button type="submit" disabled={uploading} className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 text-lg">
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
            {message && (
              <p className={`text-center font-semibold ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
            )}
          </form>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
};

export default AddProduct;