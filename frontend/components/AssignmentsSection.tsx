"use client";

import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Assignment } from '../types/assignment';
import AssignmentTable from './AssignmentTable';

interface AssignmentsSectionProps {
  assignments: Assignment[];
  isLoading: boolean;
  fetchAssignments: () => void;
}

export default function AssignmentsSection({ assignments, isLoading, fetchAssignments }: AssignmentsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const buttonVariants = {
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-8 py-6 border-b border-border bg-muted">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground">
              Treatment Assignments
            </h2>
            <p className="text-muted-foreground mt-1">
              Comprehensive overview of all medication assignments and treatment progress
            </p>
          </motion.div>
          <motion.button
            onClick={fetchAssignments}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
            variants={buttonVariants}
            whileTap="tap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
            >
              <ArrowPathIcon className="w-5 h-5" />
            </motion.div>
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </motion.button>
        </div>
      </div>
      <motion.div 
        className="p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <AssignmentTable assignments={assignments} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
} 