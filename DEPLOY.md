# PhishShield AI - Deployment Guide

## 1. Prerequisites
- Node.js 18+
- Supabase Project

## 2. Environment Setup
The `.env.local` file has been pre-configured with the provided keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://uelxrbwxfeqqvubjjtog.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

## 3. Database Setup
1. Go to your Supabase Dashboard -> SQL Editor.
2. Copy the content from `supabase_schema.sql` in this project.
3. Run the query to create the tables (`profiles`, `reports`, `scans`).

## 4. Running Locally
```bash
npm install
npm run dev
```
Visit `http://localhost:3000`

## 5. Build for Production
```bash
npm run build
npm start
```

## Features Implemented
- **AI Scanner**: `app/scan/page.tsx`, `components/Scanner.tsx`, `lib/risk-scoring.ts`
- **Behavioral Quiz**: `app/quiz/page.tsx`, `components/PersonalityQuiz.tsx`
- **Heat Radar**: `app/map/page.tsx`, `components/Map.tsx`
- **UI System**: `tailwind.config.ts`, `app/globals.css` (Glassmorphism & Neon)
