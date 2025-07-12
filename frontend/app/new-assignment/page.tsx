"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { assignmentApi, patientApi, medicationApi, CreateAssignmentPayload } from '../../utils/api';
import { Patient, Medication } from '../../types/assignment';
import BackButton from '../../components/BackButton';

export default function NewAssignmentPage() {
  const [patientId, setPatientId] = useState<number | ''>('');
  const [medicationId, setMedicationId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        setDataError(null);
        
        const [patientsData, medicationsData] = await Promise.all([
          patientApi.getAll(),
          medicationApi.getAll()
        ]);
        
        setPatients(patientsData);
        setMedications(medicationsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setDataError('Failed to load patients and medications. Please try again.');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!patientId || !medicationId || !startDate || !numberOfDays) {
      setError('Please complete all required fields.');
      return;
    }

    if (numberOfDays <= 0) {
      setError('Number of days must be greater than 0.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CreateAssignmentPayload = {
        patientId: Number(patientId),
        medicationId: Number(medicationId),
        startDate,
        numberOfDays: Number(numberOfDays),
      };
      await assignmentApi.create(payload);
      setSuccess(true);
      setTimeout(() => router.push('/'), 1200);
    } catch (err) {
      setError('Failed to create assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Data</h2>
                <p className="text-gray-600">Fetching patients and medications...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Data</h1>
                <p className="text-xl text-gray-600 mb-8">{dataError}</p>
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Treatment Assignment</h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Assign medications to patients with treatment schedules and duration tracking
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Patient select */}
              <div className="group">
                <label htmlFor="patientId" className="block text-lg font-semibold text-gray-900 mb-3">
                  Select Patient <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <select
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value ? Number(e.target.value) : '')}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Choose a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} (ID: {patient.id})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Medication select */}
              <div className="group">
                <label htmlFor="medicationId" className="block text-lg font-semibold text-gray-900 mb-3">
                  Select Medication <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <select
                    id="medicationId"
                    value={medicationId}
                    onChange={(e) => setMedicationId(e.target.value ? Number(e.target.value) : '')}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-gray-50/50 hover:bg-white appearance-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Choose a medication</option>
                    {medications.map((medication) => (
                      <option key={medication.id} value={medication.id}>
                        {medication.name} - {medication.dosage} ({medication.frequency})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Start date input */}
              <div className="group">
                <label htmlFor="startDate" className="block text-lg font-semibold text-gray-900 mb-3">
                  Treatment Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Number of days input */}
              <div className="group">
                <label htmlFor="numberOfDays" className="block text-lg font-semibold text-gray-900 mb-3">
                  Treatment Duration (Days) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    id="numberOfDays"
                    type="number"
                    min="1"
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value ? Number(e.target.value) : '')}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    placeholder="e.g. 10 days"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-red-800">Error</h3>
                      <div className="mt-2 text-red-700">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-800">Success!</h3>
                      <div className="mt-2 text-green-700">Assignment created successfully! Redirecting...</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xl font-bold py-4 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Creating Assignment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Assignment
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-600">
                <span className="font-semibold">Treatment Tracking</span> • All assignments are monitored for progress and completion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 