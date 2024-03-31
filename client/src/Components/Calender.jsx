import React, { useRef, useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    handleDateSet({
      start: calendarRef.current.getApi().view.activeStart,
      end: calendarRef.current.getApi().view.activeEnd
    });
  }, []);

  async function handleEventAdd(data) {
   axios.post("/api/calender/create-event", data.event)
  .then(response => {
    
    console.log("Event created successfully:", response.data);
  })
  .catch(error => {
    
    console.error("Error creating event:", error);
  });

  }

  async function handleDateSet(data) {
    const response = await axios.get(
      "/api/calender/get-events?start=" + moment(data.start).toString() +
      "&end=" + moment(data.end).toString()
    );
    setEvents(response.data);
  }
  


  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    });
    setModalOpen(false);
  };

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDateSet(date)}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={onEventAdded}
      />
    </section>
  );
};

export default Calendar;
