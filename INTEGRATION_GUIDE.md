# 🚑 PRONTO-ASSIST AI: Complete Integration Guide

## 📋 Integration Status: ✅ COMPLETE

### Files Created/Updated:
- ✅ Backend: `app.py` (Complete API with DB)
- ✅ Frontend: `src/services/api.ts` (API service layer)
- ✅ Frontend: `src/hooks/useTriageAnalysis.ts` (Custom hook)
- ✅ Frontend: `src/components/PatientIntakeForm.tsx` (UI Component)
- ✅ Frontend: `.env.local` (Environment variables)

---

## 🚀 STEP-BY-STEP RUNNING GUIDE

### Terminal 1: Backend Start Karo

```bash
cd backend/AI-Triage-Pro/project\ 2

# Install required packages (one-time)
pip install flask flask-cors sqlite3

# Run server
python app.py
```

**Expected Output:**
```
✅ DATABASE INITIALIZED
🤖 Loading AI Models...
✅ Audio Model Loaded
✅ Vision Model Loaded
============================================================
 🚑 PRONTO-ASSIST AI: BACKEND SERVER
============================================================
📍 Database: medical_triage.db
🔌 Running on: http://localhost:5000
============================================================
```

### Terminal 2: Frontend Start Karo

```bash
cd pronto-assist-ai

# Install dependencies (if not done)
npm install

# Start dev server
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Website Open Karo:** http://localhost:5173/

---

## 🔄 COMPLETE DATA FLOW - PURA PROCESS ILLUSTRATED

```
┌────────────────────────────────────────────────────────────────────────┐
│                      USER WORKFLOW (3 STEPS)                            │
└────────────────────────────────────────────────────────────────────────┘

STEP 1️⃣: PATIENT REGISTRATION
   ├─ User website ka intake form mein entries fill karta hai:
   │  ├─ Name: Rahul Kumar
   │  ├─ Age: 28
   │  ├─ Phone: 9876543210
   │  ├─ Email: rahul@example.com
   │  ├─ Gender, Address, Medical History
   │  └─ Emergency Contact
   │
   └─→ "Register Patient" button click
       │
       ▼
   Frontend (PatientIntakeForm.tsx):
   ├─ Input validation karo (name + age required)
   ├─ handleRegisterPatient() call karo
   │
   ▼
   API Service (api.ts):
   ├─ registerPatient(patientData) function call
   ├─ POST request bhejo Backend ko
   │  └─ URL: POST http://localhost:5000/api/register-patient
   │  └─ Body: { name, age, phone, email, gender, address, ... }
   │
   ▼
   Backend (app.py):
   ├─ /register-patient endpoint mein request receive
   ├─ Data validation karo
   ├─ Database INSERT query:
   │  └─ INSERT INTO patients (name, age, phone, ...) VALUES (...)
   ├─ New patient ka unique ID generate hoga
   ├─ JSON response bhejo Frontend ko
   │  └─ { success: true, patient_id: 1, ... }
   │
   ▼
   Frontend:
   ├─ Response receive karo
   ├─ Patient ID display karo
   ├─ Success message dikhao ✅
   └─ File upload form unlock karo (STEP 2)


STEP 2️⃣: FILE UPLOAD & ANALYSIS
   ├─ User audio file select karta hai (patient ke symptoms)
   ├─ User image file select karta hai (injury photo)
   │
   └─→ "Analyze & Save" button click
       │
       ▼
   Frontend (PatientIntakeForm.tsx):
   ├─ File validation karo (size, format)
   ├─ handleAnalyze() function call
   ├─ analyzeAndSave(patientId, audioFile, imageFile) call
   │
   ▼
   API Service (api.ts):
   ├─ formData banao:
   │  ├─ patient_id
   │  ├─ audio file
   │  └─ image file
   ├─ POST request bhejo
   │  └─ URL: POST http://localhost:5000/api/analyze-and-save
   │  └─ Body: FormData (multipart/form-data)
   │
   ▼
   Backend (app.py):
   ├─ /analyze-and-save endpoint mein receive
   ├─ Files validate karo
   │
   ├─→ AUDIO ANALYSIS (Whisper AI):
   │   ├─ Audio file save (temp folder mein)
   │   ├─ analyze_audio_severity(audio_path, audio_model) call
   │   ├─ Results:
   │   │  ├─ audio_score (0-10)
   │   │  ├─ transcript (kya bola patient ne)
   │   │  ├─ severity level
   │   │  └─ voice authenticity check
   │   └─ Temp file delete karo
   │
   ├─→ IMAGE ANALYSIS (Vision Model):
   │   ├─ Image file save (temp folder mein)
   │   ├─ analyze_injury_severity(image_path, vision_model) call
   │   ├─ Results:
   │   │  ├─ image_score (0-10)
   │   │  ├─ injury_category (fracture, wound, burn, etc.)
   │   │  └─ severity assessment
   │   └─ Temp file delete karo
   │
   ├─→ COMBINED TRIAGE:
   │   ├─ Calculate avg score: (audio_score + image_score) / 2
   │   ├─ Priority level determine:
   │   │  ├─ >= 8: URGENT 🔴
   │   │  ├─ >= 6: HIGH 🟠
   │   │  ├─ >= 4: MEDIUM 🟡
   │   │  └─ < 4: LOW 🟢
   │   ├─ Specialist recommend karo
   │   │  └─ Injury category ke hisaab se
   │   │     (Fracture → Orthopedic, Burn → Burn Specialist, etc.)
   │   │
   │
   ├─ DATABASE INSERT:
   │  └─ INSERT INTO triage_records:
   │     ├─ patient_id
   │     ├─ audio_score, audio_transcript
   │     ├─ image_score, injury_category
   │     ├─ priority_level
   │     ├─ triage_score
   │     ├─ recommended_specialist
   │     └─ timestamp
   │
   ├─ JSON Response bhejo Frontend ko:
   │  └─ {
   │     success: true,
   │     record_id: 1,
   │     analysis: {
   │       audio_score: 7.5,
   │       image_score: 8.2,
   │       priority_level: "HIGH 🟠",
   │       triage_score: 7.85,
   │       recommended_specialist: "Orthopedic Specialist",
   │       injury_detected: "Fracture",
   │       timestamp: "2026-04-10..."
   │     }
   │    }
   │
   ▼
   Frontend:
   ├─ Response receive karo
   ├─ TriageResultCard render karo
   ├─ Results beautifully display karo:
   │  ├─ Priority badge (color-coded)
   │  ├─ Audio Score
   │  ├─ Image Score
   │  ├─ Final Triage Score
   │  ├─ Injury Category
   │  ├─ Recommended Specialist
   │  └─ Record ID + Timestamp
   └─ Success animation dikhao ✅


STEP 3️⃣: ADMIN DASHBOARD (Queue View)
   ├─ Admin ke liye special queue page
   ├─ Frontend: GET /api/priority-queue
   │
   ▼
   Backend:
   ├─ /priority-queue endpoint
   ├─ Database se query:
   │  └─ SELECT * FROM patients JOIN triage_records
   │     ├─ Sort by priority (URGENT → HIGH → MEDIUM → LOW)
   │     ├─ Sort by time (oldest first within same priority)
   │     └─ Latest record only per patient
   │
   ▼
   Queue Display:
   ├─ URGENT 🔴 (3 patients)
   ├─ HIGH 🟠 (5 patients)
   ├─ MEDIUM 🟡 (8 patients)
   └─ LOW 🟢 (2 patients)

   Patient Queue Table:
   ├─ Row 1: Rahul Kumar | 28 | HIGH | 7.85 | Pending | Orthopedic
   ├─ Row 2: Priya Singh | 35 | URGENT | 8.5 | Pending | Cardiologist
   ├─ Row 3: ...
   └─ Click karega → Patient full details + history
```

---

## 🗄️ DATABASE SCHEMA - Kya Store Hota Hai?

### Table 1: PATIENTS
```sql
CREATE TABLE patients (
    id INTEGER PRIMARY KEY,                    -- Unique patient ID (1, 2, 3...)
    name TEXT,                                 -- Rahul Kumar
    age INTEGER,                               -- 28
    phone TEXT,                                -- 9876543210
    email TEXT,                                -- rahul@example.com
    gender TEXT,                               -- Male / Female / Other
    address TEXT,                              -- Patient ka address
    medical_history TEXT,                      -- Previous conditions
    emergency_contact TEXT,                    -- Emergency contact details
    created_at TIMESTAMP                       -- Registration time (auto)
);

EXAMPLE DATA:
┌─────┬──────────────┬─────┬────────────────┬───────────────────────┬────────┐
│ id  │ name         │ age │ phone          │ email                 │ gender │
├─────┼──────────────┼─────┼────────────────┼───────────────────────┼────────┤
│ 1   │ Rahul Kumar  │ 28  │ 9876543210     │ rahul@example.com     │ Male   │
│ 2   │ Priya Singh  │ 35  │ 9123456789     │ priya@example.com     │ Female │
│ 3   │ Arjun Verma  │ 42  │ 9555555555     │ arjun@example.com     │ Male   │
└─────┴──────────────┴─────┴────────────────┴───────────────────────┴────────┘
```

### Table 2: TRIAGE_RECORDS
```sql
CREATE TABLE triage_records (
    id INTEGER PRIMARY KEY,                    -- Record ID
    patient_id INTEGER,                        -- Foreign key to patients
    
    -- AUDIO ANALYSIS
    audio_score REAL,                          -- 0-10 score
    audio_transcript TEXT,                     -- "Patient ke words"
    audio_severity TEXT,                       -- Normal / Severe
    voice_authenticity TEXT,                   -- VOICE_AUTHENTIC / WARNING
    
    -- IMAGE ANALYSIS
    image_score REAL,                          -- 0-10 score
    image_analysis TEXT,                       -- Full analysis details
    injury_category TEXT,                      -- fracture/wound/burn/etc
    injury_severity TEXT,                      -- Mild / Moderate / Severe
    
    -- COMBINED TRIAGE
    priority_level TEXT,                       -- "URGENT 🔴" / "HIGH 🟠" ...
    triage_score REAL,                         -- Final combined score
    recommended_specialist TEXT,               -- Orthopedic / Cardiologist...
    ai_recommendation TEXT,                    -- Detailed recommendation
    
    -- STATUS TRACKING
    status TEXT,                               -- Pending / Attended / Completed
    doctor_assigned TEXT,                      -- Dr. Name
    consultation_notes TEXT,                   -- Doctor ke notes
    
    -- TIMESTAMPS
    timestamp TIMESTAMP,                       -- Record creation time
    attended_at TIMESTAMP,                     -- When doctor attended
    completed_at TIMESTAMP                     -- When consultation ended
);

EXAMPLE DATA:
┌───┬───────────┬─────────┬──────────┬───────────────┬──────────────────┐
│id │patient_id │ audio_  │ priority │ triage_score  │ recommended_     │
│   │           │ score   │ level    │               │ specialist       │
├───┼───────────┼─────────┼──────────┼───────────────┼──────────────────┤
│1  │ 1         │ 7.5     │ HIGH 🟠   │ 7.85          │ Orthopedic       │
│2  │ 2         │ 8.8     │ URGENT🔴 │ 8.5           │ Cardiologist     │
│3  │ 3         │ 5.2     │ MEDIUM 🟡 │ 5.65          │ General Practice │
└───┴───────────┴─────────┴──────────┴───────────────┴──────────────────┘
```

---

## 🎯 API ENDPOINTS - Kya Use Ho Sakta Hai?

### 1. Health Check
```
GET /api/health
Response: { status: "✅ API is running", database: "✅ Connected", ... }
```

### 2. Register Patient
```
POST /api/register-patient
Body: { name, age, phone, email, gender, address, medical_history, emergency_contact }
Response: { success: true, patient_id: 1, message: "Patient registered" }
```

### 3. Analyze Audio & Image
```
POST /api/analyze-and-save
Body: FormData { patient_id, audio: File, image: File }
Response: { 
  success: true,
  analysis: {
    audio_score: 7.5,
    image_score: 8.2,
    priority_level: "HIGH 🟠",
    triage_score: 7.85,
    recommended_specialist: "Orthopedic Specialist"
  }
}
```

### 4. Get All Patients
```
GET /api/patients
Response: { 
  success: true,
  count: 3,
  patients: [ { id, name, age, priority_level, status, ... }, ... ]
}
```

### 5. Get Patient Details + History
```
GET /api/patients/1
Response: {
  success: true,
  patient: {
    id: 1,
    name: "Rahul Kumar",
    history: [
      { record_id: 1, priority_level: "HIGH", timestamp: "...", ... },
      { record_id: 2, priority_level: "LOW", timestamp: "...", ... }
    ]
  }
}
```

### 6. Priority Queue
```
GET /api/priority-queue
Response: {
  total_patients: 18,
  priority_breakdown: {
    "URGENT 🔴": 2,
    "HIGH 🟠": 5,
    "MEDIUM 🟡": 7,
    "LOW 🟢": 4
  },
  queue: [ { id, name, priority_level, status, ... }, ... ]
}
```

### 7. Update Patient Status
```
PUT /api/patients/1/status
Body: { status: "Attended", doctor_assigned: "Dr. Sharma", consultation_notes: "..." }
Response: { success: true, message: "✅ Status updated to Attended" }
```

### 8. Statistics
```
GET /api/statistics
Response: {
  total_patients: 150,
  total_records: 245,
  average_triage_score: 6.54,
  status_breakdown: { Pending: 15, Attended: 200, Completed: 30 }
}
```

---

## 🔗 Frontend Folder Structure - Files Explain Karo

```
pronto-assist-ai/
├── src/
│   ├── services/
│   │   └── api.ts                    ← 🌐 BACKEND Communication
│   │                                   ├─ registerPatient()
│   │                                   ├─ analyzeAndSave()
│   │                                   ├─ getAllPatients()
│   │                                   ├─ getPriorityQueue()
│   │                                   └─ 18 more API functions
│   │
│   ├── hooks/
│   │   └── useTriageAnalysis.ts       ← 🎣 CUSTOM HOOK
│   │                                   ├─ State management
│   │                                   ├─ File validation
│   │                                   ├─ handleRegisterPatient()
│   │                                   ├─ handleAudioSelect()
│   │                                   ├─ handleImageSelect()
│   │                                   └─ handleAnalyze()
│   │
│   ├── components/
│   │   └── PatientIntakeForm.tsx      ← 🎨 UI COMPONENT
│   │                                   ├─ Patient Registration Form
│   │                                   ├─ File Upload
│   │                                   └─ Results Display
│   │
│   └── pages/
│       ├── Dashboard.tsx              ← Admin Queue View
│       └── Patients.tsx               ← Patient List
│
└── .env.local                         ← 🔑 CONFIGURATION
    VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔄 STATE MANAGEMENT - Kaise Kaam Karta Hai?

```typescript
// useTriageAnalysis.ts mein state:
const [state, setState] = useState({
  patientId: null,              // Registered patient ka ID
  audioFile: null,              // Selected audio file
  imageFile: null,              // Selected image file
  loading: false,               // Analyzing? True/False
  error: null,                  // Koi error? Message
  result: null,                 // Analysis result
  registrationComplete: false   // Patient register ho gaya?
});

// Workflow:
registrationComplete: false → User form fill → registrationComplete: true
                              ↓
                    File upload form unlock
                              ↓
                    Audio + Image select
                    loading: true (analyzing...)
                              ↓
                    AI analysis complete
                    loading: false
                    result: { success, analysis: {...} }
                              ↓
                    Results display
```

---

## 🧪 TESTING - Manually Test Karo

### Option 1: Postman/Thunder Client use Karo

```bash
# Request 1: Register Patient
POST http://localhost:5000/api/register-patient
Header: Content-Type: application/json
Body:
{
  "name": "Rahul Kumar",
  "age": 28,
  "phone": "9876543210",
  "email": "rahul@example.com",
  "gender": "Male"
}

# Response:
{
  "success": true,
  "patient_id": 1,
  "message": "✅ Patient registered! ID: 1"
}

# Request 2: Get All Patients
GET http://localhost:5000/api/patients

# Request 3: Get Priority Queue
GET http://localhost:5000/api/priority-queue
```

### Option 2: Website se Test Karo

1. **http://localhost:5173** open karo
2. **Form fill karo:**
   - Name: Any name
   - Age: Any age
   - Phone: Any number
   - Click "Register Patient"
3. **Files upload karo:**
   - Select audio file (MP3/WAV)
   - Select image file (JPG/PNG)
   - Click "Analyze & Save"
4. **Results dekho** (Aayenge 30-60 seconds mein)

---

## ⚠️ COMMON ISSUES & FIXES

| Issue | Solution |
|-------|----------|
| Backend connection failed | Backend port 5000 open hai? `python app.py` run karo |
| "Patient not found" | Patient register karke ID copy karo |
| Files not uploading | File size < 50MB check karo, format valid hai? |
| Analysis taking long | AI models load ho rahe hain, 1-2 minutes wait karo |
| Database error | `medical_triage.db` delete karo, app restart karo |

---

## 🎬 NEXT STEPS - Aage Kya Hona Chahiye?

```
PHASE 1: CORE (✅ COMPLETE)
├─ Patient registration ✅
├─ Audio analysis ✅
├─ Image analysis ✅
├─ Triage calculation ✅
└─ Database storage ✅

PHASE 2: FEATURES (TODO)
├─ Real-time notifications
├─ Email alerts to doctors
├─ Doctor assignment system
├─ Video consultation
└─ Patient history reports

PHASE 3: DEPLOYMENT (TODO)
├─ Backend → Heroku/Railway
├─ Frontend → Vercel/Netlify
├─ Database → PostgreSQL Cloud
└─ Production optimization
```

---

## 📝 SUMMARY

```
STEP 1: Patient form fill + Register
   ↓
STEP 2: Audio/Image upload + Analyze
   ↓
STEP 3: Results display + Save to DB
   ↓
ADMIN DASHBOARD: Queue view + Status updates
   ↓
SPECIALIST: Get patients ka notifications
```

**Pura system ek saath kaise kaam karta hai:**

1. **Frontend** (React) → User interface + Form
2. **API Service** (TypeScript) → Backend ko HTTP calls
3. **Backend** (Python) → AI analysis + Database
4. **Database** (SQLite) → Patient data store
5. **Display** → Results beautifully show

**Tum kuch bhi bheche Frontend se → Backend AI models chalti hain → Results aate hain → Show hote hain!**

---

**Sab kuch samajh aa gaya? Koi question? 🚀**
