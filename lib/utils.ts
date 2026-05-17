import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UserProfile, Scheme } from "@/types"

// ---------- TAILWIND HELPER ----------
// Usage: cn("px-4", isActive && "bg-blue-500", className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ---------- SCHEME MATCHING ----------
// Returns schemes sorted by match score (highest first)
export function matchSchemes(user: UserProfile, schemes: Scheme[]): Scheme[] {
  return schemes
    .map((scheme) => {
      let score = 0
      const e = scheme.eligibility_json

      // Age check
      if (e.age_min && user.age < e.age_min) return null
      if (e.age_max && user.age > e.age_max) return null

      // State check (+30 if state matches, pass if no state restriction)
      if (e.states && e.states.length > 0) {
        if (e.states.includes(user.state)) score += 30
        else return null
      } else {
        score += 20  // national scheme = slightly lower priority
      }

      // Category check (+40 if matches)
      if (e.categories && e.categories.length > 0) {
        if (e.categories.includes(user.category)) score += 40
        else return null
      } else {
        score += 25
      }

      // Income check (+30 if eligible)
      if (e.income_max) {
        const incomeMap: Record<string, number> = {
          below_1lakh: 100000,
          "1_5lakh": 500000,
          above_5lakh: 1000000,
        }
        if (incomeMap[user.income_level] <= e.income_max) score += 30
        else return null
      } else {
        score += 10
      }

      return { ...scheme, match_score: score }
    })
    .filter(Boolean)
    .sort((a, b) => (b!.match_score! - a!.match_score!)) as Scheme[]
}

// ---------- FORMATTING ----------
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("hi-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

// ---------- STATE LIST ----------
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
]
