import { getLessonEndDateTime, getLessonStartDateTime } from "./dateUtils";

function escapeCsv(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildEventsCsv(events, subjects) {
  const headers = [
    "id",
    "subject",
    "date",
    "startTime",
    "endTime",
    "timezone",
    "attendance",
    "reminders",
    "notes"
  ];

  const rows = events.map((event) => {
    const subject = subjects.find((s) => s.id === event.subjectId);
    const start = getLessonStartDateTime(event);
    const end = getLessonEndDateTime(event);

    return [
      event.id,
      subject?.name || event.title,
      event.lessonDate,
      start.toFormat("HH:mm"),
      end.toFormat("HH:mm"),
      event.lessonTimezone,
      event.attendance,
      (event.reminders || []).join("|"),
      event.notes || ""
    ];
  });

  return [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");
}
