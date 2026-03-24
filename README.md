# PrepWise — AI-Powered Interview Prep

A voice-based mock interview platform that lets you practice job interviews with an AI interviewer and get structured feedback on your performance.

Built following the [JS Mastery](https://www.youtube.com/@javascriptmastery) tutorial.

---

## Features

- **Voice interviews** — Speak naturally with an AI interviewer powered by VAPI (11Labs TTS + Deepgram STT)
- **Custom interview generation** — Specify your target role, experience level, tech stack, and question count; Gemini generates tailored questions via a voice conversation
- **Structured feedback** — After each session, get an overall score (0–100) broken down across 5 categories with strengths and areas for improvement
- **Dashboard** — View your past interviews with scores and browse community interviews to practice
- **Auth** — Email/password sign-up and sign-in with Firebase, session cookies for protected routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & DB | Firebase (Auth + Firestore) |
| Voice AI | VAPI (11Labs + Deepgram) |
| LLM | Google Gemini 2.0 Flash (via Vercel AI SDK) |
| Forms | React Hook Form + Zod |
| UI | Radix UI, Sonner toasts, Lucide icons |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://console.firebase.google.com/) project with Auth and Firestore enabled
- A [VAPI](https://vapi.ai/) account with a workflow configured
- A [Google AI Studio](https://aistudio.google.com/) API key

### 1. Clone and install

```bash
git clone <repo-url>
cd interview_prep
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
# Firebase Admin SDK (from your service account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key

# VAPI (public — safe to expose in browser)
NEXT_PUBLIC_VAPI_WEB_TOKEN=your-vapi-web-token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-vapi-workflow-id
```

> **Note:** Firebase client config is in `firebase/client.ts`. For production, move those values to `NEXT_PUBLIC_*` env vars.

### 3. VAPI Workflow Setup

Your VAPI workflow needs an API request node that POSTs to `/api/vapi/generate` with body variables: `role`, `type`, `level`, `techstack`, `amount`, `userid`.

For local dev, use a tunnel like [ngrok](https://ngrok.com/) since VAPI needs a public URL. In production, point it to your deployed URL.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/
│   ├── (auth)/             # Sign-in / Sign-up pages
│   ├── (root)/             # Protected pages (dashboard, interview, feedback)
│   └── api/vapi/generate/  # POST endpoint called by VAPI workflow to generate interviews
├── components/
│   ├── Agent.tsx           # Core voice interview component (VAPI integration)
│   ├── AuthForm.tsx        # Shared sign-in / sign-up form
│   └── InterviewCard.tsx   # Interview card on dashboard
├── firebase/
│   ├── admin.ts            # Firebase Admin SDK (server-side auth + Firestore)
│   └── client.ts           # Firebase client SDK
├── lib/
│   ├── actions/
│   │   ├── auth.action.ts      # Sign-up, sign-in, session cookie management
│   │   └── general.action.ts   # Interview + feedback CRUD (Firestore + Gemini)
│   └── vapi.sdk.ts         # VAPI client singleton
├── constants/index.ts      # Interviewer assistant config, feedback Zod schema, VAPI workflow def
└── types/index.d.ts        # Global TypeScript types
```

---

## How It Works

### 1. Interview Generation
1. User clicks **Start an Interview** and has a voice conversation with the AI via VAPI
2. The AI collects: role, experience level, tech stack, and question count
3. VAPI calls `/api/vapi/generate` which uses Gemini to generate custom questions
4. The interview is saved to Firestore and appears on the dashboard

### 2. Interview Session
1. User starts a voice call with the AI interviewer
2. VAPI handles speech-to-text (Deepgram), LLM responses (GPT-4), and text-to-speech (11Labs "Sarah")
3. The transcript is captured message-by-message in real time

### 3. Feedback
1. On call end, the full transcript is sent to Gemini for analysis
2. Gemini scores the candidate across 5 categories and returns structured JSON feedback
3. Feedback is saved to Firestore and the user is redirected to the results page

---

## Firestore Schema

| Collection | Key Fields |
|---|---|
| `users` | `name`, `email` |
| `interviews` | `role`, `type`, `level`, `techstack[]`, `questions[]`, `userId`, `finalized`, `coverImage`, `createdAt` |
| `feedback` | `interviewId`, `userId`, `totalScore`, `categoryScores[]`, `strengths[]`, `areasForImprovement[]`, `finalAssessment`, `createdAt` |

---

## Feedback Categories

Each interview is scored 0–100 across:

1. Communication Skills
2. Technical Knowledge
3. Problem Solving
4. Cultural Fit
5. Confidence and Clarity
