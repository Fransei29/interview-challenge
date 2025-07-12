"use client";

import { useRouter } from 'next/navigation';

/**
 * Reusable back button component
 * Provides consistent navigation back to the main menu
 */
export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="group inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
    >
      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="font-semibold text-lg">Back to Dashboard</span>
    </button>
  );
} 