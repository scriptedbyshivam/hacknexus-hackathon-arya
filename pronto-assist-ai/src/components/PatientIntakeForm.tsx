/**
 * 🏥 Patient Intake Form Component
 * Complete patient registration and analysis flow
 */

import { useState } from 'react';
import { useTriageAnalysis } from '@/hooks/useTriageAnalysis';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Loader2, Upload } from 'lucide-react';

export function PatientIntakeForm() {
  const {
    patientId,
    audioFile,
    imageFile,
    loading,
    error,
    result,
    registrationComplete,
    handleRegisterPatient,
    handleAudioSelect,
    handleImageSelect,
    handleAnalyze,
    resetForm,
    resetAnalysis,
  } = useTriageAnalysis();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    gender: 'Other',
    address: '',
    medical_history: '',
    emergency_contact: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.age) {
      alert('❌ Please fill Name and Age');
      return;
    }

    const response = await handleRegisterPatient({
      name: formData.name,
      age: parseInt(formData.age),
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      address: formData.address,
      medical_history: formData.medical_history,
      emergency_contact: formData.emergency_contact,
    });

    if (response.success) {
      alert(`✅ Patient Registered!\nID: ${response.patientId}`);
    } else {
      alert(`❌ ${response.error}`);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAudioSelect(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleAnalyzeClick = async () => {
    const response = await handleAnalyze();
    if (!response.success) {
      alert(`❌ ${response.error}`);
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    if (priority.includes('URGENT')) return 'bg-red-100 text-red-800';
    if (priority.includes('HIGH')) return 'bg-orange-100 text-orange-800';
    if (priority.includes('MEDIUM')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* STEP 1: PATIENT REGISTRATION */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              Patient Registration
            </CardTitle>
            <CardDescription className="text-blue-100">
              Step 1 of 3 - Enter patient details
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {error && !registrationComplete && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    placeholder="e.g., Rahul Kumar"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="age"
                    type="number"
                    placeholder="e.g., 28"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-blue-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    name="address"
                    placeholder="Patient address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>

                {/* Medical History */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Medical History</label>
                  <textarea
                    name="medical_history"
                    placeholder="Previous conditions, allergies, medications..."
                    value={formData.medical_history}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    rows={3}
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-blue-500"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                  <Input
                    name="emergency_contact"
                    placeholder="Name and phone of emergency contact"
                    value={formData.emergency_contact}
                    onChange={handleInputChange}
                    disabled={registrationComplete || loading}
                    className="border-blue-300 focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={registrationComplete || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : registrationComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Registered
                  </>
                ) : (
                  'Register Patient'
                )}
              </Button>

              {patientId && (
                <Alert className="bg-green-50 border-green-300">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    ✅ Patient ID: <strong>{patientId}</strong> - Ready for analysis
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>

        {/* STEP 2: FILE UPLOAD (Only show after registration) */}
        {registrationComplete && patientId && (
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📤</span>
                Medical Analysis
              </CardTitle>
              <CardDescription className="text-green-100">
                Step 2 of 3 - Upload audio and/or image for analysis
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Audio Upload */}
              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 hover:border-green-500 transition">
                <label className="block text-sm font-medium mb-3">
                  🎤 Audio File (Patient Symptoms)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                  disabled={loading}
                  className="block w-full text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-100 file:text-green-700
                    hover:file:bg-green-200"
                />
                {audioFile && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ File selected: {audioFile.name}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed border-green-300 rounded-lg p-6 hover:border-green-500 transition">
                <label className="block text-sm font-medium mb-3">
                  🖼️ Image File (Injury/Condition)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="block w-full text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-100 file:text-green-700
                    hover:file:bg-green-200"
                />
                {imageFile && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ File selected: {imageFile.name}
                  </p>
                )}
              </div>

              {/* Info */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  💡 Upload at least one file (audio or image) for analysis
                </AlertDescription>
              </Alert>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyzeClick}
                disabled={!audioFile && !imageFile || loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing... (This may take a minute)
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Analyze & Save
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* STEP 3: RESULTS (Show after analysis) */}
        {result && result.success && (
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Triage Result
              </CardTitle>
              <CardDescription className="text-purple-100">
                Step 3 of 3 - Analysis complete
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Priority Badge */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg font-semibold text-gray-700">Priority Level:</span>
                  <Badge className={`text-lg px-4 py-2 ${getPriorityBadgeColor(result.analysis.priority_level)}`}>
                    {result.analysis.priority_level}
                  </Badge>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-600 font-medium">🎤 Audio Score</p>
                    <p className="text-3xl font-bold text-blue-700 mt-2">
                      {result.analysis.audio_score.toFixed(1)}/10
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm text-indigo-600 font-medium">🖼️ Image Score</p>
                    <p className="text-3xl font-bold text-indigo-700 mt-2">
                      {result.analysis.image_score.toFixed(1)}/10
                    </p>
                  </div>
                </div>

                {/* Final Triage Score */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">📊 Final Triage Score</p>
                  <p className="text-4xl font-bold text-purple-700 mt-2">
                    {result.analysis.triage_score.toFixed(2)}/10
                  </p>
                </div>

                {/* Analysis Details */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Injury Detected:</span>
                    <span className="text-gray-600">{result.analysis.injury_detected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Recommended Specialist:</span>
                    <span className="font-semibold text-blue-600">{result.analysis.recommended_specialist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Record ID:</span>
                    <span className="text-gray-600">#{result.record_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Time:</span>
                    <span className="text-gray-600">
                      {new Date(result.analysis.timestamp).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    📤 Upload Another
                  </Button>
                  <Button
                    onClick={resetForm}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    🔄 Register New Patient
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
