import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { matchSchemes } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const profile = await request.json()

    if (!profile.age || !profile.state) {
      return NextResponse.json({ error: "Age and state are required" }, { status: 400 })
    }

    const supabase = createClient()

    const { data: schemes, error } = await supabase
      .from("schemes")
      .select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const matched = matchSchemes(profile, schemes || [])

    return NextResponse.json({ schemes: matched })
  } catch (error: any) {
    console.error("Schemes error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}