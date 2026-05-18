import Link from "next/link";

const navItems = [
  { href: "/dashboard", icon: "🏠", label: "Home", label_hi: "होम" },
  {
    href: "/dashboard/schemes",
    icon: "📋",
    label: "Schemes",
    label_hi: "योजनाएं",
  },
  { href: "/dashboard/career", icon: "🗺️", label: "Career", label_hi: "करियर" },
  { href: "/dashboard/jobs", icon: "💼", label: "Jobs", label_hi: "नौकरी" },
  { href: "/dashboard/chat", icon: "💬", label: "Chat", label_hi: "चैट" },
  {
    href: "/dashboard/tracker",
    icon: "✅",
    label: "Tracker",
    label_hi: "ट्रैकर",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r px-4 py-6 gap-1">
        <Link href="/" className="flex items-center gap-2 mb-6 px-2">
          <span className="text-xl">🇮🇳</span>
          <span className="font-semibold text-gray-900">Yojana AI</span>
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition"
          >
            <span className="text-base">{item.icon}</span>
            <div>
              <div>{item.label}</div>
              <div className="text-xs text-gray-400">{item.label_hi}</div>
            </div>
          </Link>
        ))}

        <div className="mt-auto">
          <div className="px-3 py-2 text-xs text-gray-400 border-t pt-4">
            Logged in as
            <br />
            <span className="text-gray-600 font-medium">User</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar — mobile */}
        <header className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span className="font-semibold text-gray-900">Yojana AI</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>

        {/* Bottom nav — mobile */}
        <nav className="md:hidden bg-white border-t flex justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-orange-600 transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px]">{item.label_hi}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
