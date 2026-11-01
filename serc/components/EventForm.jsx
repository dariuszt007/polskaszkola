import { useEffect, useState } from "react";
import { calculateEndTime, generateEventId } from "../lib/dateUtils";
import ReminderSelector from "./ReminderSelector";
import TimezoneSelector from "./TimezoneSelector";

const emptyForm = {
  id: "",
  subjectId: "",
  title: "",
  lessonDate: "",
  lessonStartTime: "",
  lessonTimezone: "Europe/Warsaw",
  durationMinutes: 45,
  attendance: "present",
  reminders: [],
  notes: ""
};

export default function EventForm({
  subjects,
  timezones,
  reminderOptions,
  onSave,
  editingEvent,
  onCancelEdit
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingEvent) {
      setForm(editingEvent);
    } else {
      setForm({
        ...emptyForm,
        subjectId: subjects[0]?.id || "",
        title: subjects[0]?.name || "",
        lessonTimezone: timezones[0] || "Europe/Warsaw",
        attendance: "present"
      });
    }
  }, [editingEvent, subjects, timezones]);

  const onSubjectChange = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    setForm((prev) => ({
      ...prev,
      subjectId,
      title: subject?.name || ""
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.subjectId || !form.lessonDate || !form.lessonStartTime) return;

    onSave({
      ...form,
      id: form.id || generateEventId(),
      durationMinutes: 45
    });

    if (!editingEvent) {
      setForm({
        ...emptyForm,
        subjectId: subjects[0]?.id || "",
        title: subjects[0]?.name || "",
        lessonTimezone: timezones[0] || "Europe/Warsaw",
        attendance: "present"
      });
    }
  };

  const endTime = form.lessonStartTime
    ? calculateEndTime(form.lessonStartTime, 45)
    : "--:--";

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-slate-900">
            {editingEvent ? "Edytuj lekcję" : "Dodaj lekcję"}
          </div>
          <div className="text-sm text-slate-500">
            Ustawiasz tylko godzinę startu. Koniec liczy się automatycznie.
          </div>
        </div>

        {editingEvent && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Anuluj
          </button>
        )}
      </div>

      <div className="grid gap-3">
        <select
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          value={form.subjectId}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="date"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            value={form.lessonDate}
            onChange={(e) => setForm({ ...form, lessonDate: e.target.value })}
          />

          <input
            type="time"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            value={form.lessonStartTime}
            onChange={(e) => setForm({ ...form, lessonStartTime: e.target.value })}
          />
        </div>

        <TimezoneSelector
          value={form.lessonTimezone}
          options={timezones}
          onChange={(value) => setForm({ ...form, lessonTimezone: value })}
        />

        <select
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          value={form.attendance}
          onChange={(e) => setForm({ ...form, attendance: e.target.value })}
        >
          <option value="present">Obecny</option>
          <option value="absent">Nieobecny</option>
          <option value="unknown">Nieustawione</option>
        </select>

        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="mb-2 text-sm font-bold text-slate-700">Alarmy</div>
          <ReminderSelector
            options={reminderOptions}
            selected={form.reminders}
            onChange={(reminders) => setForm({ ...form, reminders })}
          />
        </div>

        <textarea
          rows="4"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="Notatka"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <div className="rounded-2xl bg-blue-50 p-4">
          <div className="text-sm font-bold text-blue-700">Podgląd lekcji</div>
          <div className="mt-2 grid gap-1 text-sm text-slate-700">
            <div>
              Start: <span className="font-bold">{form.lessonStartTime || "--:--"}</span>
            </div>
            <div>
              Koniec: <span className="font-bold">{endTime}</span>
            </div>
            <div>
              Czas trwania: <span className="font-bold">45 min</span>
            </div>
          </div>
        </div>

        <button className="w-full rounded-2xl bg-blue-600 px-4 py-4 font-bold text-white shadow-lg shadow-blue-200 transition active:scale-[0.99]">
          {editingEvent ? "Zapisz zmiany" : "Dodaj lekcję"}
        </button>
      </div>
    </form>
  );
}
