"use client";

import { useState } from "react";
import { INDIAN_STATES } from "@/lib/utils";

type Scheme = {
  id: string;
  name: string;
  name_hi: string;
  ministry: string;
  benefit: string;
  apply_url: string;
  documents_needed: string[];
  match_score: number;
};

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(age),
          state,
          income_level: income,
          category,
        }),
      });
      const data = await res.json();
      setSchemes(data.schemes || []);
    } catch {
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Scheme Finder</h1>
        <p className="text-sm text-gray-500">
          Fill your details to find matching government schemes
        </p>
      </div>

      {/* Filter Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              min="14"
              max="100"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Annual Income
            </label>
            <select
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select income</option>
              <option value="below_1lakh">Below ₹1 Lakh</option>
              <option value="1_5lakh">₹1 Lakh – ₹5 Lakh</option>
              <option value="above_5lakh">Above ₹5 Lakh</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select category</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Find Schemes →"}
        </button>
      </form>

      {/* Results */}
      {loading && (
        <div className="text-center py-12 text-gray-400 text-sm">
          Searching schemes...
        </div>
      )}

      {!loading && searched && schemes.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          No schemes found for your profile.
        </div>
      )}

      {!loading && schemes.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {schemes.length} schemes found
          </p>
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{scheme.name}</h3>
                  <p className="text-xs text-orange-600">{scheme.name_hi}</p>
                </div>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full whitespace-nowrap">
                  {scheme.match_score}% match
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-1">{scheme.ministry}</p>
              <p className="text-sm text-gray-700 mb-3">{scheme.benefit}</p>

              {scheme.documents_needed?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Documents needed:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {scheme.documents_needed.map((doc) => (
                      <span
                        key={doc}
                        className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={scheme.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
