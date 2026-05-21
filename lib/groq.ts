const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL = "llama-3.1-8b-instant"

async function groqChat(messages: { role: string; content: string }[]) {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq error: ${err}`)
  }

  const data = await res.json()
  return data.choices[0].message.content as string
}

// ── System prompts ──────────────────────────────────────────

const CHAT_SYSTEM = `You are Yojana AI, an assistant for Indian government schemes and career guidance.
Rules:
- Give accurate, concise answers
- India-specific information only
- Always mention the next actionable step
- If unsure, say "Please check the official website" — never guess
- Support both Hindi and English questions`

const ROADMAP_SYSTEM = `You are a career guidance expert for Indian students.
When asked for a roadmap, respond ONLY with valid JSON — no markdown, no explanation.`

// ── Exported helpers ────────────────────────────────────────

export async function chatWithGroq(
  userMessage: string,
  history: { role: string; content: string }[] = []
) {
  const messages = [
    { role: "system", content: CHAT_SYSTEM },
    ...history.slice(-6), // keep last 6 messages for context
    { role: "user", content: userMessage },
  ]
  return groqChat(messages)
}

export async function generateRoadmap(
  goal: string,
  education: string,
  timeline: string
) {
  const prompt = `Generate a career roadmap for an Indian student.
Profile:
- Current education: ${education}
- Career goal: ${goal}
- Timeline: ${timeline}

Return ONLY this JSON structure:
{
  "steps": [
    {
      "step": 1,
      "title": "Step title",
      "description": "What to do",
      "resources": ["Free resource 1", "Free resource 2"],
      "duration": "2 months"
    }
  ],
  "total_duration": "X months",
  "free_resources": ["YouTube channel", "Govt portal"]
}

Max 6 steps. Focus on free resources — YouTube, NPTEL, Swayam, govt portals.`

  const messages = [
    { role: "system", content: ROADMAP_SYSTEM },
    { role: "user", content: prompt },
  ]

  const text = await groqChat(messages)
  const clean = text.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}