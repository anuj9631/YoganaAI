"use client";

import { useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  apply_url: string;
  posted_at: string;
  description: string;
};

// Placeholder jobs — will be replaced with API data once Adzuna keys are added
const PLACEHOLDER_JOBS: Job[] = [
  {
    id: "1",
    title: "Junior Software Developer",
    company: "TCS",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹4–6 LPA",
    apply_url: "https://www.tcs.com/careers",
    posted_at: "2025-01-20",
    description:
      "Work on enterprise software solutions. React, Node.js experience preferred.",
  },
  {
    id: "2",
    title: "Data Entry Operator",
    company: "Government of Bihar",
    location: "Patna",
    type: "Government",
    salary: "₹18,000/month",
    apply_url: "https://bssc.bihar.gov.in",
    posted_at: "2025-01-18",
    description:
      "Data entry and record management for state government department.",
  },
  {
    id: "3",
    title: "Frontend Intern",
    company: "Startup India",
    location: "Remote",
    type: "Internship",
    salary: "₹10,000/month",
    apply_url: "https://internshala.com",
    posted_at: "2025-01-19",
    description:
      "Build UI components using React and Tailwind CSS. 3 month internship.",
  },
  {
    id: "4",
    title: "Bank PO",
    company: "State Bank of India",
    location: "All India",
    type: "Government",
    salary: "₹36,000/month",
    apply_url: "https://sbi.co.in/careers",
    posted_at: "2025-01-15",
    description:
      "Probationary Officer recruitment. Graduation required. IBPS exam.",
  },
  {
    id: "5",
    title: "Content Writer",
    company: "Times Internet",
    location: "Remote",
    type: "Full Time",
    salary: "₹3–4 LPA",
    apply_url: "https://timesinternet.in",
    posted_at: "2025-01-21",
    description:
      "Write articles and blogs in Hindi and English for news platforms.",
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Full Time": "bg-blue-50 text-blue-700 border-blue-200",
  Government: "bg-orange-50 text-orange-700 border-orange-200",
  Internship: "bg-purple-50 text-purple-700 border-purple-200",
  "Part Time": "bg-gray-50 text-gray-700 border-gray-200",
};

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const types = ["All", "Full Time", "Government", "Internship", "Part Time"];

  const filtered = PLACEHOLDER_JOBS.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || job.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Job Board</h1>
        <p className="text-sm text-gray-500">
          Government and private job listings across India
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, company or location..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              typeFilter === t
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 mb-4">{filtered.length} jobs found</p>

      {/* Job cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No jobs found for your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500">
                    {job.company} · {job.location}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${TYPE_COLORS[job.type] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                >
                  {job.type}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{job.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {job.salary && (
                    <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      {job.salary}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(job.posted_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
                >
                  Apply →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
