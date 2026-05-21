import { NextResponse } from "next/server"
import { generateRoadmap } from "@/lib/groq"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { goal, education, timeline } = await request.json()

    if (!goal || !education || !timeline) {
      return NextResponse.json(
        { error: "goal, education and timeline are required" },
        { status: 400 }
      )
    }

    // Generate roadmap from Groq
    const roadmap = await generateRoadmap(goal, education, timeline)

    // Save to Supabase if user is logged in
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("career_roadmaps").insert({
        user_id: user.id,
        goal,
        roadmap_json: roadmap,
      })
    }

    return NextResponse.json({ roadmap })
  } catch (error: any) {
    console.error("Career error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}