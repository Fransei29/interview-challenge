"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * Reusable back button component
 * Provides consistent navigation back to the main menu
 */
export default function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push('/')}
      className="group inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
      whileHover={{ 
        x: -5,
        transition: { duration: 0.2, ease: "easeInOut" as const }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" as const }}
    >
      <motion.div
        className="flex items-center"
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </motion.div>
      <span className="font-semibold text-lg">Back to Dashboard</span>
    </motion.button>
  );
} 