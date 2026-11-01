import { DateTime } from "luxon";

export function getLessonStartDateTime(event) {
  return DateTime.fromISO(`${event.lessonDate}T${event.lessonStartTime}`, {
    zone: event.lessonTimezone
  });
}

export function getLessonEndDateTime(event) {
  return getLessonStartDateTime(event).plus({
    minutes: event.durationMinutes || 45
  });
}

export function getLocalStartDateTime(event) {
  return getLessonStartDateTime(event).setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

export function getLocalEndDateTime(event) {
  return getLessonEndDateTime(event).setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

export function formatLocalRange(event) {
  const start = getLocalStartDateTime(event);
  const end = getLocalEndDateTime(event);
  return `${start.toFormat("dd.LL.yyyy HH:mm")} - ${end.toFormat("HH:mm")}`;
}

export function formatOriginalRange(event) {
  const start = getLessonStartDateTime(event);
  const end = getLessonEndDateTime(event);
  return `${start.toFormat("dd.LL.yyyy HH:mm")} - ${end.toFormat("HH:mm")}`;
}

export function calculateEndTime(startTime, durationMinutes = 45) {
  const base = DateTime.fromFormat(startTime, "HH:mm");
  return base.plus({ minutes: durationMinutes }).toFormat("HH:mm");
}

export function generateEventId() {
  return `lesson-${Date.now()}`;
}
