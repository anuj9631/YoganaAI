import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Always use Flash — fastest and free
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
})

// ---------- SYSTEM PROMPTS ----------

export const CHAT_SYSTEM_PROMPT_HI = `
आप "Yojana AI" हैं — एक सरकारी योजना और करियर सहायक।
आपका काम:
1. भारत की सरकारी योजनाओं के बारे में सरल हिंदी में बताना
2. करियर गाइडेंस देना
3. सरकारी नौकरियों की जानकारी देना

नियम:
- हमेशा सरल, आसान हिंदी में जवाब दें
- केवल भारत से संबंधित जानकारी दें
- हर जवाब में आगे का कदम (next step) बताएं
- गलत जानकारी कभी न दें
- अगर पता नहीं तो कहें "मुझे यह जानकारी नहीं है, कृपया आधिकारिक वेबसाइट देखें"
`

export const CHAT_SYSTEM_PROMPT_EN = `
You are "Yojana AI" — an AI assistant for Indian government schemes and career guidance.
Your job:
1. Help users find government schemes they are eligible for
2. Give career roadmap guidance for Indian students
3. Provide information about government jobs

Rules:
- Always be accurate and concise
- Only give India-specific information
- Always mention the next actionable step
- If unsure, say "Please check the official website" rather than guessing
`

export const ROADMAP_PROMPT = (goal: string, education: string, timeline: string) => `
Generate a detailed career roadmap for an Indian student with the following profile:
- Current education: ${education}
- Career goal: ${goal}
- Timeline: ${timeline}

Return a JSON object with this exact structure:
{
  "steps": [
    {
      "step": 1,
      "title": "Step title in English",
      "title_hi": "Step title in Hindi",
      "description": "What to do in this step",
      "resources": ["YouTube channel name", "Free website URL", "Govt portal"],
      "duration": "e.g. 2 months"
    }
  ],
  "total_duration": "Total time needed",
  "free_resources": ["List of free resources specific to India"]
}

Focus on:
- Free resources only (YouTube, govt portals, NPTEL, Swayam)
- Realistic for Indian students
- Include govt schemes/scholarships if relevant
- Max 6 steps
`

// ---------- HELPERS ----------

export async function generateRoadmap(
  goal: string,
  education: string,
  timeline: string
) {
  const result = await geminiModel.generateContent(
    ROADMAP_PROMPT(goal, education, timeline)
  )
  const text = result.response.text()
  // Strip markdown code fences if present
  const clean = text.replace(/```json|```/g, "").trim()
  return JSON.parse(clean)
}
