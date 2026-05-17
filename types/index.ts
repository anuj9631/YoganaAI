// ============================================================
// YOJANA AI — Global TypeScript Types
// ============================================================

// ---------- USER ----------
export type UserProfile = {
  id: string
  name: string
  state: string
  age: number
  income_level: "below_1lakh" | "1_5lakh" | "above_5lakh"
  category: "general" | "obc" | "sc" | "st"
  education: "below_10th" | "10th" | "12th" | "graduate" | "postgraduate"
  preferred_lang: "hi" | "en"
  created_at: string
}

// ---------- SCHEME ----------
export type SchemeEligibility = {
  age_min?: number
  age_max?: number
  states?: string[]            // empty = all states
  categories?: string[]        // empty = all categories
  income_max?: number          // annual income in rupees
  education_min?: string
}

export type Scheme = {
  id: string
  name: string
  name_hi: string
  ministry: string
  eligibility_json: SchemeEligibility
  benefit: string
  apply_url: string
  documents_needed: string[]
  deadline?: string
  match_score?: number         // added at runtime by matching logic
}

// ---------- SAVED SCHEME ----------
export type SavedScheme = {
  id: string
  user_id: string
  scheme_id: string
  status: "saved" | "applied" | "received"
  notes?: string
  saved_at: string
  scheme?: Scheme              // joined from schemes table
}

// ---------- CHAT ----------
export type ChatMessage = {
  id?: string
  user_id?: string
  role: "user" | "assistant"
  content: string
  lang: "hi" | "en"
  created_at?: string
}

// ---------- CAREER ROADMAP ----------
export type RoadmapStep = {
  step: number
  title: string
  title_hi: string
  description: string
  resources: string[]          // YouTube links, websites
  duration: string             // "2 months", "1 week"
  completed?: boolean
}

export type CareerRoadmap = {
  id: string
  user_id: string
  goal: string
  roadmap_json: {
    steps: RoadmapStep[]
    total_duration: string
    free_resources: string[]
  }
  generated_at: string
}

// ---------- JOB ----------
export type Job = {
  id: string
  title: string
  company: string
  location: string
  salary_min?: number
  salary_max?: number
  type: "full_time" | "part_time" | "internship" | "govt"
  apply_url: string
  posted_at: string
  description: string
  source: "adzuna" | "remotive" | "ncs" | "manual"
}

// ---------- API RESPONSES ----------
export type ApiResponse<T> = {
  data?: T
  error?: string
  message?: string
}
