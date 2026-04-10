/**
 * 🎯 useTriageAnalysis Hook
 * Manages patient registration and analysis flow
 */

import { useState } from 'react';
import {
  registerPatient,
  analyzeAndSave,
  validateFile,
  getErrorMessage,
  PatientData,
  TriageResult,
} from '@/services/api';

interface AnalysisState {
  patientId: number | null;
  audioFile: File | null;
  imageFile: File | null;
  textAnalysis: string;
  loading: boolean;
  error: string | null;
  result: TriageResult | null;
  registrationComplete: boolean;
}

export const useTriageAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    patientId: null,
    audioFile: null,
    imageFile: null,
    textAnalysis: '',
    loading: false,
    error: null,
    result: null,
    registrationComplete: false,
  });

  /**
   * Patient register karo
   */
  const handleRegisterPatient = async (patientData: PatientData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await registerPatient(patientData);

      if (response.success) {
        setState(prev => ({
          ...prev,
          patientId: response.patient_id,
          registrationComplete: true,
          loading: false,
        }));
        return {
          success: true,
          patientId: response.patient_id,
          message: response.message,
        };
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: errorMsg,
        loading: false,
      }));
      return {
        success: false,
        error: errorMsg,
      };
    }
  };

  /**
   * Audio file select karo
   */
  const handleAudioSelect = (file: File | null) => {
    if (!file) {
      setState(prev => ({ ...prev, audioFile: null }));
      return;
    }

    const validation = validateFile(file, 'audio');
    if (!validation.valid) {
      setState(prev => ({
        ...prev,
        error: validation.error || 'Invalid audio file',
      }));
      return;
    }

    setState(prev => ({ ...prev, audioFile: file, error: null }));
  };

  /**
   * Image file select karo
   */
  const handleImageSelect = (file: File | null) => {
    if (!file) {
      setState(prev => ({ ...prev, imageFile: null }));
      return;
    }

    const validation = validateFile(file, 'image');
    if (!validation.valid) {
      setState(prev => ({
        ...prev,
        error: validation.error || 'Invalid image file',
      }));
      return;
    }

    setState(prev => ({ ...prev, imageFile: file, error: null }));
  };

  /**
   * Analysis karo aur save karo
   */
  const handleAnalyze = async () => {
    if (!state.patientId) {
      setState(prev => ({
        ...prev,
        error: 'Please register patient first',
      }));
      return;
    }

    if (!state.audioFile && !state.imageFile && !state.textAnalysis) {
      setState(prev => ({
        ...prev,
        error: 'Please upload at least one file or enter text analysis',
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await analyzeAndSave(
        state.patientId,
        state.audioFile || undefined,
        state.imageFile || undefined,
        state.textAnalysis || undefined
      );

      if (result.success) {
        setState(prev => ({
          ...prev,
          result,
          loading: false,
          audioFile: null,
          imageFile: null,
          textAnalysis: '',
        }));
        return {
          success: true,
          result,
        };
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setState(prev => ({
        ...prev,
        error: errorMsg,
        loading: false,
      }));
      return {
        success: false,
        error: errorMsg,
      };
    }
  };

  /**
   * Analysis reset karo
   */
  const resetAnalysis = () => {
    setState(prev => ({
      ...prev,
      result: null,
      audioFile: null,
      imageFile: null,
      error: null,
    }));
  };

  /**
   * Pura form reset karo
   */
  const resetForm = () => {
    setState({
      patientId: null,
      audioFile: null,
      imageFile: null,
      textAnalysis: '',
      loading: false,
      error: null,
      result: null,
      registrationComplete: false,
    });
  };

  /**
   * Text analysis update karo
   */
  const handleTextAnalysisChange = (text: string) => {
    setState(prev => ({ ...prev, textAnalysis: text }));
  };

  /**
   * Get current text analysis
   */
  const getTextAnalysis = () => state.textAnalysis;

  return {
    // State
    ...state,

    // Methods
    handleRegisterPatient,
    handleAudioSelect,
    handleImageSelect,
    handleTextAnalysisChange,
    handleAnalyze,
    resetAnalysis,
    resetForm,
    getTextAnalysis,
  };
};
