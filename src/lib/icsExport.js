import { getLessonEndDateTime, getLessonStartDateTime } from "./dateUtils";

function formatICSDate(dt) {
  return dt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

function escapeText(text = "") {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildICS(events, subjects) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lesson Calendar//PL//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  events.forEach((event) => {
    const subject = subjects.find((s) => s.id === event.subjectId);
    const start = getLessonStartDateTime(event);
    const end = getLessonEndDateTime(event);
    const description = [
      `Obecność: ${event.attendance || "unknown"}`,
      `Strefa lekcji: ${event.lessonTimezone}`,
      event.notes ? `Notatka: ${event.notes}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.id}@twoj-kalendarz`);
    lines.push(`DTSTAMP:${formatICSDate(start)}`);
    lines.push(`DTSTART:${formatICSDate(start)}`);
    lines.push(`DTEND:${formatICSDate(end)}`);
    lines.push(`SUMMARY:${escapeText(subject?.name || event.title)}`);
    lines.push(`DESCRIPTION:${escapeText(description)}`);

    (event.reminders || []).forEach((minutes) => {
      lines.push("BEGIN:VALARM");
      lines.push("ACTION:DISPLAY");
      lines.push(`DESCRIPTION:${escapeText(subject?.name || event.title)}`);
      lines.push(`TRIGGER:-PT${minutes}M`);
      lines.push("END:VALARM");
    });

    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
