import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ onUpload }) {
  const { user, logout } = useAuth();
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2">☰</button>
        <div className="text-lg font-semibold">Contracts</div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onUpload} className="px-3 py-2 bg-green-600 text-white rounded">Upload</button>
        <div className="flex items-center gap-3">
          <div className="text-sm">{user?.username}</div>
          <button onClick={logout} className="text-sm text-red-600">Logout</button>
        </div>
      </div>
    </header>
  );
}
