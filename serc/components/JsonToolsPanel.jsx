import { useState } from "react";
import { buildPrettyJson } from "../lib/jsonGenerator";

export default function JsonToolsPanel({ subjects, events, settings }) {
  const [activeTab, setActiveTab] = useState("events");

  const fileMap = {
    subjects,
    events,
    settings
  };

  const currentJson = buildPrettyJson(fileMap[activeTab]);

  const copyJson = async () => {
    await navigator.clipboard.writeText(currentJson);
    alert("Skopiowano JSON do schowka");
  };

  const downloadJson = () => {
    const blob = new Blob([currentJson], {
      type: "application/json;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4">
        <div className="text-lg font-extrabold text-slate-900">JSON do GitHub</div>
        <div className="text-sm text-slate-500">
          Generuj pełną zawartość plików i wklej ją ręcznie do repozytorium.
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2">
        {["subjects", "events", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl px-3 py-2 text-sm font-bold transition ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : "bg-transparent text-slate-600"
            }`}
          >
            {tab}.json
          </button>
        ))}
      </div>

      <textarea
        readOnly
        value={currentJson}
        className="min-h-[240px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 outline-none"
      />

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={copyJson}
          className="rounded-2xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-200 transition active:scale-[0.99]"
        >
          Kopiuj JSON
        </button>
        <button
          onClick={downloadJson}
          className="rounded-2xl bg-slate-900 px-4 py-4 font-bold text-white transition active:scale-[0.99]"
        >
          Pobierz plik
        </button>
      </div>
    </div>
  );
}
