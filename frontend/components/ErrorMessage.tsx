"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div 
          className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" as const }}
        >
          <div className="flex items-start">
            <motion.div 
              className="flex-shrink-0"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
            </motion.div>
            <div className="ml-4">
              <motion.h3 
                className="text-lg font-semibold text-red-800"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Connection Error
              </motion.h3>
              <motion.div 
                className="mt-2 text-red-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {error}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 