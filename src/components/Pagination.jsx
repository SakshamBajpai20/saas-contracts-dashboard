import React from "react";

export default function Pagination({ current, totalItems, perPage, onPage }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const prev = () => onPage(Math.max(1, current - 1));
  const next = () => onPage(Math.min(totalPages, current + 1));
  if (totalPages === 1) return null;

  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} className="px-3 py-1 border rounded">Prev</button>
      <div className="px-3 py-1 border rounded">{current} / {totalPages}</div>
      <button onClick={next} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
