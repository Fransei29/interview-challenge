"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon, 
  BeakerIcon, 
  ClipboardDocumentListIcon 
} from '@heroicons/react/24/outline';
import { Patient, Medication } from '../types/assignment';

interface ActionCardsProps {
  patients: Patient[];
  medications: Medication[];
  canCreateAssignment: boolean;
}

const cardVariants = {
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

const iconVariants = {
  rest: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  },
  hover: {
    rotate: 5,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  }
};

export default function ActionCards({ patients, medications, canCreateAssignment }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Link href="/new-patient" className="group cursor-pointer">
        <motion.div 
          className="bg-card dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          animate="visible"
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              variants={iconVariants}
            >
              <UserPlusIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-gray-900 dark:group-hover:text-white mb-3 transition-colors duration-300">Add Patient</h3>
            <p className="text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 leading-relaxed mb-4 transition-colors duration-300">
              Register new patients with comprehensive health profiles and demographic information.
            </p>
            <motion.div 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200"
              transition={{ duration: 0.2 }}
            >
              {patients.length} patient{patients.length !== 1 ? 's' : ''}
            </motion.div>
          </div>
        </motion.div>
      </Link>

      <Link href="/new-medication" className="group cursor-pointer">
        <motion.div 
          className="bg-card dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              variants={iconVariants}
            >
              <BeakerIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-gray-900 dark:group-hover:text-white mb-3 transition-colors duration-300">Add Medication</h3>
            <p className="text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 leading-relaxed mb-4 transition-colors duration-300">
              Create medication profiles with dosage, frequency, and administration guidelines.
            </p>
            <motion.div 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200"
              transition={{ duration: 0.2 }}
            >
              {medications.length} medication{medications.length !== 1 ? 's' : ''}
            </motion.div>
          </div>
        </motion.div>
      </Link>

      <Link href="/new-assignment" className={`group ${canCreateAssignment ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        <motion.div 
          className={`bg-card dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-border transition-all duration-300 relative overflow-hidden ${
            canCreateAssignment ? 'hover:shadow-2xl' : 'opacity-60'
          }`}
          variants={cardVariants}
          initial="rest"
          whileHover={canCreateAssignment ? "hover" : undefined}
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {/* Background gradient effect */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            canCreateAssignment ? 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40' : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/40 dark:to-slate-950/40'
          }`}></div>
          
          <div className="relative z-10">
            <motion.div 
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                canCreateAssignment ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
              }`}
              variants={iconVariants}
            >
              <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-gray-900 dark:group-hover:text-white mb-3 transition-colors duration-300">Create Assignment</h3>
            <p className="text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-200 leading-relaxed mb-4 transition-colors duration-300">
              Assign medications to patients with treatment schedules and duration tracking.
            </p>
            <motion.div 
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                canCreateAssignment ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200' : 'bg-muted text-muted-foreground'
              }`}
              transition={{ duration: 0.2 }}
            >
              {canCreateAssignment ? 'Ready!' : 'Need patients & medications'}
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
} 