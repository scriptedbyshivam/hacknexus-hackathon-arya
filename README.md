<!-- ========================================= -->
<!-- ⚡ TRIAGENEXUS (HACKNEXUS PROJECT) -->
<!-- ========================================= -->

<h1 align="center">🚑 TriageAI</h1>

<p align="center">
  <b>Multimodal AI for Emergency Triage Prioritization</b><br/>
  <i>HackNexus Hackathon • Problem 02 Solution</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/AI-Multimodal-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3000&color=00F7FF&center=true&vCenter=true&width=750&lines=Emergency+Triage+with+AI+🚑;Audio+%2B+Image+Analysis+🧠;Real-time+Patient+Prioritization+⚡;Built+for+HackNexus+Hackathon+🔥" />
</p>

---

## 🧠 Problem Statement

**Multimodal AI for Emergency Triage Prioritization**

Emergency rooms often face:

- 🚨 Patient overload  
- ⏳ Delayed prioritization  
- ❌ Manual triage inefficiencies  

---

## 💡 Our Solution

**TriageNexus** is an AI-powered system that:

- 🎙️ Analyzes **911/ambulance call audio (NLP)**  
- 🖼️ Detects injuries via **Computer Vision**  
- 🧠 Combines both using **Multimodal AI**  
- ⚡ Generates a **Triage Score (1–5)**  

👉 Helping medical staff take **faster, life-saving decisions**

---

## 🚀 Key Features

### 🤖 Multimodal AI Engine
- Combines audio + image inputs  
- Produces accurate triage prioritization  

---

### 🎙️ Audio Intelligence (NLP)
- Speech-to-text processing  
- Sentiment detection (panic, urgency)  

---

### 🖼️ Injury Detection (Computer Vision)
- Detects visible injuries  
- Highlights severity  

---

### 📊 Smart Dashboard
- Real-time patient queue  
- Priority-based sorting  

---

### ⚡ Real-Time Decision Support
- Instant triage results  
- Helps reduce emergency delays  

---
## 🛠️ Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------- |
| Frontend     | ⚛️ React + Tailwind       |
| Backend      | ⚡ FastAPI                 |
| AI/NLP       | 🧠 Transformers / Whisper |
| CV           | 👁️ OpenCV / CNN          |
| ML Framework | 🔥 PyTorch / TensorFlow   |
| API          | 🔗 REST                   |

---
## 📁 Repository Structure
```
triageai/
│
├── frontend/          # React frontend
├── backend/           # FastAPI backend
│
├── docs/              # Architecture / assets
├── README.md
```

## ⚙️ Getting Started
1️⃣ Clone Repository
```
git clone https://github.com/your-username/triagenexus.git
cd triagenexus
```
2️⃣ Setup Frontend
```
cd frontend
npm install
npm run dev
```
3️⃣ Setup Backend
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
---
## 🔌 API Flow
```
POST /analyze
   │
   ├── audio file
   ├── image file
   │
   ▼
Returns:
   - triage_score
   - severity
   - sentiment
```

---

## 🧪 How to Use
#### Step 1: Upload Data
<li>Upload audio recording</li>
<li>Upload injury image</li>

#### Step 2: AI Processing
<li>Backend analyzes both inputs</li>
<li>Multimodal model generates insights</li>


#### Step 3: View Results
<li>Triage Score (1–5)</li>
<li>Severity level</li>
<li>Visual indicators</li>

#### Step 4: Dashboard Monitoring
<li>Patients sorted by urgency</li>
<li>Real-time updates for staff</li>

---
## 🎯 Triage Score Meaning

| Score | Priority Level | Description                  |
| ----- | -------------- | ---------------------------- |
| 1     | 🔴 Critical    | Immediate attention required |
| 2     | 🟠 High        | Serious condition            |
| 3     | 🟡 Moderate    | Needs care but stable        |
| 4     | 🟢 Low         | Minor injuries               |
| 5     | 🔵 Stable      | No urgent care needed        |


---
## 📽️ Demo Video

<i>Comming Soon ...</i>

---
## 🧠 How It Works (Architecture)

```
User Input
   │
   ├── 🎙️ Audio (911 Call)
   ├── 🖼️ Injury Image
   │
   ▼
Frontend (React UI)
   │
   ▼
Backend API
   │
   ├── NLP Model (Audio → Text → Sentiment)
   ├── CV Model (Image → Injury Detection)
   │
   ▼
Multimodal Fusion Model
   │
   ▼
Triage Score (1–5)
   │
   ▼
Frontend Dashboard (Priority View)
```
---
## 🏆 Hackathon Value
### 💡 Innovation
<li>Combines NLP + Computer Vision</li>
<li>Real-world emergency healthcare use case</li>
<li>Multimodal AI decision-making</li>


---
## ❤️ Impact
<li>Helps doctors prioritize patients faster</li>
<li>Reduces emergency room overload</li>
<li>Can potentially save lives</li>

---
## ⚡ Scalability

<li>Ambulance systems</li>
<li>Hospital ER dashboards</li>
<li>Government emergency services</li>

---

## 🔮 Future Improvements
<li>🎙️ Live call transcription (real-time)</li>
<li>📡 IoT integration (ambulance sensors)</li>
<li>🧑‍⚕️ Doctor feedback learning loop</li>
<li>🌍 Multi-language support</li>
<li>📱 Mobile app version</li>

---
## 🤝 Contributors

| Name       | Role               |
| ---------- | ------------------ |
| Veer Pratap Singh  | PPT + UI/UX Designer  |
| Poorvangika Kanwar | Backend Developer       |
| Suman Vyas | Research Analyst + QA Tester       |
| Shivam Maurya | Frontend Developer      |

---
## ⭐ Support

If you like this project:

<li>⭐ Star the repository</li>
<li>🍴 Fork it</li>
<li>🧠 Contribute ideas</li>

---
<p align="center"> <b>🚑 Built at HackNexus to save lives using AI</b><br/> <i>TriageAI • Multimodal AI System</i> </p>
