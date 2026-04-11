<!-- ========================================= -->
<!-- ⚡ TRIAGENEXUS BACKEND -->
<!-- ========================================= -->

<h1 align="center">🧠 TriageAI Backend</h1>

<p align="center">
  <b>Multimodal AI Engine for Emergency Triage</b><br/>
  <i>Audio + Image → Intelligent Patient Prioritization</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/AI-NLP%20%2B%20CV-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Model-Multimodal-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=3000&color=00F7FF&center=true&vCenter=true&width=700&lines=AI+for+Emergency+Response+🚑;Audio+%2B+Image+Analysis+🧠;Real-time+Triage+Scoring+⚡;Saving+Lives+with+AI+❤️" />
</p>

---

## 🧠 Problem Statement

Emergency rooms face critical delays due to:

- High patient volume  
- Manual triage processes  
- Lack of real-time prioritization  

---

## 🚀 About the Backend

The **TriageNexus Backend** powers the intelligence of the system by:

- 🎙️ Processing emergency call audio using NLP  
- 🖼️ Detecting injuries from images using Computer Vision  
- 🧠 Combining both via a Multimodal AI model  
- ⚡ Generating a **Triage Score (1–5)**  

---

## ✨ Core Features

### 🎙️ Audio Processing (NLP)
- Converts speech → text  
- Sentiment analysis (panic, distress, urgency)  
- Extracts key emergency signals  

---

### 🖼️ Image Analysis (Computer Vision)
- Detects visible injuries  
- Identifies severity patterns  
- Flags critical conditions  

---

### 🧠 Multimodal Fusion Engine
- Combines audio + image insights  
- Produces final **triage score**  
- Improves accuracy over single-input models  

---

### ⚡ Fast API Responses
- Real-time processing  
- Optimized endpoints for frontend usage  

---

## 🛠️ Tech Stack

| Category        | Technology |
|----------------|-----------|
| Backend        | ⚡ FastAPI / Node.js (choose yours) |
| NLP            | 🧠 Transformers / Whisper |
| Computer Vision| 👁️ OpenCV / CNN Models |
| ML Framework   | 🔥 PyTorch / TensorFlow |
| API Handling   | 🔗 REST APIs |
| File Handling  | 📂 Multipart Uploads |

---

## 📁 Project Structure

```bash
backend/
│
├── app/
│   ├── routes/             # API endpoints
│   │   └── analyze.py
│   │
│   ├── models/             # ML models
│   │   ├── nlp_model.py
│   │   ├── cv_model.py
│   │   └── fusion_model.py
│   │
│   ├── services/           # Business logic
│   │   └── triage_service.py
│   │
│   ├── utils/              # Helpers
│   │   └── preprocessing.py
│   │
│   └── main.py             # Entry point
│
├── requirements.txt
├── .env
└── README.md
```
---
## ⚙️ Installation & Setup
1️⃣ Clone Repository
```
git clone https://github.com/your-username/triagenexus-backend.git
cd triagenexus-backend
```
---
## 2️⃣ Create Virtual Environment
```
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```
---
## 3️⃣ Install Dependencies
```
pip install -r requirements.txt
```
----
## 4️⃣ Run Server
```
uvicorn app.main:app --reload
```
Server runs on:http://localhost: ....

---
## 🔌 API Endpoints
#### 📍 Analyze Patient Data
```
POST /analyze
```
#### 📥 Request
<li>Audio file</li>
<li>Image file</li>

---
## 📤 Response
```
{
  "triage_score": 2,
  "severity": "High",
  "sentiment": "Distressed",
  "injury_detected": true
}
```
---
## 🔄 Processing Flow
```
Audio Input ──► NLP Model ──► Sentiment
Image Input ──► CV Model ──► Injury Detection
                        │
                        ▼
             Multimodal Fusion
                        │
                        ▼
                Triage Score (1–5)              
```

---
## 🎯 Triage Score Logic
| Score | Priority    | Meaning               |
| ----- | ----------- | --------------------- |
| 1     | 🔴 Critical | Immediate action      |
| 2     | 🟠 High     | Serious               |
| 3     | 🟡 Medium   | Stable but needs care |
| 4     | 🟢 Low      | Minor                 |
| 5     | 🔵 Safe     | No urgency            |


---
## 🧪 Testing
You can test API using:
<li>
Postman
<li>
Curl
<li>
Frontend integration

---
## 🔮 Future Enhancements
<li>
🎙️ Real-time streaming audio analysis
<li>
🧠 Improved multimodal deep learning
<li>
📡 Hospital system integration
<li>
🌍 Multi-language NLP support
<li>
☁️ Cloud deployment (AWS/GCP)

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
<p align="center"> <b>🧠 Intelligence behind life-saving decisions</b><br/> <i>TriageAI Backend • HackNexus Hackathon</i> </p>