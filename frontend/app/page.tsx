"use client";

import { useEffect, useState } from 'react';
import { assignmentApi, patientApi, medicationApi } from '../utils/api';
import { Assignment, Patient, Medication } from '../types/assignment';
import AssignmentTable from '../components/AssignmentTable';
import StatsCards from '../components/StatsCards';
import Link from 'next/link';

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await assignmentApi.getAll();
      setAssignments(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Error al cargar las asignaciones. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [assignmentsData, patientsData, medicationsData] = await Promise.all([
        assignmentApi.getAll(),
        patientApi.getAll(),
        medicationApi.getAll()
      ]);
      setAssignments(assignmentsData);
      setPatients(patientsData);
      setMedications(medicationsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al cargar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Dynamic messaging based on data
  const getDynamicMessage = () => {
    const patientCount = patients.length;
    const medicationCount = medications.length;
    
    if (patientCount === 0 && medicationCount === 0) {
      return "Start by creating a patient and medication to begin tracking treatments";
    } else if (patientCount > 0 && medicationCount === 0) {
      return `Great! You have ${patientCount} patient${patientCount > 1 ? 's' : ''}. Now add a medication to start creating assignments`;
    } else if (patientCount === 0 && medicationCount > 0) {
      return `You have ${medicationCount} medication${medicationCount > 1 ? 's' : ''}. Create a patient to begin assigning treatments`;
    } else {
      return `Perfect! You have ${patientCount} patient${patientCount > 1 ? 's' : ''} and ${medicationCount} medication${medicationCount > 1 ? 's' : ''} ready for assignments`;
    }
  };

  const canCreateAssignment = patients.length > 0 && medications.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                MediCare
                <span className="text-blue-200"> Hub</span>
              </h1>
              <p className="text-xl text-blue-100 mb-4 leading-relaxed">
                Advanced patient care management system. Streamline medication assignments, 
                track treatment progress, and deliver exceptional healthcare outcomes.
              </p>
              <p className="text-lg text-blue-200 mb-8">
                {getDynamicMessage()}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{assignments.length}</div>
                  <div className="text-blue-100 text-sm">Active Assignments</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">
                    {assignments.filter(a => a.remainingDays > 0).length}
                  </div>
                  <div className="text-blue-100 text-sm">Ongoing Treatments</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Dr. Sarah Johnson</h3>
                    <p className="text-blue-100">Chief Medical Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Action Cards */}
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

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-red-800">
                  Connection Error
                </h3>
                <div className="mt-2 text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {!isLoading && !error && (
          <div className="mb-8">
            <StatsCards assignments={assignments} />
          </div>
        )}

        {/* Assignments Table */}
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

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="font-medium">Next.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="font-medium">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="font-medium">Tailwind CSS</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Backend: NestJS + TypeORM + SQLite | Built with modern web technologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
