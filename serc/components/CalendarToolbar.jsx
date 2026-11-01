export default function CalendarToolbar({
  title,
  currentView,
  onPrev,
  onNext,
  onToday,
  onChangeView
}) {
  return (
    <div className="sticky top-0 z-20 rounded-[24px] bg-white/90 p-3 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onPrev}
          className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98]"
        >
          Wstecz
        </button>

        <div className="min-w-0 flex-1 px-2 text-center text-base font-extrabold text-slate-900 sm:text-lg">
          <span className="block truncate">{title}</span>
        </div>

        <button
          onClick={onNext}
          className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98]"
        >
          Dalej
        </button>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          onClick={onToday}
          className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition active:scale-[0.98]"
        >
          Dziś
        </button>

        <button
          onClick={() => onChangeView("dayGridMonth")}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            currentView === "dayGridMonth"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          Miesiąc
        </button>

        <button
          onClick={() => onChangeView("timeGridWeek")}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            currentView === "timeGridWeek"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          Tydzień
        </button>
      </div>
    </div>
  );
}
