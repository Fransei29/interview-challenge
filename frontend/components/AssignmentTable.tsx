"use client";

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
      <div className="flex justify-center items-center py-16">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">Loading assignments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No assignments available
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Create your first medication assignment to get started with patient treatment tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Medication
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Remaining Days
              </th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {assignments.map((assignment) => {
              const startDate = new Date(assignment.startDate);
              const remainingDays = assignment.remainingDays;
              
              const isCompleted = remainingDays === 0;
              const isActive = !isCompleted && remainingDays > 0;
              const isUrgent = remainingDays <= 3 && remainingDays > 0;

              return (
                <tr key={assignment.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {assignment.patient.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {assignment.patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {assignment.patient.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {assignment.medication.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {assignment.medication.dosage} • {assignment.medication.frequency}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-lg font-medium text-gray-900">
                      {startDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="text-lg font-medium text-gray-900">
                      {assignment.numberOfDays} days
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                      isCompleted 
                        ? 'bg-red-100 text-red-700' 
                        : isUrgent
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {remainingDays === 0 ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Completed
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {remainingDays} days
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${
                      isCompleted 
                        ? 'bg-gray-100 text-gray-700' 
                        : isActive 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {isCompleted ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          Completed
                        </>
                      ) : isActive ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Active
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Upcoming
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
} 