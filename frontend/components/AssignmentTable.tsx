"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  BoltIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Assignment } from '../types/assignment';

/**
 * Assignment table component
 * Displays patient assignments with medication information in a clean, modern table
 */
interface AssignmentTableProps {
  assignments: Assignment[];
  isLoading: boolean;
}

export default function AssignmentTable({ assignments, isLoading }: AssignmentTableProps) {
  if (isLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative">
          <motion.div 
            className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div 
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-muted-foreground font-medium">Loading assignments...</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (assignments.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <ClipboardDocumentListIcon className="w-12 h-12 text-muted-foreground" />
        </motion.div>
        <motion.h3 
          className="text-xl font-semibold text-card-foreground mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          No assignments available
        </motion.h3>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create your first medication assignment to get started with patient treatment tracking.
        </motion.p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="overflow-hidden rounded-2xl border border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Patient
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Medication
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Duration
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Remaining Days
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            <AnimatePresence>
              {assignments.map((assignment) => {
                const startDate = new Date(assignment.startDate);
                const remainingDays = assignment.remainingDays;
                
                const isCompleted = remainingDays === 0;
                const isActive = !isCompleted && remainingDays > 0;
                const isUrgent = remainingDays <= 3 && remainingDays > 0;

                return (
                  <motion.tr 
                    key={assignment.id} 
                    className="hover:bg-muted/50 transition-all duration-200 group"
                    variants={rowVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <motion.div 
                          className="flex-shrink-0"
                          transition={{ duration: 0.2 }}
                        >
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {assignment.patient.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </motion.div>
                        <div className="ml-4">
                          <div className="text-lg font-semibold text-card-foreground group-hover:text-blue-600 transition-colors">
                            {assignment.patient.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {assignment.patient.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div>
                        <div className="text-lg font-semibold text-card-foreground">
                          {assignment.medication.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {assignment.medication.dosage} • {assignment.medication.frequency}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-lg font-medium text-card-foreground">
                        {startDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-lg font-medium text-card-foreground">
                        {assignment.numberOfDays} days
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <motion.div 
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                          isCompleted 
                            ? 'bg-red-100 text-red-700' 
                            : isUrgent
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                        transition={{ duration: 0.2 }}
                      >
                        {remainingDays === 0 ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <ClockIcon className="w-4 h-4 mr-2" />
                            {remainingDays} days
                          </>
                        )}
                      </motion.div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <motion.div 
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                          isCompleted 
                            ? 'bg-muted text-muted-foreground' 
                            : isActive 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                        transition={{ duration: 0.2 }}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : isActive ? (
                          <>
                            <BoltIcon className="w-4 h-4 mr-2" />
                            Active
                          </>
                        ) : (
                          <>
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Upcoming
                          </>
                        )}
                      </motion.div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 