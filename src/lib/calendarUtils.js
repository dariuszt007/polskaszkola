import { getLessonStartDateTime, getLessonEndDateTime } from "./dateUtils";

export function mapEventsToCalendar(events, subjects) {
  return events.map((event) => {
    const subject = subjects.find((s) => s.id === event.subjectId);
    const start = getLessonStartDateTime(event).toUTC().toISO();
    const end = getLessonEndDateTime(event).toUTC().toISO();

    return {
      id: event.id,
      title: event.title,
      start,
      end,
      backgroundColor: subject?.color || "#3b82f6",
      extendedProps: {
        rawEvent: event,
        subject
      }
    };
  });
}
