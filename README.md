# 🏛️ CivicResolve

> **AI-Powered Civic Operations & Citizen Pulse Platform**  
> Bilingual (English & தமிழ் / Tamil) citizen grievance reporting, triage, and resolution tracking powered by **Google Gemini 2.5 Flash** (`@google/genai`).

---

## 🌟 Key Features

- **🌐 Native Bilingual Support (English & தமிழ்):** Global toggle translating navigation, form labels, quick presets, status badges, department names, map legends, and AI-generated rationales dynamically.
- **⚡ Frictionless Intake (< 60s):** Plain text, Web Speech API voice-to-text (`ta-IN` / `en-IN`), 1-click sample presets, and photo upload.
- **🤖 Gemini 2.5 Flash Intelligence:** Structured JSON output (`responseSchema`) with category classification, 1–100 priority score gauge, urgency rating, recommended municipal department, and bilingual summaries.
- **👁️ Multimodal Vision Inspection:** Inspects hazard photos to verify severity, describe visual evidence, and flag immediate safety risks.
- **⚠️ Duplicate & Cluster Detection:** Warns citizens of existing open tickets in the vicinity and allows 1-click upvoting.
- **📈 Dynamic Community Upvotes:** "Upvote / Me Too (+1)" dynamically boosts a ticket's priority score.
- **🗺️ Interactive Neighborhood Pulse Map:** Visual Chennai ward map with color-coded pins, pulsing radar waves on critical hazards, and clickable previews.
- **🏢 Authority Operations Command:** Executive KPI overview, sortable dispatcher queue, and 1-click crew assignment, department override, and resolution proof logging.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/civic-resolve.git
cd civic-resolve

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```
> *Note: If `GEMINI_API_KEY` is not provided, CivicResolve automatically utilizes its intelligent rule-based bilingual fallback engine so demonstrations and testing never break.*

### 4. Run Application
```bash
# Development mode (Vite frontend with integrated API middleware)
npm run dev

# Production build and server
npm run build
npm start
```
Open **http://localhost:5000** in your browser.

---

## 🏗️ Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend:** Node.js, Express, `@google/genai` (Gemini 2.5 Flash)
- **Audio:** Web Speech API (`webkitSpeechRecognition`)
- **Storage:** LocalStorage with pre-seeded realistic Chennai ward grievances

---

## 📄 License
MIT License.
