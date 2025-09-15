import React, { useCallback, useState } from "react";

function FileRow({ file, onRetry }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div>
        <div className="font-medium">{file.name}</div>
        <div className="text-sm text-gray-500">{file.status}</div>
      </div>
      <div>
        {file.status === "Error" && <button onClick={onRetry} className="text-sm text-blue-600">Retry</button>}
      </div>
    </div>
  );
}

export default function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);

  const handleFiles = useCallback((fileList) => {
    const arr = Array.from(fileList).map(f => ({ id: crypto.randomUUID ? crypto.randomUUID() : Date.now()+Math.random(), name: f.name, status: "Uploading" }));
    setFiles(prev => [...arr, ...prev]);

    arr.forEach((f, idx) => {
      // simulate upload time / random failure
      setTimeout(() => {
        const success = Math.random() > 0.15;
        setFiles(prev => prev.map(p => p.id === f.id ? { ...p, status: success ? "Success" : "Error" } : p));
      }, 800 + Math.random()*1500);
    });
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onBrowse = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const retry = (id) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "Uploading" } : f));
    setTimeout(() => {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, status: "Success" } : f));
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Files</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div
          onDrop={onDrop}
          onDragOver={(e)=>e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded p-6 text-center mb-4"
        >
          <p className="mb-2">Drag & drop files, or</p>
          <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
            Browse
            <input type="file" multiple onChange={onBrowse} className="hidden" />
          </label>
        </div>

        <div className="space-y-2 max-h-60 overflow-auto">
          {files.length === 0 && <div className="text-gray-500">No files uploaded yet.</div>}
          {files.map(f => <FileRow key={f.id} file={f} onRetry={() => retry(f.id)} />)}
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">Done</button>
        </div>
      </div>
    </div>
  );
}
