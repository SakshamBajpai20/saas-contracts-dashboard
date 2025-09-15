import React from "react";

export default function ClauseCard({ title, summary, confidence }) {
  const pct = Math.round((confidence ?? 0) * 100);
  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-gray-600">{pct}%</div>
      </div>
      <p className="text-gray-700 mt-2">{summary}</p>
    </div>
  );
}
