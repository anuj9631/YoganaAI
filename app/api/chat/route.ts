import { NextResponse } from "next/server"
import { chatWithGroq } from "@/lib/groq"

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const reply = await chatWithGroq(message, history || [])

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}