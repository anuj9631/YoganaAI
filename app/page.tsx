import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇮🇳</span>
          <span className="font-semibold text-lg text-gray-900">Yojana AI</span>
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Free Shuru Karo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm px-4 py-1.5 rounded-full mb-6 border border-orange-200">
          ✨ AI-powered • Hindi Support • 100% Free
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
          सरकारी योजनाएं खोजें
          <br />
          <span className="text-orange-500">AI की मदद से</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Apni profile bharo — hum batayenge ki aap kaunsi government schemes ke
          liye eligible hain, career roadmap kya hoga, aur jobs kahan milenge.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/signup"
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
          >
            अभी शुरू करें — Free है
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Dashboard देखें →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📋",
              title: "Scheme Finder",
              title_hi: "योजना खोजें",
              desc: "Age, state, income ke hisaab se aapke liye best government schemes AI dhundh dega",
            },
            {
              icon: "🗺️",
              title: "Career Roadmap",
              title_hi: "करियर रोडमैप",
              desc: "Apna career goal batao — AI free resources ke saath step-by-step plan banayega",
            },
            {
              icon: "💬",
              title: "Hindi Chatbot",
              title_hi: "हिंदी चैटबॉट",
              desc: "हिंदी में पूछो कुछ भी — योजनाएं, नौकरी, दस्तावेज़ — AI तुरंत जवाब देगा",
            },
            {
              icon: "💼",
              title: "Job Board",
              title_hi: "नौकरी बोर्ड",
              desc: "Govt + private jobs filtered by your location and qualification",
            },
            {
              icon: "📄",
              title: "Document Checker",
              title_hi: "दस्तावेज़ जांच",
              desc: "Upload Aadhaar / marksheet — AI batayega kaunsi schemes ke liye apply karo",
            },
            {
              icon: "✅",
              title: "Progress Tracker",
              title_hi: "प्रगति ट्रैकर",
              desc: "Saved, applied, received — apni har scheme ka status track karo ek jagah",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-medium text-gray-900">{f.title}</div>
              <div className="text-xs text-orange-600 mb-2">{f.title_hi}</div>
              <div className="text-sm text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-sm text-gray-400">
        Made with ❤️ for India • Yojana AI © 2025
      </footer>
    </main>
  );
}
