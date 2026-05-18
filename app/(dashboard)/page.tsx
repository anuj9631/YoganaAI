import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          नमस्ते! 👋
        </h1>
        <p className="text-gray-500">Aaj aap kya karna chahte hain?</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            href: "/dashboard/schemes",
            icon: "📋",
            title: "Scheme Finder",
            title_hi: "सरकारी योजनाएं खोजें",
            desc: "Find schemes you are eligible for",
            color: "bg-orange-50 border-orange-100 hover:border-orange-300",
            iconBg: "bg-orange-100",
          },
          {
            href: "/dashboard/chat",
            icon: "💬",
            title: "Hindi AI Chat",
            title_hi: "हिंदी में पूछें",
            desc: "Kuch bhi pucho Hindi mein",
            color: "bg-blue-50 border-blue-100 hover:border-blue-300",
            iconBg: "bg-blue-100",
          },
          {
            href: "/dashboard/career",
            icon: "🗺️",
            title: "Career Roadmap",
            title_hi: "करियर रोडमैप बनाएं",
            desc: "AI se apna career plan banao",
            color: "bg-green-50 border-green-100 hover:border-green-300",
            iconBg: "bg-green-100",
          },
          {
            href: "/dashboard/jobs",
            icon: "💼",
            title: "Job Board",
            title_hi: "नौकरी देखें",
            desc: "Govt + private job listings",
            color: "bg-purple-50 border-purple-100 hover:border-purple-300",
            iconBg: "bg-purple-100",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-start gap-4 p-5 rounded-xl border transition ${item.color}`}
          >
            <div
              className={`text-2xl w-12 h-12 flex items-center justify-center rounded-lg ${item.iconBg} flex-shrink-0`}
            >
              {item.icon}
            </div>
            <div>
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-xs text-gray-500 mb-1">{item.title_hi}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Setup reminder */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="font-medium text-amber-800 mb-1">
          ⚡ Profile Complete karo
        </div>
        <p className="text-sm text-amber-700 mb-3">
          Apna state, age, income aur category fill karo — AI better scheme
          recommendations dega.
        </p>
        <Link
          href="/dashboard/schemes"
          className="inline-block text-sm bg-amber-500 text-white px-4 py-1.5 rounded-lg hover:bg-amber-600 transition"
        >
          Profile Fill Karo →
        </Link>
      </div>
    </div>
  );
}
