import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Filters from "./Filters";
import SearchBar from "./SearchBar";

export default function ContractTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    axios.get("/contracts.json")
      .then(res => setData(res.data))
      .catch(err => setError("Failed to load contracts"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let out = data.slice();
    if (statusFilter !== "All") out = out.filter(c => c.status === statusFilter);
    if (riskFilter !== "All") out = out.filter(c => c.risk === riskFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(c => (c.name + " " + c.parties).toLowerCase().includes(q));
    }
    return out.sort((a,b) => a.name.localeCompare(b.name));
  }, [data, statusFilter, riskFilter, query]);

  const total = filtered.length;
  const paged = filtered.slice((page-1)*perPage, page*perPage);

  useEffect(() => setPage(1), [statusFilter, riskFilter, query]);

  if (loading) return <div className="p-6">Loading contracts...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (data.length === 0) return <div className="p-6">No contracts yet</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} />
        <Filters
          status={statusFilter}
          risk={riskFilter}
          setStatus={setStatusFilter}
          setRisk={setRiskFilter}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600 border-b">
            <tr>
              <th className="py-2">Contract Name</th>
              <th className="py-2">Parties</th>
              <th className="py-2">Expiry</th>
              <th className="py-2">Status</th>
              <th className="py-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-3">
                  <Link to={`/contracts/${c.id}`} className="text-blue-600 hover:underline">
                    {c.name}
                  </Link>
                </td>
                <td>{c.parties}</td>
                <td>{c.expiry}</td>
                <td>{c.status}</td>
                <td>{c.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">{total} contracts</div>
        <Pagination current={page} totalItems={total} perPage={perPage} onPage={setPage} />
      </div>
    </div>
  );
}
