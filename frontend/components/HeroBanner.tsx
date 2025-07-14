"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface HeroBannerProps {
  assignments: any[];
  getDynamicMessage: () => string;
}

export default function HeroBanner({ assignments, getDynamicMessage }: HeroBannerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/10"></div>
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="text-white" variants={itemVariants}>
            <motion.h1 
              className="text-5xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MediCare
              <span className="text-blue-200"> Hub</span>
            </motion.h1>
            <motion.p 
              className="text-2xl text-blue-100 mb-6 leading-relaxed font-semibold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced patient care management system.
            </motion.p>
            <motion.p 
              className="text-xl text-blue-100 mb-4 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Streamline medication assignments, track treatment progress, and deliver exceptional healthcare outcomes.
            </motion.p>
            <motion.p 
              className="text-lg text-blue-200 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {getDynamicMessage()}
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                variants={statVariants}
              >
                <div className="flex items-center space-x-2">
                  <UserGroupIcon className="w-5 h-5 text-blue-200" />
                  <div>
                    <div className="text-2xl font-bold text-white">{assignments.length}</div>
                    <div className="text-blue-100 text-sm">Active Assignments</div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                variants={statVariants}
              >
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-5 h-5 text-blue-200" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {assignments.filter(a => a.remainingDays > 0).length}
                    </div>
                    <div className="text-blue-100 text-sm">Ongoing Treatments</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hidden lg:block"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                }}
              ></motion.div>
              <motion.div 
                className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
                transition={{ duration: 0.3 }}
              >
                {/* Company Logo */}
                <motion.div 
                  className="absolute top-4 right-4"
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src="/assets/MedicareLogo.png" 
                    alt="MediCare Logo" 
                    width={100} 
                    height={100}
                    className="rounded-2xl"
                  />
                </motion.div>
                <div className="text-center">
                  <motion.div 
                    className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    <Image 
                      src="/assets/doctor.jpg" 
                      alt="Dr. Sarah Johnson" 
                      width={200} 
                      height={200}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    Dr. Sarah Johnson
                  </motion.h3>
                  <motion.p 
                    className="text-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    Chief Medical Officer
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 