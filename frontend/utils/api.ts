import axios from 'axios';
import { Assignment, Patient, Medication } from '../types/assignment';

/**
 * TypeScript type for creating a new patient
 */
export interface CreatePatientPayload {
  name: string;
  dateOfBirth: string;
}

/**
 * TypeScript type for creating a new medication
 */
export interface CreateMedicationPayload {
  name: string;
  dosage: string;
  frequency: string;
}

/**
 * TypeScript type for creating a new assignment
 */
export interface CreateAssignmentPayload {
  patientId: number;
  medicationId: number;
  startDate: string;
  numberOfDays: number;
}

/**
 * API configuration and utility functions
 * Centralized HTTP client for backend communication
 */

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Assignment API functions
 */
export const assignmentApi = {
  /**
   * Fetch all assignments with patient and medication data
   */
  getAll: async (): Promise<Assignment[]> => {
    const response = await api.get<Assignment[]>('/assignments');
    return response.data;
  },

  /**
   * Fetch single assignment by ID
   */
  getById: async (id: number): Promise<Assignment> => {
    const response = await api.get<Assignment>(`/assignments/${id}`);
    return response.data;
  },

  /**
   * Create a new assignment
   * @param payload - Assignment data (patientId, medicationId, startDate, numberOfDays)
   */
  create: async (payload: CreateAssignmentPayload) => {
    const response = await api.post('/assignments', payload);
    return response.data;
  },
};

/**
 * Patient API functions
 */
export const patientApi = {
  /**
   * Fetch all patients
   */
  getAll: async (): Promise<Patient[]> => {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },

  /**
   * Create a new patient
   * @param payload - Patient data (name, dateOfBirth)
   */
  create: async (payload: CreatePatientPayload) => {
    const response = await api.post('/patients', payload);
    return response.data;
  },
};

/**
 * Medication API functions
 */
export const medicationApi = {
  /**
   * Fetch all medications
   */
  getAll: async (): Promise<Medication[]> => {
    const response = await api.get<Medication[]>('/medications');
    return response.data;
  },

  /**
   * Create a new medication
   * @param payload - Medication data (name, dosage, frequency)
   */
  create: async (payload: CreateMedicationPayload) => {
    const response = await api.post('/medications', payload);
    return response.data;
  },
};

export default api; 