import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ClauseCard from "../components/ClauseCard";

export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("/contracts.json")
      .then(res => {
        const found = res.data.find(c => c.id === id);
        if (!found) throw new Error("Contract not found");
        // Add full detail structure (could be fetched separately)
        setContract({
          ...found,
          clauses: [
            { title: "Termination", summary: "90 days notice period.", confidence: 0.82 },
            { title: "Liability Cap", summary: "12 months’ fees limit.", confidence: 0.87 }
          ],
          insights: [
            { risk: "High", message: "Liability cap excludes data breach costs." },
            { risk: "Medium", message: "Renewal auto-renews unless cancelled 60 days before expiry." }
          ],
          evidence: [
            { source: "Section 12.2", snippet: "Total liability limited to 12 months’ fees.", relevance: 0.91 }
          ]
        });
      })
      .catch(err => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">← Back</Link>
      <h1 className="text-2xl font-bold mt-2">{contract.name}</h1>
      <p className="text-gray-600">{contract.parties}</p>
      <div className="mt-3 flex gap-4 items-center">
        <div>Status: <b>{contract.status}</b></div>
        <div>Risk: <b>{contract.risk}</b></div>
        <div>Expiry: <b>{contract.expiry}</b></div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Clauses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {contract.clauses.map((c, i) => <ClauseCard key={i} {...c} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">AI Insights</h2>
        <ul className="mt-3 space-y-2">
          {contract.insights.map((ins, i) => (
            <li key={i} className="p-3 border rounded bg-white">
              <span className="font-semibold mr-2">{ins.risk}</span>
              <span>{ins.message}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Evidence</h2>
        <div className="mt-3 p-4 border rounded bg-gray-50">
          {contract.evidence.map((e, i) => (
            <div key={i} className="mb-3">
              <div className="font-semibold">{e.source} <span className="text-sm text-gray-500">({Math.round(e.relevance*100)}%)</span></div>
              <div className="text-gray-700">{e.snippet}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


