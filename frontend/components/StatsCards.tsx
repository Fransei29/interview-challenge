"use client";

import { motion } from 'framer-motion';
import { 
  ClipboardDocumentListIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Assignment } from '../types/assignment';

export default function StatsCards({ assignments }: { assignments: Assignment[] }) {
  const totalAssignments = assignments.length;
  const activeAssignments = assignments.filter(assignment => assignment.remainingDays > 0).length;
  const completedAssignments = assignments.filter(assignment => assignment.remainingDays === 0).length;
  const upcomingAssignments = assignments.filter(assignment => {
    const startDate = new Date(assignment.startDate);
    const today = new Date();
    return startDate > today;
  }).length;

  const stats = [
    {
      title: 'Total Assignments',
      value: totalAssignments,
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50 to-gray-100',
      icon: ClipboardDocumentListIcon,
      color: 'gray'
    },
    {
      title: 'Active Treatments',
      value: activeAssignments,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      icon: BoltIcon,
      color: 'blue'
    },
    {
      title: 'Completed',
      value: completedAssignments,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      title: 'Upcoming',
      value: upcomingAssignments,
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
      icon: ClockIcon,
      color: 'yellow'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 10,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <motion.div 
            key={index} 
            className="group"
            variants={cardVariants}
          >
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border transition-all duration-300 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-3 text-white shadow-lg`}
                    variants={iconVariants}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <motion.p 
                      className="text-3xl font-bold text-card-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (stat.value / Math.max(1, totalAssignments)) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 