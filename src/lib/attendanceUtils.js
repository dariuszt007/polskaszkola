export function calculateAttendanceStats(events, subjects) {
  return subjects.map((subject) => {
    const subjectEvents = events.filter((e) => e.subjectId === subject.id);
    const present = subjectEvents.filter((e) => e.attendance === "present").length;
    const absent = subjectEvents.filter((e) => e.attendance === "absent").length;
    const total = subjectEvents.length;
    const percentage = total ? Math.round((present / total) * 100) : 0;

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      color: subject.color,
      total,
      present,
      absent,
      percentage
    };
  });
}
