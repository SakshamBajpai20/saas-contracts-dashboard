import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { to: "/dashboard", label: "Contracts" },
    { to: "/dashboard#insights", label: "Insights" },
    { to: "/dashboard#reports", label: "Reports" },
    { to: "/dashboard#settings", label: "Settings" }
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:block">
      <div className="mb-6">
        <h2 className="text-xl font-bold">SaaS Contracts</h2>
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>
      <nav className="space-y-2">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({isActive}) => "block p-2 rounded " + (isActive ? "bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50")}
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
