"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { UserProfile } from "@/types"

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single()

      setUser(data)
      setLoading(false)
    }

    fetchUser()
  }, [])

  return { user, loading }
}
