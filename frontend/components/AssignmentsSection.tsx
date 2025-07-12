"use client";

import { Assignment } from '../types/assignment';
import AssignmentTable from './AssignmentTable';

interface AssignmentsSectionProps {
  assignments: Assignment[];
  isLoading: boolean;
  fetchAssignments: () => void;
}

export default function AssignmentsSection({ assignments, isLoading, fetchAssignments }: AssignmentsSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Treatment Assignments
            </h2>
            <p className="text-gray-600 mt-1">
              Comprehensive overview of all medication assignments and treatment progress
            </p>
          </div>
          <button
            onClick={fetchAssignments}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
      <div className="p-8">
        <AssignmentTable assignments={assignments} isLoading={isLoading} />
      </div>
    </div>
  );
} 