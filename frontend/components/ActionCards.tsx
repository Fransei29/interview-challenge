"use client";

import Link from 'next/link';
import { Patient, Medication } from '../types/assignment';

interface ActionCardsProps {
  patients: Patient[];
  medications: Medication[];
  canCreateAssignment: boolean;
}

export default function ActionCards({ patients, medications, canCreateAssignment }: ActionCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Link href="/new-patient" className="group cursor-pointer">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Add Patient</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Register new patients with comprehensive health profiles and demographic information.
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {patients.length} patient{patients.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Link>

      <Link href="/new-medication" className="group cursor-pointer">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Add Medication</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Create medication profiles with dosage, frequency, and administration guidelines.
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {medications.length} medication{medications.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Link>

      <Link href="/new-assignment" className={`group ${canCreateAssignment ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 ${
          canCreateAssignment ? 'hover:shadow-xl' : 'opacity-60'
        }`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 ${
            canCreateAssignment ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
          }`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Create Assignment</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Assign medications to patients with treatment schedules and duration tracking.
          </p>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            canCreateAssignment ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
          }`}>
            {canCreateAssignment ? 'Ready!' : 'Need patients & medications'}
          </div>
        </div>
      </Link>
    </div>
  );
} 