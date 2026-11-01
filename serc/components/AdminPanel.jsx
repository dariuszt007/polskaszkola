import SubjectForm from "./SubjectForm";
import EventForm from "./EventForm";
import StatsPanel from "./StatsPanel";
import CsvExportPanel from "./CsvExportPanel";
import IcsExportPanel from "./IcsExportPanel";
import JsonToolsPanel from "./JsonToolsPanel";

export default function AdminPanel({
  subjects,
  events,
  settings,
  onAddSubject,
  onSaveEvent,
  editingEvent,
  onCancelEdit,
  onDeleteEvent,
  onEditEvent
}) {
  return (
    <div className="space-y-4">
      <SubjectForm onAdd={onAddSubject} />

      <EventForm
        subjects={subjects}
        timezones={settings.availableTimezones}
        reminderOptions={settings.availableReminders}
        onSave={onSaveEvent}
        editingEvent={editingEvent}
        onCancelEdit={onCancelEdit}
      />

      <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <div className="mb-4">
          <div className="text-lg font-extrabold text-slate-900">Lista lekcji</div>
          <div className="text-sm text-slate-500">
            Szybki podgląd wszystkich zapisanych wydarzeń.
          </div>
        </div>

        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
              Brak lekcji.
            </div>
          ) : (
            events.map((event) => {
              const subject = subjects.find((s) => s.id === event.subjectId);

              return (
                <div
                  key={event.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: subject?.color || "#3b82f6" }}
                        />
                        <div className="truncate font-bold text-slate-900">
                          {subject?.name || event.title}
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-slate-600">
                        {event.lessonDate} • {event.lessonStartTime} • {event.lessonTimezone}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">
                          45 min
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            event.attendance === "present"
                              ? "bg-emerald-100 text-emerald-700"
                              : event.attendance === "absent"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {event.attendance === "present"
                            ? "Obecny"
                            : event.attendance === "absent"
                            ? "Nieobecny"
                            : "Nieustawione"}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <button
                        onClick={() => onEditEvent(event)}
                        className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white"
                      >
                        Edytuj
                      </button>
                      <button
                        onClick={() => onDeleteEvent(event.id)}
                        className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600"
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <StatsPanel events={events} subjects={subjects} />
      <CsvExportPanel events={events} subjects={subjects} />
      <IcsExportPanel events={events} subjects={subjects} />
      <JsonToolsPanel subjects={subjects} events={events} settings={settings} />
    </div>
  );
}
