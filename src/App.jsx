import { useEffect, useMemo, useState } from "react";
import CalendarView from "./components/CalendarView";
import EventModal from "./components/EventModal";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [subjects, setSubjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState({
    defaultDurationMinutes: 45,
    defaultView: "timeGridWeek",
    availableTimezones: ["Europe/Warsaw", "Asia/Tokyo"],
    availableReminders: [5, 10, 15, 30, 39, 60, 1440]
  });

  const [mode, setMode] = useState("view");
  const [currentView, setCurrentView] = useState("timeGridWeek");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [subjectsRes, eventsRes, settingsRes] = await Promise.all([
        fetch("/data/subjects.json"),
        fetch("/data/events.json"),
        fetch("/data/settings.json")
      ]);

      const subjectsData = await subjectsRes.json();
      const eventsData = await eventsRes.json();
      const settingsData = await settingsRes.json();

      setSubjects(subjectsData);
      setEvents(eventsData);
      setSettings(settingsData);
      setCurrentView(settingsData.defaultView || "timeGridWeek");
    }

    loadData();
  }, []);

  const selectedSubject = useMemo(() => {
    if (!selectedEvent) return null;
    return subjects.find((s) => s.id === selectedEvent.subjectId);
  }, [selectedEvent, subjects]);

  const addSubject = (subject) => {
    if (subjects.some((s) => s.id === subject.id)) {
      alert("Przedmiot o takim ID już istnieje.");
      return;
    }
    setSubjects((prev) => [...prev, subject]);
  };

  const saveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [...prev, event].sort((a, b) => {
        const aKey = `${a.lessonDate} ${a.lessonStartTime}`;
        const bKey = `${b.lessonDate} ${b.lessonStartTime}`;
        return aKey.localeCompare(bKey);
      });
    });

    setEditingEvent(null);
    setMode("admin");
  };

  const deleteEvent = (id) => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć tę lekcję?");
    if (!confirmed) return;

    setEvents((prev) => prev.filter((event) => event.id !== id));
    if (selectedEvent?.id === id) setSelectedEvent(null);
    if (editingEvent?.id === id) setEditingEvent(null);
  };

  const openEditFromModal = (event) => {
    setSelectedEvent(null);
    setEditingEvent(event);
    setMode("admin");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-6xl px-3 pb-28 pt-3 sm:px-4">
        <div className="mb-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-extrabold tracking-tight">
                Kalendarz lekcji
              </div>
              <div className="mt-2 max-w-2xl text-sm text-blue-100">
                Czytelny widok na telefonie, strefy czasowe, obecność, eksport CSV,
                eksport ICS na iPhone i generowanie JSON do repozytorium.
              </div>
            </div>

            <div className="rounded-2xl bg-white/15 px-3 py-2 text-right text-xs font-medium backdrop-blur">
              <div>Tryb pracy</div>
              <div className="mt-1 text-sm font-bold text-white">
                {mode === "view" ? "Podgląd" : "Administrator"}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-sm">
          <button
            onClick={() => setMode("view")}
            className={`rounded-2xl px-4 py-3 font-semibold transition ${
              mode === "view"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-transparent text-slate-600"
            }`}
          >
            View
          </button>
          <button
            onClick={() => setMode("admin")}
            className={`rounded-2xl px-4 py-3 font-semibold transition ${
              mode === "admin"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-transparent text-slate-600"
            }`}
          >
            Admin
          </button>
        </div>

        {mode === "view" ? (
          <CalendarView
            events={events}
            subjects={subjects}
            currentView={currentView}
            setCurrentView={setCurrentView}
            onEventClick={setSelectedEvent}
          />
        ) : (
          <AdminPanel
            subjects={subjects}
            events={events}
            settings={settings}
            onAddSubject={addSubject}
            onSaveEvent={saveEvent}
            editingEvent={editingEvent}
            onCancelEdit={() => setEditingEvent(null)}
            onDeleteEvent={deleteEvent}
            onEditEvent={setEditingEvent}
          />
        )}
      </div>

      <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 px-3 py-3 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
          <button
            onClick={() => setMode("view")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              mode === "view"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Kalendarz
          </button>
          <button
            onClick={() => setMode("admin")}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              mode === "admin"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Panel admina
          </button>
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        subject={selectedSubject}
        onClose={() => setSelectedEvent(null)}
        onEdit={openEditFromModal}
      />
    </div>
  );
}
