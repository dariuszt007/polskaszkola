import { buildEventsCsv } from "../lib/csvExport";

export default function CsvExportPanel({ events, subjects }) {
  const downloadCsv = () => {
    const csv = buildEventsCsv(events, subjects);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lessons.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4">
        <div className="text-lg font-extrabold text-slate-900">Eksport CSV</div>
        <div className="text-sm text-slate-500">
          Pobierz lekcje i dane obecności do pliku CSV.
        </div>
      </div>

      <button
        onClick={downloadCsv}
        className="w-full rounded-2xl bg-emerald-600 px-4 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition active:scale-[0.99]"
      >
        Pobierz CSV
      </button>
    </div>
  );
}
