import React from "react";

export default function Filters({ status, risk, setStatus, setRisk }) {
  return (
    <div className="flex gap-3 items-center">
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded p-2">
        <option>All</option>
        <option>Active</option>
        <option>Expired</option>
        <option>Renewal Due</option>
      </select>

      <select value={risk} onChange={(e) => setRisk(e.target.value)} className="border rounded p-2">
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>
  );
}
