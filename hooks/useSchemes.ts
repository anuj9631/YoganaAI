"use client"

import { useState } from "react"
import type { Scheme, UserProfile } from "@/types"

export function useSchemes() {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function findSchemes(profile: Partial<UserProfile>) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })

      const json = await res.json()

      if (!res.ok) throw new Error(json.error || "Something went wrong")

      setSchemes(json.schemes)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { schemes, loading, error, findSchemes }
}
