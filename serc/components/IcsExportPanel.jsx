import { buildICS } from "../lib/icsExport";

export default function IcsExportPanel({ events, subjects }) {
  const downloadIcs = () => {
    const ics = buildICS(events, subjects);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lessons.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4">
        <div className="text-lg font-extrabold text-slate-900">
          Eksport do kalendarza iPhone
        </div>
        <div className="text-sm text-slate-500">
          Pobierz plik `.ics` i otwórz go na iPhonie, aby dodać lekcje do Apple
          Calendar.
        </div>
      </div>

      <button
        onClick={downloadIcs}
        className="w-full rounded-2xl bg-violet-600 px-4 py-4 font-bold text-white shadow-lg shadow-violet-200 transition active:scale-[0.99]"
      >
        Pobierz ICS
      </button>
    </div>
  );
}
