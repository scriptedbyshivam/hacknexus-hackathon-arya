/**
 * 🚑 API Service - Backend Communication Layer
 * Handles all HTTP requests to Flask Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface PatientData {
  name: string;
  age: number;
  phone: string;
  email: string;
  gender?: string;
  address?: string;
  medical_history?: string;
  emergency_contact?: string;
}

export interface TriageResult {
  success: boolean;
  record_id: number;
  patient_id: number;
  analysis: {
    audio_score: number;
    image_score: number;
    priority_level: string;
    triage_score: number;
    recommended_specialist: string;
    injury_detected: string;
    timestamp: string;
  };
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  gender?: string;
  created_at: string;
  latest_record_id?: number;
  priority_level?: string;
  triage_score?: number;
  status?: string;
  timestamp?: string;
  recommended_specialist?: string;
}

// ==========================================
// HEALTH CHECK
// ==========================================
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    throw new Error('Backend server not responding');
  }
};

// ==========================================
// PATIENT MANAGEMENT
// ==========================================

/**
 * Register naya patient
 */
export const registerPatient = async (patientData: PatientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Patient registration error:', error);
    throw error;
  }
};

/**
 * Sab patients fetch karo
 */
export const getAllPatients = async (): Promise<{
  success: boolean;
  count: number;
  patients: Patient[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching patients:', error);
    throw error;
  }
};

/**
 * Specific patient details + history fetch karo
 */
export const getPatientDetails = async (patientId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching patient ${patientId}:`, error);
    throw error;
  }
};

// ==========================================
// ANALYSIS & TRIAGE
// ==========================================

/**
 * Audio aur Image upload karke analyze karo + text analysis
 */
export const analyzeAndSave = async (
  patientId: number,
  audioFile?: File,
  imageFile?: File,
  textAnalysis?: string
): Promise<TriageResult> => {
  try {
    const formData = new FormData();
    formData.append('patient_id', patientId.toString());

    if (audioFile) {
      formData.append('audio', audioFile);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (textAnalysis) {
      formData.append('text_analysis', textAnalysis);
    }

    const response = await fetch(`${API_BASE_URL}/analyze-and-save`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TriageResult = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Analysis error:', error);
    throw error;
  }
};

// ==========================================
// STATUS UPDATES
// ==========================================

/**
 * Patient status update karo
 */
export const updatePatientStatus = async (
  patientId: number,
  status: 'Pending' | 'Attended' | 'Completed',
  doctor?: string,
  notes?: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        doctor_assigned: doctor,
        consultation_notes: notes,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Status update error:', error);
    throw error;
  }
};

// ==========================================
// QUEUE & PRIORITY
// ==========================================

/**
 * Priority queue fetch karo
 */
export const getPriorityQueue = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/priority-queue`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching priority queue:', error);
    throw error;
  }
};

// ==========================================
// STATISTICS
// ==========================================

/**
 * Overall statistics fetch karo
 */
export const getStatistics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/statistics`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching statistics:', error);
    throw error;
  }
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * File ko validate karo
 */
export const validateFile = (
  file: File,
  type: 'audio' | 'image'
): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB

  if (!file) {
    return { valid: false, error: 'File is required' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }

  if (type === 'audio') {
    const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm'];
    if (!audioTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid audio format' };
    }
  }

  if (type === 'image') {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!imageTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid image format' };
    }
  }

  return { valid: true };
};

/**
 * Priority level se color code
 */
export const getPriorityColor = (priority: string): string => {
  if (priority.includes('URGENT')) return '#ef4444'; // Red
  if (priority.includes('HIGH')) return '#f97316'; // Orange
  if (priority.includes('MEDIUM')) return '#eab308'; // Yellow
  return '#22c55e'; // Green
};

/**
 * API error message extract karo
 */
export const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (error?.error) {
    return error.error;
  }
  return 'An unexpected error occurred';
};
