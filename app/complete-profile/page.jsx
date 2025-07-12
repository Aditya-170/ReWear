"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CompleteProfile() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (isLoaded && user.publicMetadata?.age && user.publicMetadata?.gender) {
      router.push('/dashboard');
    }
  }, [isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await user.update({
      publicMetadata: { age, gender },
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-6 rounded w-80"
      >
        <h2 className="text-xl font-semibold">Complete Your Profile</h2>
        <input
          type="number"
          placeholder="Age"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
