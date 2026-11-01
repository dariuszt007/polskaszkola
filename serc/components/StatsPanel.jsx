import { calculateAttendanceStats } from "../lib/attendanceUtils";

export default function StatsPanel({ events, subjects }) {
  const stats = calculateAttendanceStats(events, subjects);

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4">
        <div className="text-lg font-extrabold text-slate-900">Statystyki obecności</div>
        <div className="text-sm text-slate-500">Podział według przedmiotów.</div>
      </div>

      <div className="space-y-3">
        {stats.map((item) => (
          <div
            key={item.subjectId}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <div className="font-bold text-slate-900">{item.subjectName}</div>
              </div>

              <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white">
                {item.percentage}%
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-xl bg-white p-3 text-slate-700">
                <div className="text-xs font-bold uppercase text-slate-400">Wszystkie</div>
                <div className="mt-1 text-base font-bold text-slate-900">{item.total}</div>
              </div>
              <div className="rounded-xl bg-white p-3 text-slate-700">
                <div className="text-xs font-bold uppercase text-slate-400">Obecny</div>
                <div className="mt-1 text-base font-bold text-emerald-600">{item.present}</div>
              </div>
              <div className="rounded-xl bg-white p-3 text-slate-700">
                <div className="text-xs font-bold uppercase text-slate-400">Nieobecny</div>
                <div className="mt-1 text-base font-bold text-rose-600">{item.absent}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
