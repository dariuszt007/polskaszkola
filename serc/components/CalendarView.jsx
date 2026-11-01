import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { mapEventsToCalendar } from "../lib/calendarUtils";
import CalendarToolbar from "./CalendarToolbar";

export default function CalendarView({
  events,
  subjects,
  currentView,
  setCurrentView,
  onEventClick
}) {
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");

  const calendarEvents = mapEventsToCalendar(events, subjects);

  const updateTitle = () => {
    const api = calendarRef.current?.getApi();
    if (api) setTitle(api.view.title);
  };

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(currentView);
      setTimeout(updateTitle, 0);
    }
  }, [currentView]);

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
    updateTitle();
  };

  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
    updateTitle();
  };

  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    updateTitle();
  };

  const handleChangeView = (viewName) => {
    setCurrentView(viewName);
  };

  return (
    <div className="space-y-3">
      <CalendarToolbar
        title={title}
        currentView={currentView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onChangeView={handleChangeView}
      />

      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white p-2 shadow-sm">
        <div className="rounded-[22px] bg-slate-50 p-2">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            headerToolbar={false}
            height="auto"
            locale="pl"
            allDaySlot={false}
            slotMinTime="06:00:00"
            slotMaxTime="23:00:00"
            events={calendarEvents}
            dayMaxEvents={3}
            expandRows={true}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}
            eventClick={(info) => onEventClick(info.event.extendedProps.rawEvent)}
            datesSet={updateTitle}
          />
        </div>
      </div>
    </div>
  );
}
