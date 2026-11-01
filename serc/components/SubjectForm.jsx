import { useState } from "react";

const emptySubject = {
  id: "",
  name: "",
  color: "#3b82f6",
  plannedCount: 1
};

export default function SubjectForm({ onAdd }) {
  const [form, setForm] = useState(emptySubject);

  const submit = (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim()) return;

    onAdd({
      ...form,
      id: form.id.trim(),
      name: form.name.trim(),
      plannedCount: Number(form.plannedCount || 0)
    });

    setForm(emptySubject);
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-extrabold text-slate-900">Przedmioty</div>
          <div className="text-sm text-slate-500">Dodaj nowy przedmiot do listy.</div>
        </div>
        <div className="rounded-2xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
          Nowy
        </div>
      </div>

      <div className="grid gap-3">
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="ID, np. matematyka"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />

        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
          placeholder="Nazwa przedmiotu"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="grid grid-cols-[1fr,120px] gap-3">
          <input
            type="number"
            min="0"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            placeholder="Planowana liczba lekcji"
            value={form.plannedCount}
            onChange={(e) => setForm({ ...form, plannedCount: e.target.value })}
          />

          <input
            type="color"
            className="h-[50px] w-full rounded-2xl border border-slate-200 bg-white px-2 py-2"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </div>

        <button className="mt-1 w-full rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white shadow-sm transition active:scale-[0.99]">
          Dodaj przedmiot
        </button>
      </div>
    </form>
  );
}
