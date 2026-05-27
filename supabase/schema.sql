-- ============================================================
-- YOJANA AI — Complete Database Schema
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- USERS TABLE
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text,
  state text,
  age integer,
  income_level text check (income_level in ('below_1lakh', '1_5lakh', 'above_5lakh')),
  category text check (category in ('general', 'obc', 'sc', 'st')),
  education text check (education in ('below_10th', '10th', '12th', 'graduate', 'postgraduate')),
  preferred_lang text default 'hi' check (preferred_lang in ('hi', 'en')),
  created_at timestamptz default now()
);

-- SCHEMES TABLE
create table public.schemes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_hi text,
  ministry text,
  eligibility_json jsonb default '{}',
  benefit text,
  apply_url text,
  documents_needed text[] default '{}',
  deadline date,
  created_at timestamptz default now()
);

-- USER SAVED SCHEMES
create table public.user_saved_schemes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade,
  scheme_id uuid references public.schemes on delete cascade,
  status text default 'saved' check (status in ('saved', 'applied', 'received')),
  notes text,
  saved_at timestamptz default now()
);

-- CHAT HISTORY
create table public.chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade,
  role text check (role in ('user', 'assistant')),
  content text,
  lang text default 'hi',
  created_at timestamptz default now()
);

-- CAREER ROADMAPS
create table public.career_roadmaps (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade,
  goal text,
  roadmap_json jsonb default '{}',
  generated_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.users enable row level security;
alter table public.user_saved_schemes enable row level security;
alter table public.chat_history enable row level security;
alter table public.career_roadmaps enable row level security;

-- Users can only read/edit their own profile
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Saved schemes
create policy "Users can manage own saved schemes" on public.user_saved_schemes
  for all using (auth.uid() = user_id);

-- Chat history
create policy "Users can manage own chat history" on public.chat_history
  for all using (auth.uid() = user_id);

-- Career roadmaps
create policy "Users can manage own roadmaps" on public.career_roadmaps
  for all using (auth.uid() = user_id);

-- Schemes are public (anyone can read)
alter table public.schemes enable row level security;
create policy "Schemes are publicly readable" on public.schemes
  for select using (true);

-- ============================================================
-- SEED DATA — 10 Real Government Schemes
-- ============================================================

insert into public.schemes (name, name_hi, ministry, benefit, apply_url, documents_needed, eligibility_json) values

('PM Kisan Samman Nidhi', 'पीएम किसान सम्मान निधि', 'Ministry of Agriculture',
'₹6,000 per year direct to bank account in 3 installments',
'https://pmkisan.gov.in',
array['aadhaar', 'bank_passbook', 'land_records'],
'{"income_max": 200000, "categories": []}'::jsonb),

('Ayushman Bharat PM-JAY', 'आयुष्मान भारत', 'Ministry of Health',
'₹5 lakh health insurance cover per family per year',
'https://pmjay.gov.in',
array['aadhaar', 'ration_card'],
'{"income_max": 100000, "categories": []}'::jsonb),

('PM Mudra Yojana', 'पीएम मुद्रा योजना', 'Ministry of Finance',
'Business loan up to ₹10 lakh without collateral',
'https://mudra.org.in',
array['aadhaar', 'pan_card', 'business_plan'],
'{"income_max": 500000, "categories": []}'::jsonb),

('Sukanya Samriddhi Yojana', 'सुकन्या समृद्धि योजना', 'Ministry of Finance',
'High interest savings scheme for girl child education and marriage',
'https://www.indiapost.gov.in',
array['aadhaar', 'birth_certificate'],
'{"age_max": 10, "categories": []}'::jsonb),

('PM Awas Yojana', 'पीएम आवास योजना', 'Ministry of Housing',
'Subsidy up to ₹2.67 lakh for home construction',
'https://pmaymis.gov.in',
array['aadhaar', 'bank_passbook', 'income_certificate'],
'{"income_max": 300000, "categories": []}'::jsonb),

('National Scholarship Portal', 'राष्ट्रीय छात्रवृत्ति पोर्टल', 'Ministry of Education',
'Scholarship up to ₹75,000 per year for students',
'https://scholarships.gov.in',
array['aadhaar', 'marksheet', 'income_certificate', 'bank_passbook'],
'{"age_max": 30, "income_max": 250000, "categories": []}'::jsonb),

('PM Jan Dhan Yojana', 'पीएम जन धन योजना', 'Ministry of Finance',
'Free bank account with ₹10,000 overdraft and accident insurance',
'https://pmjdy.gov.in',
array['aadhaar'],
'{"categories": []}'::jsonb),

('Atal Pension Yojana', 'अटल पेंशन योजना', 'Ministry of Finance',
'Guaranteed pension of ₹1,000–₹5,000 per month after age 60',
'https://npscra.nsdl.co.in',
array['aadhaar', 'bank_passbook'],
'{"age_min": 18, "age_max": 40, "categories": []}'::jsonb),

('PM Ujjwala Yojana', 'पीएम उज्ज्वला योजना', 'Ministry of Petroleum',
'Free LPG connection for BPL households',
'https://pmuy.gov.in',
array['aadhaar', 'ration_card', 'bpl_certificate'],
'{"income_max": 100000, "categories": []}'::jsonb),

('Startup India Scheme', 'स्टार्टअप इंडिया', 'Ministry of Commerce',
'Tax benefits, funding support and mentorship for startups',
'https://startupindia.gov.in',
array['aadhaar', 'pan_card', 'business_registration'],
'{"age_min": 18, "age_max": 45, "categories": []}'::jsonb);