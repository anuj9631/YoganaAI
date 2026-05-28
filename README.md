# Yojana AI 🇮🇳

An AI-powered government scheme and career assistant for India. Helps users find eligible government schemes, generate career roadmaps, track applications, and get guidance in Hindi or English.

---

## Features

- **Scheme Finder** — Enter your age, state, income and category to get matching government schemes
- **Career Roadmap** — AI generates a step-by-step career plan with free resources
- **Hindi AI Chatbot** — Ask anything in Hindi or English, powered by Groq (Llama 3.1)
- **Job Board** — Government and private job listings across India
- **Progress Tracker** — Track your scheme applications from saved to received

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google + Email OTP) |
| AI | Groq API (Llama 3.1 8B Instant) |
| Hosting | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/yojana-ai.git
cd yojana-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_api_key
```

Get your keys:
- Supabase → [supabase.com](https://supabase.com) → Settings → API
- Groq → [console.groq.com](https://console.groq.com)

### 4. Set up the database

- Go to your Supabase project → SQL Editor → New Query
- Copy the contents of `supabase/schema.sql` and run it
- This creates all tables, RLS policies and seeds 10 government schemes

### 5. Enable Google Auth (optional)

- Supabase → Authentication → Providers → Google → Enable
- Add your Google OAuth credentials

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
yojana-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── api/
│   │   ├── chat/route.ts
│   │   ├── schemes/route.ts
│   │   └── career/route.ts
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── chat/page.tsx
│   │   ├── schemes/page.tsx
│   │   ├── career/page.tsx
│   │   ├── jobs/page.tsx
│   │   └── tracker/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── groq.ts
│   ├── utils.ts
│   └── supabase/
│       ├── client.ts
│       └── server.ts
├── hooks/
│   ├── useUser.ts
│   └── useSchemes.ts
├── types/
│   └── index.ts
├── supabase/
│   └── schema.sql
└── middleware.ts
```

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all environment variables from `.env.local`
4. Click Deploy

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `GROQ_API_KEY` | Yes | Groq API key for AI features |

---

## Roadmap

- [ ] Connect Supabase for real scheme data
- [ ] Save chat history to database
- [ ] Adzuna API integration for live job listings
- [ ] Document upload and AI analysis
- [ ] PWA support for mobile
- [ ] SMS notifications for scheme deadlines

---

## License

MIT License — free to use and modify.
