const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'storage.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

let db = { patients: [], triage_records: [], nextPatientId: 1, nextRecordId: 1 };
try {
  if (fs.existsSync(DATA_FILE)) {
    db = JSON.parse(fs.readFileSync(DATA_FILE));
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

function calculatePriority(avg) {
  if (avg >= 8) return 'URGENT 🔴';
  if (avg >= 6) return 'HIGH 🟠';
  if (avg >= 4) return 'MEDIUM 🟡';
  return 'LOW 🟢';
}

function recommendSpecialist(injury) {
  if (!injury) return 'General Practitioner';
  injury = injury.toLowerCase();
  if (injury.includes('fract') || injury.includes('bone')) return 'Orthopedic Specialist';
  if (injury.includes('heart') || injury.includes('cardiac')) return 'Cardiologist';
  if (injury.includes('burn')) return 'Burn Specialist';
  if (injury.includes('asthma') || injury.includes('breath')) return 'Pulmonologist';
  if (injury.includes('neuro') || injury.includes('seiz')) return 'Neurologist';
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

// 3. Analyze and save (multipart or JSON)
app.post('/api/analyze-and-save', (req, res) => {
  const contentType = (req.headers['content-type'] || '').toLowerCase();

  // We'll try to extract patient_id either from JSON body, query or raw multipart body
  let patientId = parseInt(req.body && req.body.patient_id, 10) || parseInt(req.query.patient_id, 10) || null;

  if (contentType.includes('multipart/form-data')) {
    // collect raw body to parse simple fields (no external dependency)
    const chunks = [];
    req.on('data', c => chunks.push(Buffer.from(c)));
    req.on('end', () => {
      const buf = Buffer.concat(chunks);
      const text = buf.toString('latin1'); // safe for boundary parsing

      const pidMatch = text.match(/name="patient_id"\s*\r?\n\r?\n([^\r\n]+)/i);
      if (pidMatch) patientId = parseInt(pidMatch[1].trim(), 10) || patientId;

      const hasAudio = /name="audio"/i.test(text);
      const hasImage = /name="image"/i.test(text);

      processMockAnalysis(patientId, hasAudio, hasImage, res);
    });
  } else {
    // JSON or urlencoded (handled by express.json)
    patientId = patientId || null;
    const hasAudio = false;
    const hasImage = false;
    processMockAnalysis(patientId, hasAudio, hasImage, res);
  }
});

function processMockAnalysis(patientId, hasAudio, hasImage, res) {
  if (!patientId) return res.status(400).json({ error: 'patient_id required', success: false });
  const patient = db.patients.find(p => p.id === patientId);
  if (!patient) return res.status(404).json({ error: 'Patient not found', success: false });

  const audio_score = hasAudio ? randBetween(5.0, 9.5) : 5.0;
  const image_score = hasImage ? randBetween(5.0, 9.5) : 5.0;

  let injury = 'Unknown';
  if (hasImage) injury = ['Fracture','Wound','Sprain','Bruise'][Math.floor(Math.random()*4)];

  const triage_score = Math.round(((audio_score + image_score) / 2) * 100) / 100;
  const priority_level = calculatePriority(triage_score);
  const recommended_specialist = recommendSpecialist(injury);

  const record = {
    id: db.nextRecordId++,
    patient_id: patientId,
    audio_score,
    audio_transcript: hasAudio ? 'Mock transcript generated' : 'N/A',
    audio_severity: hasAudio ? 'Moderate' : 'Normal',
    voice_authenticity: 'MOCK_VERIFIED',
    image_score,
    image_analysis: hasImage ? `Mock image analysis: ${injury}` : 'N/A',
    injury_category: injury,
    injury_severity: hasImage ? 'Moderate' : 'Unknown',
    priority_level,
    triage_score,
    recommended_specialist,
    ai_recommendation: `See ${recommended_specialist}`,
    status: 'Pending',
    doctor_assigned: null,
    consultation_notes: null,
    timestamp: nowISO(),
    attended_at: null,
    completed_at: null
  };

  db.triage_records.push(record);
  saveDB();

  res.json({ success: true, record_id: record.id, patient_id: patientId, analysis: {
    audio_score: record.audio_score,
    image_score: record.image_score,
    priority_level: record.priority_level,
    triage_score: record.triage_score,
    recommended_specialist: record.recommended_specialist,
    injury_detected: record.injury_category,
    timestamp: record.timestamp
  }});
}

// 4. Get all patients (with latest record)
app.get('/api/patients', (req, res) => {
  const patients = db.patients.map(p => {
    const records = db.triage_records.filter(r => r.patient_id === p.id).sort((a,b) => b.id - a.id);
    const latest = records[0] || null;
    return Object.assign({}, p, {
      latest_record_id: latest ? latest.id : null,
      priority_level: latest ? latest.priority_level : null,
      triage_score: latest ? latest.triage_score : null,
      status: latest ? latest.status : null,
      timestamp: latest ? latest.timestamp : null
    });
  });
  res.json({ success: true, count: patients.length, patients });
});

// 5. Get specific patient details
app.get('/api/patients/:id', (req, res) => {
  const pid = parseInt(req.params.id, 10);
  const patient = db.patients.find(p => p.id === pid);
  if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });

  const history = db.triage_records.filter(r => r.patient_id === pid).sort((a,b)=> b.id - a.id);
  res.json({ success: true, patient: Object.assign({}, patient, { history, total_visits: history.length }) });
});

// 6. Update patient status (latest record)
app.put('/api/patients/:id/status', (req, res) => {
  const pid = parseInt(req.params.id, 10);
  const { status, doctor_assigned, consultation_notes } = req.body || {};
  const records = db.triage_records.filter(r => r.patient_id === pid).sort((a,b)=> b.id - a.id);
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
  db.triage_records.forEach(r => latestMap.set(r.patient_id, (latestMap.get(r.patient_id) || r).id < r.id ? r : latestMap.get(r.patient_id)));
  const queue = Array.from(latestMap.values()).map(r => r);

  const order = { 'URGENT 🔴': 1, 'HIGH 🟠': 2, 'MEDIUM 🟡': 3, 'LOW 🟢': 4 };
  queue.sort((a,b) => (order[a.priority_level] || 5) - (order[b.priority_level] || 5) || new Date(a.timestamp) - new Date(b.timestamp));

  const breakdown = { 'URGENT 🔴': 0, 'HIGH 🟠': 0, 'MEDIUM 🟡': 0, 'LOW 🟢': 0 };
  queue.forEach(q => { breakdown[q.priority_level] = (breakdown[q.priority_level] || 0) + 1; });

  res.json({ success: true, total_patients: queue.length, priority_breakdown: breakdown, queue });
});

// 8. Statistics
app.get('/api/statistics', (req, res) => {
  const total_patients = db.patients.length;
  const total_records = db.triage_records.length;
  const avg_score = total_records ? (db.triage_records.reduce((s,r)=> s + (r.triage_score||0),0) / total_records) : 0;
  const status_breakdown = {};
  db.triage_records.forEach(r => { status_breakdown[r.status] = (status_breakdown[r.status]||0) + 1; });
  res.json({ success: true, statistics: { total_patients, total_records, average_triage_score: Math.round(avg_score*100)/100, status_breakdown } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Mock backend running on http://localhost:${PORT}`);
});
