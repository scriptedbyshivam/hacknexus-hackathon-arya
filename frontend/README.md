<!-- ========================================= -->
<!-- ⚡ TRIAGEAi FRONTEND -->
<!-- ========================================= -->

<h1 align="center">🚑 TriageAI Frontend</h1>

<p align="center">
  <b>AI-Powered Emergency Triage Dashboard</b><br/>
  <i>Multimodal AI for Faster, Smarter Emergency Decisions</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Tailwind-Styling-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img src="https://img.shields.io/badge/Vite-Build-purple?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3000&color=00F7FF&center=true&vCenter=true&width=700&lines=Multimodal+AI+for+Emergency+Triage+🚑;Analyze+911+Calls+%2B+Injury+Images+📸;Predict+Triage+Score+in+Seconds+⚡;Helping+Doctors+Save+Lives+❤️" />
</p>

---

## 🧠 Problem Statement

Emergency rooms are often overwhelmed with patients, making it difficult to prioritize critical cases quickly.

Our system solves this by:

- 🎙️ Analyzing **audio from 911/ambulance calls (NLP)**
- 🖼️ Processing **injury images (Computer Vision)**
- 🧠 Combining both using **Multimodal AI**
- ⚡ Generating a **Triage Score (1–5)** for prioritization

---

## 🚀 About the Project

**TriageNexus** is a smart emergency triage system designed to assist medical staff by providing:

- 📊 Real-time patient priority scoring  
- 🤖 AI-powered multimodal analysis  
- ⚡ Faster decision-making in critical situations  

This repository contains the **frontend application**, responsible for:

- Displaying patient dashboards  
- Uploading audio & image inputs  
- Visualizing AI-generated triage results  
- Providing an intuitive UI for emergency staff  

---

## ✨ Key Features

### 🚑 Patient Triage Dashboard
- View patients in real-time
- Sorted by **AI-generated urgency score**
- Color-coded priority levels (Critical → Stable)

---

### 🎙️ Audio Analysis Interface
- Upload or record emergency call audio
- Displays NLP-based sentiment & severity analysis

---

### 🖼️ Image Injury Detection
- Upload patient injury images
- Visual highlights of detected injuries

---

### 🧠 Multimodal Fusion Output
- Combines audio + image insights
- Generates final **Triage Score (1–5)**

---

### ⚡ Real-Time Updates
- Instant UI refresh after analysis
- Smooth and responsive interface

---

### 📊 Clean & Minimal UI
- Designed for **fast decision-making**
- Optimized for emergency environments

---

## 🛠️ Tech Stack

| Category        | Technology |
|----------------|-----------|
| Frontend       | ⚛️ React |
| Build Tool     | ⚡ Vite |
| Styling        | 🎨 Tailwind CSS |
| State Mgmt     | 🧠 React Hooks |
| API Layer      | 🔗 Axios / Fetch |
| Routing        | 🌐 React Router |
| Icons & UI     | ✨ Lucide / Heroicons |

---

## 📁 Project Structure

```bash
frontend/
│
├── public/                 # Static assets (images, icons)
│
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Dashboard/
│   │   ├── Upload/
│   │   ├── TriageCard/
│   │   └── Common/
│   │
│   ├── pages/              # Application pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Upload.jsx
│   │
│   ├── hooks/              # Custom hooks
│   │   └── useTriage.js
│   │
│   ├── services/           # API calls
│   │   └── api.js
│   │
│   ├── context/            # Global state (if used)
│   │
│   ├── styles/             # Tailwind / global styles
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md

```

---
## ⚙️ Installation & Setup
1️⃣ Clone the Repository
```
git clone https://github.com/your-username/triagenexus-frontend.git
cd triagenexus-frontend
```

2️⃣ Install Dependencies
```
npm install
```
3️⃣ Start Development Server
```
npm run dev
```
App will run on: http://localhost: ......

---
## 🔌 API Integration

The frontend communicates with a backend AI service that handles:

🎙️ Audio → NLP Processing
🖼️ Image → Computer Vision
🧠 Multimodal Fusion → Triage Score
#### Example API Flow:

```
// Upload data
POST /analyze

{
  audio: file,
  image: file
}

// Response
{
  triage_score: 2,
  severity: "High",
  sentiment: "Distressed",
  injury_detected: true
}
```
---
## 🧪 How to Use
#### Step 1: Upload Data
<li>Upload audio recording</li>
<li>Upload injury image</li>

#### Step 2: AI Processing
<li>Backend analyzes both inputs</li>
<li>Multimodal model generates insights</li>
<li></li>

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
<li></li>

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
<p align="center"> <b>🚑 Built with passion to save lives using AI</b><br/> <i>Hackathon Project • TriageAI</i> </p>



















