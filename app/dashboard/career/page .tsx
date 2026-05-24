"use client";

import { useState } from "react";

type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  resources: string[];
  duration: string;
};

type Roadmap = {
  steps: RoadmapStep[];
  total_duration: string;
  free_resources: string[];
};

export default function CareerPage() {
  const [goal, setGoal] = useState("");
  const [education, setEducation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, education, timeline }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRoadmap(data.roadmap);
    } catch (err: any) {
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Career Roadmap</h1>
        <p className="text-sm text-gray-500">
          Get a personalized step-by-step career plan powered by AI
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleGenerate}
        className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Career Goal
          </label>
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Software Engineer, IAS Officer, CA, Data Scientist"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Current Education
          </label>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Select education</option>
            <option value="10th pass">10th Pass</option>
            <option value="12th pass">12th Pass</option>
            <option value="graduate">Graduate</option>
            <option value="postgraduate">Post Graduate</option>
            <option value="dropout">Dropped Out</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">Select timeline</option>
            <option value="6 months">6 Months</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Years</option>
            <option value="3-5 years">3–5 Years</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Generating your roadmap..." : "Generate Roadmap →"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {/* Roadmap Result */}
      {roadmap && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Your Roadmap</h2>
            <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full">
              Total: {roadmap.total_duration}
            </span>
          </div>

          {/* Steps */}
          {roadmap.steps.map((step, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                    <span className="text-xs text-gray-400">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {step.description}
                  </p>

                  {step.resources?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        Free Resources:
                      </p>
                      <ul className="space-y-1">
                        {step.resources.map((r, j) => (
                          <li
                            key={j}
                            className="text-xs text-gray-600 flex items-start gap-1"
                          >
                            <span className="text-orange-400 mt-0.5">→</span>{" "}
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Free Resources */}
          {roadmap.free_resources?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Additional Free Resources
              </h3>
              <ul className="space-y-1">
                {roadmap.free_resources.map((r, i) => (
                  <li
                    key={i}
                    className="text-xs text-green-700 flex items-start gap-1"
                  >
                    <span className="mt-0.5">✓</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
