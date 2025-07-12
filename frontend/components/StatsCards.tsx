"use client";

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
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Active Treatments',
      value: activeAssignments,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Completed',
      value: completedAssignments,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Upcoming',
      value: upcomingAssignments,
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="group">
          <div className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-3 text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, (stat.value / Math.max(1, totalAssignments)) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 