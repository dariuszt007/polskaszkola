export default function ReminderSelector({ options, selected, onChange }) {
  const toggleReminder = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value].sort((a, b) => a - b));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const active = selected.includes(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => toggleReminder(option)}
            className={`rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition ${
              active
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {option === 1440 ? "1 dzień wcześniej" : `${option} min wcześniej`}
          </button>
        );
      })}
    </div>
  );
}
