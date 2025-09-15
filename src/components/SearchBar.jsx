import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 w-full md:w-1/2">
      <input
        placeholder="Search contracts or parties..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button onClick={() => onChange("")} className="px-3 py-2 border rounded">Clear</button>
    </div>
  );
}
