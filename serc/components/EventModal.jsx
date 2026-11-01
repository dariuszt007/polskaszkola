import { formatLocalRange, formatOriginalRange } from "../lib/dateUtils";

export default function EventModal({ event, subject, onClose, onEdit }) {
  if (!event) return null;

  const attendanceLabel =
    event.attendance === "present"
      ? "Obecny"
      : event.attendance === "absent"
      ? "Nieobecny"
      : "Nieustawione";

  const attendanceClass =
    event.attendance === "present"
      ? "bg-emerald-100 text-emerald-700"
      : event.attendance === "absent"
      ? "bg-rose-100 text-rose-700"
      : "bg-slate-100 text-slate-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl">
        <div
          className="p-5 text-white"
          style={{
            background: `linear-gradient(135deg, ${subject?.color || "#3b82f6"}, #0f172a)`
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                Szczegóły lekcji
              </div>
              <div className="mt-2 text-2xl font-extrabold">
                {subject?.name || event.title}
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold text-white backdrop-blur"
            >
              Zamknij
            </button>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="grid gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Godzina lokalna urządzenia
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900">
                {formatLocalRange(event)}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Godzina ustawiona dla lekcji
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900">
                {formatOriginalRange(event)}
              </div>
              <div className="mt-1 text-sm text-slate-600">{event.lessonTimezone}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Obecność
              </div>
              <div
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${attendanceClass}`}
              >
                {attendanceLabel}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Czas trwania
              </div>
              <div className="mt-2 text-sm font-bold text-slate-900">
                {event.durationMinutes || 45} min
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Alarmy
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(event.reminders || []).length ? (
                event.reminders.map((r) => (
                  <span
                    key={r}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    {r === 1440 ? "1 dzień wcześniej" : `${r} min wcześniej`}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-600">Brak alarmów</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Notatka
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
              {event.notes || "Brak notatki"}
            </div>
          </div>

          <button
            onClick={() => onEdit(event)}
            className="w-full rounded-2xl bg-slate-900 px-4 py-4 font-bold text-white transition active:scale-[0.99]"
          >
            Edytuj lekcję
          </button>
        </div>
      </div>
    </div>
  );
}
