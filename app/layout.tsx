import type { Metadata } from "next"
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

// Latin + Hindi font support
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto",
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-devanagari",
})

export const metadata: Metadata = {
  title: "Yojana AI — सरकारी योजना और करियर सहायक",
  description:
    "Find government schemes you are eligible for, build your career roadmap, and get AI-powered guidance in Hindi and English.",
  keywords: "government schemes india, sarkari yojana, career guidance, hindi AI",
  openGraph: {
    title: "Yojana AI",
    description: "AI-powered government scheme and career assistant for India",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoDevanagari.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
