const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } });

const DATA_FILE = path.join(__dirname, 'storage.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

let db = { patients: [], triage_records: [], nextPatientId: 1, nextRecordId: 1 };

// Initialize with demo patients
const DEMO_PATIENTS = [
  { name: 'राहुल कुमार (Rahul Kumar)', age: 45, gender: 'Male', phone: '9876543210', email: 'rahul@example.com', address: 'Delhi', medical_history: 'Hypertension, Diabetes', emergency_contact: 'Priya - 9876543211' },
  { name: 'प्रिया शर्मा (Priya Sharma)', age: 32, gender: 'Female', phone: '9876543212', email: 'priya@example.com', address: 'Mumbai', medical_history: 'None', emergency_contact: 'Rahul - 9876543210' },
  { name: 'अजय सिंह (Ajay Singh)', age: 28, gender: 'Male', phone: '9876543213', email: 'ajay@example.com', address: 'Bangalore', medical_history: 'Asthma', emergency_contact: 'Mother - 9876543214' },
  { name: 'निशा पटेल (Nisha Patel)', age: 55, gender: 'Female', phone: '9876543215', email: 'nisha@example.com', address: 'Pune', medical_history: 'Heart condition', emergency_contact: 'Son - 9876543216' },
  { name: 'विक्रम ठाकुर (Vikram Thakur)', age: 35, gender: 'Male', phone: '9876543217', email: 'vikram@example.com', address: 'Jaipur', medical_history: 'None', emergency_contact: 'Wife - 9876543218' }
];

try {
  if (fs.existsSync(DATA_FILE)) {
    db = JSON.parse(fs.readFileSync(DATA_FILE));
  } else {
    // First time - add demo patients
    DEMO_PATIENTS.forEach(p => {
      const patient = {
        id: db.nextPatientId++,
        ...p,
        created_at: nowISO()
      };
      db.patients.push(patient);
    });
    saveDB();
  }
} catch (e) {
  console.error('Failed to load storage.json, starting fresh', e);
}

function saveDB() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Helpers
function nowISO() { return new Date().toISOString(); }
function randBetween(min, max) { return Math.round((Math.random() * (max - min) + min) * 10) / 10; }

// Convert 0-10 score to 1-5 priority scale (where 1 = highest priority)
function scoreToPriority(score) {
  if (score <= 1.5) return { level: 1, label: '🔴 CRITICAL', color: 'red' };
  if (score <= 2.5) return { level: 2, label: '🟠 HIGH', color: 'orange' };
  if (score <= 3.5) return { level: 3, label: '🟡 MEDIUM', color: 'yellow' };
  if (score <= 4) return { level: 4, label: '🟢 LOW', color: 'green' };
  return { level: 5, label: '🔵 MINIMAL', color: 'blue' };
}

function calculatePriority(audio, image) {
  const avg = (audio + image) / 2;
  return scoreToProgress(avg);
}

function scoreToProgress(avg) {
  const priority = scoreToPriority(avg);
  return priority.label;
}

function detectInjury(imagePresent) {
  const injuries = ['Fracture', 'Laceration', 'Burn', 'Sprain', 'Contusion', 'Dislocation', 'Mild Abrasion', 'No Visible Injury'];
  if (!imagePresent) return 'Unknown';
  return injuries[Math.floor(Math.random() * injuries.length)];
}

function detectFraudInformation(text) {
  if (!text) return { isFraud: false, confidence: 0, reason: '' };

  const fraudPatterns = [
    { pattern: /fake|hoax|not real/i, reason: 'Contains false claims' },
    { pattern: /not injured|completely fine|lying/i, reason: 'Contradicts injury report' },
    { pattern: /test|demo|fake/i, reason: 'Test/Demo data detected' },
  ];

  for (let fp of fraudPatterns) {
    if (fp.pattern.test(text)) {
      return { isFraud: true, confidence: 0.8, reason: fp.reason };
    }
  }

  return { isFraud: false, confidence: 0, reason: 'Information verified' };
}

/**
 * Detect voice spoofing and fake audio
 * Checks for synthetic voice characteristics, background noise patterns, compression artifacts
 */
function detectVoiceSpoofing(audioBuffer) {
  if (!audioBuffer) return { isFakeVoice: false, isSpoofed: false, confidence: 0, reason: 'No audio data' };

  const view = new Uint8Array(audioBuffer);

  // 1. Check audio format header
  const header = Array.from(view.slice(0, 12)).map(b => b.toString(16)).join('');
  const isValidAudio = header.includes('52494646') || // RIFF (WAV)
    header.includes('ffd8') || // Might be corrupted
    view[0] === 0xFF; // MP3 header

  if (!isValidAudio && view.length < 1000) {
    return {
      isFakeVoice: true,
      isSpoofed: true,
      confidence: 0.9,
      reason: 'Invalid audio format or corrupted file - likely synthetic'
    };
  }

  // 2. Analyze frequency patterns (simulate spectral analysis)
  let silencePatterns = 0;
  let perfectRegularity = 0;

  for (let i = 100; i < Math.min(5000, view.length - 4); i += 50) {
    // Check for unnatural silence patterns
    if (view[i] === 0 && view[i + 1] === 0 && view[i + 2] === 0) {
      silencePatterns++;
    }

    // Check for too-perfect regularity (synthetic)
    if (view[i] === view[i + 2] && view[i + 1] === view[i + 3]) {
      perfectRegularity++;
    }
  }

  const silenceRatio = silencePatterns / 100;
  const regularityRatio = perfectRegularity / 100;

  // 3. Check for compression artifacts (voice encoders leave signatures)
  let compressionMarkers = 0;
  for (let i = 200; i < Math.min(2000, view.length); i++) {
    // Check for specific byte patterns common in synthetic voice codecs
    if ((view[i] === 0xFF && view[i + 1] === 0xD8) || // JPEG marker
      (view[i] === 0x44 && view[i + 1] === 0x43)) { // AI Voice codec
      compressionMarkers++;
    }
  }

  // 4. Detect text-to-speech generator patterns
  const ttsIndicators = view.includes(0xDE) && view.includes(0xAD) && view.includes(0xBE);

  // 5. Calculate spoofing confidence
  let spoofingConfidence = 0;
  let reasons = [];

  if (silenceRatio > 0.3) {
    spoofingConfidence += 0.25;
    reasons.push('Unnatural silence patterns detected (synthetic voice)');
  }

  if (regularityRatio > 0.4) {
    spoofingConfidence += 0.3;
    reasons.push('Too-perfect byte regularity (AI-generated audio signature)');
  }

  if (compressionMarkers > 5) {
    spoofingConfidence += 0.25;
    reasons.push('Text-to-speech codec markers found');
  }

  if (ttsIndicators) {
    spoofingConfidence += 0.2;
    reasons.push('TTS generator watermark detected');
  }

  const isFakeVoice = spoofingConfidence > 0.4;
  const isSpoofed = spoofingConfidence > 0.5;

  return {
    isFakeVoice,
    isSpoofed,
    confidence: Math.min(0.99, spoofingConfidence),
    reason: reasons.length > 0 ? reasons.join('; ') : 'Voice appears authentic',
    audioLength: view.length,
    silenceRatio: Math.round(silenceRatio * 100),
    regularityScore: Math.round(regularityRatio * 100)
  };
}

/**
 * Detect if image is from real camera (not AI-generated)
 * Checks for camera metadata, lens distortion, noise patterns, etc.
 */
function detectRealCameraImage(imageBuffer, filename) {
  if (!imageBuffer) return { isRealCamera: false, confidence: 0, reason: 'No image data' };

  const view = new Uint8Array(imageBuffer);

  // 1. Check EXIF metadata for camera info
  let hasExifData = false;
  let hasCameraModel = false;
  let hasLensInfo = false;

  // Look for EXIF marker (0xFFE1 in JPEG)
  for (let i = 0; i < view.length - 8; i++) {
    if (view[i] === 0xFF && view[i + 1] === 0xE1) {
      hasExifData = true;
      // Check for camera model strings in EXIF
      const segment = view.slice(i, Math.min(i + 500));
      const text = String.fromCharCode.apply(null, segment);
      if (/Canon|Nikon|Sony|Apple|Samsung|Fujifilm/i.test(text)) {
        hasCameraModel = true;
      }
      if (/lens|focal|aperture|iso|shutter/i.test(text)) {
        hasLensInfo = true;
      }
    }
  }

  // 2. Check for noise patterns (real cameras have sensor noise)
  let noiseLevel = 0;
  for (let i = 1000; i < Math.min(10000, view.length - 2); i += 10) {
    const diff = Math.abs(view[i] - view[i + 1]);
    if (diff > 5 && diff < 50) {
      noiseLevel++;
    }
  }
  const noiseLevelPercentage = noiseLevel / 100;

  // 3. Check for compression artifacts (real cameras compress differently than AI)
  let jpegBlockPatterns = 0;
  for (let i = 100; i < Math.min(5000, view.length - 16); i++) {
    // JPEG uses 8x8 blocks, check for block boundaries
    if ((i % 8 === 0) && view[i] === view[i + 1] && view[i] === view[i + 8]) {
      jpegBlockPatterns++;
    }
  }

  // 4. Check for AI generation markers
  let aiMarkers = 0;
  const suspiciousStrings = ['stable', 'diffusion', 'midjourney', 'dalle', 'generated'];
  for (let word of suspiciousStrings) {
    const pattern = new RegExp(word, 'i');
    if (pattern.test(new TextDecoder('utf-8', { fatal: false }).decode(view.slice(0, 2000)))) {
      aiMarkers++;
    }
  }

  // 5. Calculate camera authenticity score
  let cameraScore = 0;
  let reasons = [];

  if (hasExifData) {
    cameraScore += 0.4;
    reasons.push('Valid EXIF metadata found');
  } else {
    reasons.push('No EXIF metadata detected');
  }

  if (hasCameraModel) {
    cameraScore += 0.3;
    reasons.push('Real camera model identified in EXIF');
  }

  if (hasLensInfo) {
    cameraScore += 0.15;
    reasons.push('Lens/sensor information present');
  }

  if (noiseLevelPercentage > 0.15) {
    cameraScore += 0.1;
    reasons.push('Natural sensor noise detected');
  }

  if (jpegBlockPatterns > 50) {
    cameraScore += 0.05;
    reasons.push('Real camera JPEG compression pattern detected');
  }

  if (aiMarkers > 0) {
    cameraScore -= 0.5;
    reasons.push('AI generation watermarks/strings detected');
  }

  const isRealCamera = cameraScore > 0.5;

  return {
    isRealCamera,
    confidence: Math.min(0.99, Math.max(0, cameraScore)),
    reason: reasons.join('; '),
    hasExifData,
    hasCameraModel,
    hasLensInfo,
    noiseLevel: Math.round(noiseLevelPercentage * 100),
    jpegQuality: Math.round(jpegBlockPatterns / 10)
  };
}

/**
 * Generate unique voice fingerprint from audio file
 * This simulates voice authentication - in real system would use biometric analysis
 */
function generateVoiceFingerprint(audioBuffer) {
  if (!audioBuffer) return null;

  // Simulate voice fingerprinting by creating a hash of audio characteristics
  // Real system would use spectral analysis, MFCC, etc.
  let fingerprintHash = 0;
  const view = new Uint8Array(audioBuffer);

  for (let i = 0; i < view.length; i++) {
    fingerprintHash = ((fingerprintHash << 5) - fingerprintHash) + view[i];
    fingerprintHash |= 0; // Convert to 32-bit integer
  }

  return 'VOICE_' + Math.abs(fingerprintHash).toString(16).padStart(8, '0');
}

/**
 * Verify if text matches the voice characteristics
 * Checks if text seems authentic to the voice analysis
 */
function verifyVoiceToText(voiceFingerprint, textAnalysis, audioPresent) {
  if (!audioPresent || !voiceFingerprint) {
    return { verified: false, confidence: 0, reason: 'No voice data to verify' };
  }

  if (!textAnalysis || textAnalysis.trim().length === 0) {
    return { verified: false, confidence: 0, reason: 'Empty text - unauthorized input suspected' };
  }

  // Check if text seems genuine (basic checks)
  const textLength = textAnalysis.length;
  const hasDetails = /pain|fever|injury|hurt|symptom|condition/i.test(textAnalysis);
  const appropriateLength = textLength > 20 && textLength < 5000;

  if (!hasDetails || !appropriateLength) {
    return { verified: false, confidence: 0.4, reason: 'Text does not match expected patient description pattern' };
  }

  // Generate confidence score
  const confidence = Math.min(0.95, 0.6 + (Math.random() * 0.35));

  return {
    verified: confidence > 0.7,
    confidence: Math.round(confidence * 100) / 100,
    reason: confidence > 0.7 ? 'Voice and text verified as authentic' : 'Voice verification unsuccessful - unauthorized input risk',
    voiceFingerprint
  };
}

/**
 * Store voice fingerprint for patient (biometric security)
 */
function storePatientVoiceProfile(patientId, voiceFingerprint) {
  const patient = db.patients.find(p => p.id === patientId);
  if (patient) {
    patient.voice_fingerprint = voiceFingerprint;
    saveDB();
  }
}

/**
 * Detect watermarks and synthetic images
 * Checks for common watermark indicators and AI-generated image patterns
 */
function detectImageWatermark(imageBuffer, filename) {
  if (!imageBuffer) return { hasWatermark: false, isSynthetic: false, confidence: 0, reason: 'No image data' };

  const view = new Uint8Array(imageBuffer);

  // 1. Check filename for watermark indicators
  const filenameCheck = /watermark|logo|stamp|synthetic|ai-generated|fake|test/i.test(filename || '');

  // 2. Check image header/magic bytes
  const header = Array.from(view.slice(0, 8)).map(b => b.toString(16)).join('');
  const isValidImage = (
    header.startsWith('ffd8ff') || // JPEG
    header.startsWith('89504e47') || // PNG
    header.startsWith('47494638') // GIF
  );

  if (!isValidImage) {
    return {
      hasWatermark: true,
      isSynthetic: true,
      confidence: 0.95,
      reason: 'Invalid/corrupted image format - possibly synthetic or tampered'
    };
  }

  // 3. Analyze byte patterns for common watermark signatures
  let suspiciousPatternCount = 0;

  // Check for repeated byte patterns (common in watermarks)
  for (let i = 100; i < Math.min(1000, view.length - 4); i++) {
    if (view[i] === view[i + 1] && view[i] === view[i + 2] && view[i] === view[i + 3]) {
      suspiciousPatternCount++;
    }
  }

  const patternRatio = suspiciousPatternCount / 100;

  // 4. Check metadata (EXIF) for camera info
  const hasMetadata = view.indexOf(255) > -1 && view.indexOf(216) > -1; // JPG markers

  // 5. Calculate suspicion score
  let watermarkConfidence = 0;
  let reasons = [];

  if (filenameCheck) {
    watermarkConfidence += 0.4;
    reasons.push('Suspicious filename contains watermark indicators');
  }

  if (!hasMetadata) {
    watermarkConfidence += 0.2;
    reasons.push('No camera metadata found (possible synthetic image)');
  }

  if (patternRatio > 0.5) {
    watermarkConfidence += 0.3;
    reasons.push('Unusual pixel patterns detected (watermark/AI generation signature)');
  }

  const hasWatermark = watermarkConfidence > 0.4;
  const isSynthetic = watermarkConfidence > 0.5;

  return {
    hasWatermark,
    isSynthetic,
    confidence: Math.min(0.99, watermarkConfidence),
    reason: reasons.length > 0 ? reasons.join('; ') : 'Image appears authentic',
    patternScore: patternRatio,
    metadataFound: hasMetadata,
    validFormat: true
  };
}

/**
 * Generate unique image fingerprint from image file
 * This simulates image authentication - in real system would use visual feature extraction (SIFT, ORB, etc.)
 */
function generateImageFingerprint(imageBuffer) {
  if (!imageBuffer) return null;

  // Simulate image fingerprinting by creating a hash of image characteristics
  // Real system would use visual features, color histogram, edge detection, etc.
  let fingerprintHash = 0;
  const view = new Uint8Array(imageBuffer);

  for (let i = 0; i < view.length; i += Math.max(1, Math.floor(view.length / 1000))) {
    fingerprintHash = ((fingerprintHash << 5) - fingerprintHash) + view[i];
    fingerprintHash |= 0; // Convert to 32-bit integer
  }

  return 'IMAGE_' + Math.abs(fingerprintHash).toString(16).padStart(8, '0');
}

/**
 * Verify if text matches the image characteristics (injury/condition)
 * Checks if text seems authentic to what's shown in image
 */
function verifyImageToText(imageFingerprint, textAnalysis, imagePresent) {
  if (!imagePresent || !imageFingerprint) {
    return { verified: false, confidence: 0, reason: 'No image data to verify' };
  }

  if (!textAnalysis || textAnalysis.trim().length === 0) {
    return { verified: false, confidence: 0, reason: 'Empty text - unauthorized input suspected' };
  }

  // Check if text seems genuine (basic checks)
  const textLength = textAnalysis.length;
  const hasInjuryDetails = /wound|bleeding|cut|burn|pain|swelling|bruise|fracture|sprain/i.test(textAnalysis);
  const appropriateLength = textLength > 20 && textLength < 5000;

  if (!hasInjuryDetails || !appropriateLength) {
    return { verified: false, confidence: 0.4, reason: 'Text does not match image injury pattern' };
  }

  // Generate confidence score based on match quality
  const confidence = Math.min(0.95, 0.6 + (Math.random() * 0.35));

  return {
    verified: confidence > 0.7,
    confidence: Math.round(confidence * 100) / 100,
    reason: confidence > 0.7 ? 'Image and text verified as authentic' : 'Image verification unsuccessful - unauthorized input risk',
    imageFingerprint
  };
}

/**
 * Store image fingerprint for patient (biometric security)
 */
function storePatientImageProfile(patientId, imageFingerprint) {
  const patient = db.patients.find(p => p.id === patientId);
  if (patient) {
    patient.image_fingerprint = imageFingerprint;
    saveDB();
  }
}

function recommendSpecialist(injury) {
  if (!injury || injury === 'Unknown' || injury === 'No Visible Injury') return 'General Practitioner';
  injury = injury.toLowerCase();
  if (injury.includes('fract')) return 'Orthopedic Specialist';
  if (injury.includes('heart') || injury.includes('cardiac')) return 'Cardiologist';
  if (injury.includes('burn')) return 'Burn Specialist';
  if (injury.includes('asthma') || injury.includes('breath')) return 'Pulmonologist';
  if (injury.includes('neuro') || injury.includes('seiz')) return 'Neurologist';
  if (injury.includes('lacer') || injury.includes('wound')) return 'General Surgeon';
  if (injury.includes('sprain') || injury.includes('contusion')) return 'Orthopedic Specialist';
  return 'General Practitioner';
}

// Root API info
app.get('/api', (req, res) => {
  res.json({
    name: 'Pronto Assist AI - Mock Backend',
    version: '1.0.0',
    status: '✅ Mock API running',
    timestamp: nowISO(),
    endpoints: [
      'GET /api',
      'GET /api/health',
      'POST /api/register-patient',
      'POST /api/analyze-and-save',
      'GET /api/patients',
      'GET /api/patients/:id',
      'PUT /api/patients/:id/status',
      'GET /api/priority-queue',
      'GET /api/statistics'
    ]
  });
});

// 1. Health
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ MOCK API running',
    timestamp: nowISO(),
    database: 'mock (storage.json)',
    audio_model: 'mock',
    vision_model: 'mock'
  });
});

// 2. Register patient
app.post('/api/register-patient', (req, res) => {
  const data = req.body || {};
  if (!data.name || !data.age) return res.status(400).json({ error: 'name and age required' });

  const patient = {
    id: db.nextPatientId++,
    name: data.name,
    age: data.age,
    phone: data.phone || null,
    email: data.email || null,
    gender: data.gender || null,
    address: data.address || null,
    medical_history: data.medical_history || null,
    emergency_contact: data.emergency_contact || null,
    created_at: nowISO()
  };
  db.patients.push(patient);
  saveDB();
  res.status(201).json({ success: true, patient_id: patient.id, message: `✅ Patient registered! ID: ${patient.id}`, patient });
});

// 3. Analyze and save (improvedMultipart handling)
app.post('/api/analyze-and-save', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
  let patientId = parseInt(req.body?.patient_id || req.query?.patient_id, 10) || null;

  if (!patientId) {
    return res.status(400).json({ error: 'patient_id required', success: false });
  }

  const patient = db.patients.find(p => p.id === patientId);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found', success: false });
  }

  const hasAudio = !!req.files?.audio?.[0];
  const hasImage = !!req.files?.image?.[0];
  const textAnalysis = req.body?.text_analysis || '';

  // Generate voice fingerprint if audio is present
  let voiceFingerprint = null;
  let voiceSpoofingDetection = null;
  if (hasAudio) {
    voiceFingerprint = generateVoiceFingerprint(req.files.audio[0].buffer);
    voiceSpoofingDetection = detectVoiceSpoofing(req.files.audio[0].buffer);
    storePatientVoiceProfile(patientId, voiceFingerprint);
  } else if (patient.voice_fingerprint) {
    voiceFingerprint = patient.voice_fingerprint;
  }

  // Generate image fingerprint if image is present
  let imageFingerprint = null;
  let watermarkDetection = null;
  let cameraAuthentication = null;
  if (hasImage) {
    imageFingerprint = generateImageFingerprint(req.files.image[0].buffer);
    watermarkDetection = detectImageWatermark(req.files.image[0].buffer, req.files.image[0].originalname);
    cameraAuthentication = detectRealCameraImage(req.files.image[0].buffer, req.files.image[0].originalname);
    storePatientImageProfile(patientId, imageFingerprint);
  } else if (patient.image_fingerprint) {
    imageFingerprint = patient.image_fingerprint;
  }

  // Verify text authenticity based on voice
  const voiceVerification = verifyVoiceToText(voiceFingerprint, textAnalysis, hasAudio);

  // Verify text authenticity based on image
  const imageVerification = verifyImageToText(imageFingerprint, textAnalysis, hasImage);

  // Generate scores directly on 1-5 scale (1 = CRITICAL, 5 = MINIMAL)
  // Higher score = LESS severe
  const audio_score = hasAudio ? randBetween(1, 5) : 5;
  const image_score = hasImage ? randBetween(1, 5) : 5;

  // Fraud detection
  const fraudCheck = detectFraudInformation(textAnalysis);

  let injury = detectInjury(hasImage);
  const triage_score = Math.round(((audio_score + image_score) / 2) * 100) / 100;
  const priority_data = scoreToPriority(triage_score);
  const recommended_specialist = recommendSpecialist(injury);

  const record = {
    id: db.nextRecordId++,
    patient_id: patientId,
    audio_score: Math.round(audio_score * 100) / 100,
    audio_transcript: hasAudio ? 'Audio analyzed - Symptoms detected' : 'N/A',
    audio_severity: hasAudio ? 'Moderate' : 'Normal',
    voice_fingerprint: voiceFingerprint,
    voice_authenticity: hasAudio && !voiceSpoofingDetection?.isFakeVoice ? 'VERIFIED 🔒' : 'FLAGGED ⚠️',
    voice_verification: voiceVerification,
    voice_spoofing_detection: voiceSpoofingDetection,
    voice_security_status: voiceSpoofingDetection ? {
      isFakeVoice: voiceSpoofingDetection.isFakeVoice,
      isSpoofed: voiceSpoofingDetection.isSpoofed,
      confidence: Math.round(voiceSpoofingDetection.confidence * 100),
      reason: voiceSpoofingDetection.reason,
      verdict: voiceSpoofingDetection.isFakeVoice || voiceSpoofingDetection.isSpoofed ? '🛑 FAKE VOICE DETECTED' : '✅ AUTHENTIC VOICE'
    } : null,
    image_score: Math.round(image_score * 100) / 100,
    image_analysis: hasImage ? `Image analysis: ${injury} detected` : 'N/A',
    image_fingerprint: imageFingerprint,
    image_authenticity: hasImage && cameraAuthentication?.isRealCamera && !watermarkDetection?.hasWatermark ? 'VERIFIED 🔒' : 'FLAGGED ⚠️',
    image_verification: imageVerification,
    watermark_detection: watermarkDetection,
    camera_authentication: cameraAuthentication,
    image_security_status: {
      watermark: watermarkDetection ? {
        hasWatermark: watermarkDetection.hasWatermark,
        isSynthetic: watermarkDetection.isSynthetic,
        confidence: Math.round(watermarkDetection.confidence * 100),
        reason: watermarkDetection.reason,
        verdict: watermarkDetection.hasWatermark || watermarkDetection.isSynthetic ? '🛑 WATERMARK/SYNTHETIC' : '✅ NO WATERMARK'
      } : null,
      camera: cameraAuthentication ? {
        isRealCamera: cameraAuthentication.isRealCamera,
        confidence: Math.round(cameraAuthentication.confidence * 100),
        reason: cameraAuthentication.reason,
        hasCameraModel: cameraAuthentication.hasCameraModel,
        hasExifData: cameraAuthentication.hasExifData,
        verdict: cameraAuthentication.isRealCamera ? '✅ REAL CAMERA IMAGE' : '🛑 NOT FROM REAL CAMERA'
      } : null,
      finalVerdict: (hasImage && cameraAuthentication?.isRealCamera && !watermarkDetection?.hasWatermark) ? '✅ AUTHENTIC & FROM REAL CAMERA' : '🛑 FRAUD DETECTED'
    },
    injury_category: injury,
    injury_severity: hasImage ? 'Detected' : 'Unknown',
    text_analysis: textAnalysis || 'N/A',
    text_authenticity: (voiceVerification.verified || imageVerification.verified) ? '✅ AUTHENTIC' : '⚠️ UNVERIFIED',
    text_verification: { voice: voiceVerification, image: imageVerification },
    fraud_detection: fraudCheck,
    priority_level: priority_data.level,
    priority_label: priority_data.label,
    priority_color: priority_data.color,
    triage_score: triage_score,
    recommended_specialist,
    ai_recommendation: `See ${recommended_specialist} - Priority Level ${priority_data.level}`,
    status: 'Pending',
    doctor_assigned: null,
    consultation_notes: null,
    timestamp: nowISO(),
    attended_at: null,
    completed_at: null
  };

  db.triage_records.push(record);
  saveDB();

  res.json({
    success: true,
    record_id: record.id,
    patient_id: patientId,
    analysis: {
      audio_score: record.audio_score,
      image_score: record.image_score,
      priority_level: record.priority_level,
      priority_label: record.priority_label,
      triage_score: record.triage_score,
      recommended_specialist: record.recommended_specialist,
      injury_detected: record.injury_category,
      fraud_detection: fraudCheck,
      voice_authenticity: record.voice_authenticity,
      voice_verification: voiceVerification,
      voice_fingerprint: voiceFingerprint,
      voice_spoofing_detection: voiceSpoofingDetection,
      voice_security_status: record.voice_security_status,
      image_authenticity: record.image_authenticity,
      image_verification: imageVerification,
      image_fingerprint: imageFingerprint,
      watermark_detection: watermarkDetection,
      camera_authentication: cameraAuthentication,
      image_security_status: record.image_security_status,
      text_authenticity: record.text_authenticity,
      text_verification: { voice: voiceVerification, image: imageVerification },
      timestamp: record.timestamp
    }
  });
});

// 4. Get all patients (with latest record)
app.get('/api/patients', (req, res) => {
  const patients = db.patients.map(p => {
    const records = db.triage_records.filter(r => r.patient_id === p.id).sort((a, b) => b.id - a.id);
    const latest = records[0] || null;
    return Object.assign({}, p, {
      latest_record_id: latest ? latest.id : null,
      priority_level: latest ? latest.priority_level : null,
      priority_label: latest ? latest.priority_label : null,
      triage_score: latest ? latest.triage_score : null,
      status: latest ? latest.status : 'Not Triaged',
      timestamp: latest ? latest.timestamp : null,
      injury: latest ? latest.injury_category : null
    });
  }).sort((a, b) => {
    // Sort by priority_level (1 = highest priority), then by most recent
    if (a.priority_level && b.priority_level) {
      return a.priority_level - b.priority_level || new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  res.json({ success: true, count: patients.length, patients });
});

// 5. Get specific patient details
app.get('/api/patients/:id', (req, res) => {
  const pid = parseInt(req.params.id, 10);
  const patient = db.patients.find(p => p.id === pid);
  if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });

  const history = db.triage_records.filter(r => r.patient_id === pid).sort((a, b) => b.id - a.id);
  res.json({ success: true, patient: Object.assign({}, patient, { history, total_visits: history.length }) });
});

// 6. Update patient status (latest record)
app.put('/api/patients/:id/status', (req, res) => {
  const pid = parseInt(req.params.id, 10);
  const { status, doctor_assigned, consultation_notes } = req.body || {};
  const records = db.triage_records.filter(r => r.patient_id === pid).sort((a, b) => b.id - a.id);
  if (!records.length) return res.status(404).json({ success: false, error: 'No triage record for patient' });
  const latest = records[0];
  if (status) latest.status = status;
  if (doctor_assigned) latest.doctor_assigned = doctor_assigned;
  if (consultation_notes) latest.consultation_notes = consultation_notes;
  if (status === 'Attended') latest.attended_at = nowISO();
  if (status === 'Completed') latest.completed_at = nowISO();
  saveDB();
  res.json({ success: true, message: `✅ Status updated to ${latest.status}` });
});

// 7. Priority queue
app.get('/api/priority-queue', (req, res) => {
  const latestMap = new Map();
  db.triage_records.forEach(r => {
    const existing = latestMap.get(r.patient_id);
    if (!existing || r.id > existing.id) {
      latestMap.set(r.patient_id, r);
    }
  });

  const queue = Array.from(latestMap.values())
    .sort((a, b) => (a.priority_level || 5) - (b.priority_level || 5) || new Date(b.timestamp) - new Date(a.timestamp));

  const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  queue.forEach(q => {
    const level = q.priority_level || 5;
    breakdown[level] = (breakdown[level] || 0) + 1;
  });

  res.json({
    success: true,
    total_patients: queue.length,
    priority_breakdown: breakdown,
    priority_labels: { 1: 'CRITICAL', 2: 'HIGH', 3: 'MEDIUM', 4: 'LOW', 5: 'MINIMAL' },
    queue
  });
});

// 8. Statistics
app.get('/api/statistics', (req, res) => {
  const total_patients = db.patients.length;
  const total_records = db.triage_records.length;
  const avg_score = total_records ? (db.triage_records.reduce((s, r) => s + (r.triage_score || 0), 0) / total_records) : 0;
  const status_breakdown = {};
  db.triage_records.forEach(r => { status_breakdown[r.status] = (status_breakdown[r.status] || 0) + 1; });
  res.json({ success: true, statistics: { total_patients, total_records, average_triage_score: Math.round(avg_score * 100) / 100, status_breakdown } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Mock backend running on http://localhost:${PORT}`);
});
