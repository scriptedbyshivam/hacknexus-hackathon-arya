# 🚀 QUICK START GUIDE - Commands & Testing

## ⚡ ONE-MINUTE SETUP (COPY-PASTE COMMANDS)

### **Terminal 1: Backend Start**
```bash
cd C:\Users\Anjali\ Maurya\Desktop\npm3\backend\AI-Triage-Pro\project\ 2
python app.py
```

**Expected: "Running on http://localhost:5000"** ✅

### **Terminal 2: Frontend Start**
```bash
cd C:\Users\Anjali\ Maurya\Desktop\npm3\pronto-assist-ai
npm run dev
```

**Expected: "Local: http://localhost:5173"** ✅

### **Open Website**
```
http://localhost:5173
```

---

## ✅ VERIFICATION CHECKLIST

### **Backend Check:**
```bash
# Terminal mein check karo
curl http://localhost:5000/api/health

# Expected Response:
{
  "status": "✅ API is running",
  "database": "✅ Connected",
  "audio_model": "✅ Loaded",
  "vision_model": "✅ Loaded"
}
```

### **Frontend Check:**
- [ ] Website load hota hai? ✓
- [ ] Form visible hai? ✓
- [ ] Input fields work karte hain? ✓
- [ ] Buttons clickable hain? ✓

### **Network Check:**
```bash
# Kya backend accessible hai?
# Open Command Prompt:
netstat -an | findstr 5000
# Should show: LISTENING 0.0.0.0:5000
```

---

## 🧪 TESTING SCENARIO

### **Test 1: Patient Registration**
```
Input:
  Name: Test User
  Age: 25
  Phone: 9999999999
  Email: test@test.com

Expected Output:
  ✅ Patient registered
  Patient ID: 1
  File upload form unlocks
```

### **Test 2: File Upload & Analysis**
```
Input:
  Audio File: any MP3/WAV (< 50MB)
  Image File: any JPG/PNG (< 50MB)

Expected Output (30-60 seconds)
  ✅ Audio Score: 5-10
  ✅ Image Score: 5-10
  ✅ Priority Level: Assigned
  ✅ Specialist: Recommended
```

### **Test 3: Database Verification**
```bash
# Terminal mein:
sqlite3 medical_triage.db

# SQLite prompt mein:
.tables
# Output: patients  triage_records

SELECT COUNT(*) FROM patients;
# Output: 1

SELECT * FROM patients;
# Output: 1|Test User|25|9999999999|test@test.com|...

.quit
```

---

## 🔍 DEBUGGING TIPS

### **Issue 1: "Connection Refused"**
```
❌ Problem: Backend not running
✅ Solution: 
   1. Check Terminal 1
   2. Restart: python app.py
   3. Verify: curl http://localhost:5000/api/health
```

### **Issue 2: "CORS Error"**
```
❌ Problem: Frontend & Backend not talking
✅ Solution:
   1. Backend mein @app.route('/api/analyze-and-save') check
   2. CORS enabled? "CORS(app, resources=....)" check
   3. Restart backend
```

### **Issue 3: "Files Not Uploading"**
```
❌ Problem: File format/size issue
✅ Solution:
   1. File size check: ls -lh file.mp3
   2. Format check: file has .mp3/.wav/.jpg/.png extension?
   3. Try smaller file ~1MB
```

### **Issue 4: "Slow Analysis"**
```
❌ Problem: AI models loading slow
✅ Solution:
   1. First time = slow (models downloading/loading)
   2. Subsequent times = faster
   3. Patience! 30-60 sec normal hai
```

### **Issue 5: "Database Error"**
```
❌ Problem: Database corrupted
✅ Solution:
   1. Delete: medical_triage.db
   2. Restart: python app.py (DB recreate hoga)
   3. Try again
```

---

## 📊 LOGS CHECK - Errors Dekhne Ke Liye

### **Backend Logs (Terminal 1)**
```
✅ NORMAL:
  ✅ DATABASE INITIALIZED
  ✅ Audio Model Loaded
  ✅ Vision Model Loaded
  Running on http://localhost:5000

⚠️ WARNING:
  Port 5000 already in use? 
  → Close other app using 5000
  → Or change port in app.py

❌ ERROR:
  ModuleNotFoundError: No module named 'flask'
  → Fix: pip install flask flask-cors
```

### **Frontend Logs (DevTools - F12)**
```
✅ NORMAL:
  Network tab shows:
  - POST /api/register-patient → 201
  - POST /api/analyze-and-save → 200
  - Console: No errors

❌ ERROR:
  TypeError: Cannot read property 'xyz'
  → Check api.ts response format
  → Check if backend running on 5000
```

---

## 🎯 QUICK MAN PAGES

### **Files Reference:**

| File | Purpose | Location |
|------|---------|----------|
| app.py | Backend server | backend/AI-Triage-Pro/project 2/ |
| api.ts | API calls | pronto-assist-ai/src/services/ |
| useTriageAnalysis.ts | State logic | pronto-assist-ai/src/hooks/ |
| PatientIntakeForm.tsx | UI Component | pronto-assist-ai/src/components/ |
| medical_triage.db | Database | backend/AI-Triage-Pro/project 2/ |

### **API Reference:**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/health | GET | Check server status |
| /api/register-patient | POST | Register new patient |
| /api/analyze-and-save | POST | Upload files & analyze |
| /api/patients | GET | Get all patients |
| /api/patients/{id} | GET | Get specific patient |
| /api/priority-queue | GET | Get sorted queue |
| /api/statistics | GET | Get stats |

---

## 🎪 DEMO MODE - Quick Testing Without Files

### **Fake Analysis Test**
```python
# app.py mein, /analyze-and-save mein:

# DEMO MODE: Files na ho to default scores dedo
if not audio_file and not image_file:
    audio_score = 7.5
    image_score = 8.2
else:
    # Real analysis karo
    ...

# Ab test karo bina actual files ke!
```

---

## 📈 PERFORMANCE CHECKLIST

```
Performance Test:

Registration: < 1 sec ✓
Analysis: 30-60 sec ✓
Display: < 1 sec ✓
Total: ~1-2 min ✓

Database:
Query: < 100 ms ✓
Insert: < 100 ms ✓

Network:
Request: < 100 ms ✓
Response: < 50 kb ✓
```

---

## 🔐 SECURITY CHECKLIST

```
✓ Input Validation
  - Name: Required, string
  - Age: Required, number > 0
  - File size: Max 50MB
  - File format: Only audio/image

✓ CORS Enabled
  - Frontend: localhost:5173
  - Backend: localhost:5000

✓ Database
  - Parameterized queries (SQL injection prevent)
  - Transactions (Data integrity)
  
✓ Error Handling
  - No sensitive data in errors
  - User-friendly messages
```

---

## 📚 HELPFUL LINKS

### **AI Models:**
- Whisper: https://github.com/openai/whisper
- Vision: Your custom model

### **Libraries:**
- Flask: https://flask.palletsprojects.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- SQLite: https://www.sqlite.org/

---

## 🎬 FINAL CHECKLIST - GO LIVE KARNE SE PEHLE

- [ ] Backend running (Terminal 1: `python app.py`)
- [ ] Frontend running (Terminal 2: `npm run dev`)
- [ ] Website loads (http://localhost:5173)
- [ ] Health check passes (`curl http://localhost:5000/api/health`)
- [ ] Form submission works
- [ ] File upload works
- [ ] Analysis completes
- [ ] Results display correctly
- [ ] Database has data (`sqlite3 medical_triage.db → SELECT * FROM patients;`)
- [ ] Admin queue working
- [ ] No console errors (F12)
- [ ] Network requests successful (F12 → Network tab)

**All Green?** → 🚀 **READY TO LAUNCH!**

---

## 💡 TROUBLESHOOTING FLOWCHART

```
Website not loading?
├─ Is frontend running? 
│  ├─ No: Terminal 2 → npm run dev
│  └─ Yes: Check localhost:5173
├─ Port 5173 already in use?
│  └─ Change: vite.config.ts → port: 5174
└─ Browser cache? → Ctrl+Shift+Delete clear cache

Form not submitting?
├─ Backend running?
│  ├─ No: Terminal 1 → python app.py
│  └─ Yes: Check if error in console
├─ .env.local exists?
│  └─ Check: VITE_API_BASE_URL=http://localhost:5000/api
└─ Network request failing?
   └─ Check: DevTools F12 → Network tab

Files not uploading?
├─ File size < 50MB?
├─ File format valid? (mp3, wav, jpg, png)
├─ Backend handling files?
│  └─ Check: temp_uploads folder exists?
└─ Check logs in Terminal 1

Analysis not working?
├─ AI models loaded?
│  └─ Check Terminal 1: "Audio Model Loaded"
├─ File processed correctly?
│  └─ Check temp_uploads → delete old files
└─ Database writable?
   └─ Check: medical_triage.db permissions
```

---

**Ab bilkul ready ho? Proceed with confidence! 🎉**
