/**
 * TypeScript types for assignment-related data
 */

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Assignment {
  id: number;
  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;
  remainingDays: number;
  patient: Patient;
  medication: Medication;
} 