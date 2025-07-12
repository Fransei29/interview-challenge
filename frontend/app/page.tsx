"use client";

import { useEffect, useState } from 'react';
import { assignmentApi, patientApi, medicationApi } from '../utils/api';
import { Assignment, Patient, Medication } from '../types/assignment';
import StatsCards from '../components/StatsCards';
import HeroBanner from '../components/HeroBanner';
import ActionCards from '../components/ActionCards';
import ErrorMessage from '../components/ErrorMessage';
import AssignmentsSection from '../components/AssignmentsSection';
import Footer from '../components/Footer';

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
      <HeroBanner assignments={assignments} getDynamicMessage={getDynamicMessage} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Action Cards */}
        <ActionCards 
          patients={patients} 
          medications={medications} 
          canCreateAssignment={canCreateAssignment} 
        />

        {/* Error Message */}
        <ErrorMessage error={error} />

        {/* Statistics Cards */}
        {!isLoading && !error && (
          <div className="mb-8">
            <StatsCards assignments={assignments} />
          </div>
        )}

        {/* Assignments Table */}
        <AssignmentsSection 
          assignments={assignments} 
          isLoading={isLoading} 
          fetchAssignments={fetchAssignments} 
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
