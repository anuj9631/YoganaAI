"use client";

import { useState } from "react";

type SavedScheme = {
  id: string;
  name: string;
  name_hi: string;
  status: "saved" | "applied" | "received";
  notes: string;
  saved_at: string;
  benefit: string;
};

const STATUS_CONFIG = {
  saved: { label: "Saved", color: "bg-gray-50 text-gray-600 border-gray-200" },
  applied: {
    label: "Applied",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  received: {
    label: "Received ✓",
    color: "bg-green-50 text-green-600 border-green-200",
  },
};

// Placeholder data — will be replaced with Supabase data later
const PLACEHOLDER: SavedScheme[] = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    name_hi: "पीएम किसान सम्मान निधि",
    status: "applied",
    notes: "Applied on 12 Jan",
    saved_at: "2025-01-12",
    benefit: "₹6,000 per year",
  },
  {
    id: "2",
    name: "Ayushman Bharat",
    name_hi: "आयुष्मान भारत",
    status: "saved",
    notes: "",
    saved_at: "2025-01-15",
    benefit: "₹5 lakh health cover",
  },
];

export default function TrackerPage() {
  const [schemes, setSchemes] = useState<SavedScheme[]>(PLACEHOLDER);
  const [filter, setFilter] = useState<
    "all" | "saved" | "applied" | "received"
  >("all");

  function updateStatus(id: string, status: SavedScheme["status"]) {
    setSchemes((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  function updateNotes(id: string, notes: string) {
    setSchemes((prev) => prev.map((s) => (s.id === id ? { ...s, notes } : s)));
  }

  function removeScheme(id: string) {
    setSchemes((prev) => prev.filter((s) => s.id !== id));
  }

  const filtered =
    filter === "all" ? schemes : schemes.filter((s) => s.status === filter);

  const counts = {
    all: schemes.length,
    saved: schemes.filter((s) => s.status === "saved").length,
    applied: schemes.filter((s) => s.status === "applied").length,
    received: schemes.filter((s) => s.status === "received").length,
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Progress Tracker
        </h1>
        <p className="text-sm text-gray-500">
          Track your scheme applications in one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Saved", key: "saved", color: "text-gray-600" },
          { label: "Applied", key: "applied", color: "text-blue-600" },
          { label: "Received", key: "received", color: "text-green-600" },
        ].map((stat) => (
          <div
            key={stat.key}
            className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm"
          >
            <div className={`text-2xl font-semibold ${stat.color}`}>
              {counts[stat.key as keyof typeof counts]}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "saved", "applied", "received"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition capitalize ${
              filter === f
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? `All (${counts.all})` : `${f} (${counts[f]})`}
          </button>
        ))}
      </div>

      {/* Scheme cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No schemes here yet. Go to Scheme Finder to add some.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{scheme.name}</h3>
                  <p className="text-xs text-orange-600">{scheme.name_hi}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {scheme.benefit}
                  </p>
                </div>
                <button
                  onClick={() => removeScheme(scheme.id)}
                  className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                >
                  ×
                </button>
              </div>

              {/* Status selector */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {(["saved", "applied", "received"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(scheme.id, s)}
                    className={`text-xs px-3 py-1 rounded-full border transition capitalize ${
                      scheme.status === s
                        ? STATUS_CONFIG[s].color + " font-medium"
                        : "bg-white text-gray-400 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>

              {/* Notes */}
              <input
                value={scheme.notes}
                onChange={(e) => updateNotes(scheme.id, e.target.value)}
                placeholder="Add a note (e.g. applied on 12 Jan, waiting for approval)"
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-600"
              />

              <p className="text-xs text-gray-300 mt-2">
                Saved on {new Date(scheme.saved_at).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
