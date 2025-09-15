import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(username, password);
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
        <label className="block mb-2">
          <span className="text-sm text-gray-700">Username</span>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="you@company.com"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-700">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="test123"
          />
        </label>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="mt-3 text-sm text-gray-500">
          Password for demo: <b>test123</b>
        </p>
      </form>
    </div>
  );
}



