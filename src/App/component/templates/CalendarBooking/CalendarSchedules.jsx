import FullCalendar from "@fullcalendar/react"; // must go before plugins
// vs-code-organize-imports-disable-next-line
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Calender } from "Assets/script/js/Calender";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
// import { events } from "App/Utils/CalenderEvents";

const CaledarSchedules = ({ bookings }) => {
  const [events, setEvents] = useState([]);
  console.log(bookings);
  useEffect(() => {
    document.querySelector(".fc-prev-button").setAttribute("id", "calender-prev-button");
    document.querySelector(".fc-next-button").setAttribute("id", "calender-next-button");
    Calender();
  }, []);

  useEffect(() => {
    bookings &&
      setEvents(
        bookings.map((booking) => ({
          title: booking?.calendarEvent?.title,
          date: DateTime.fromISO(booking?.time).toFormat("yyyy-MM-dd HH:mm"),
          // end: getDate("YEAR-MONTH-07")
          url: "#"
        }))
      );
  }, [bookings?.length]);

  return (
    <div className="bottom-calender-area grid-col-4" style={{ marginTop: 40 }}>
      <div style={{ background: "#fff" }}>
        <div className="box calender stagger">
          <div className="calender-top">
            <label
              htmlFor="calender-prev-button"
              className="icon-wrapper"
              id="calender-back-icon-wrapper"
            >
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 1.5L2 8.5L9 15.5" stroke="#282D4A" strokeWidth="1.6" />
              </svg>
            </label>
            <strong className="Calender-DateTime">Dec, 2021</strong>
            <label
              htmlFor="calender-next-button"
              className="icon-wrapper"
              id="calender-towards-icon-wrapper"
            >
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1.5L8 8.5L1 15.5" stroke="#282D4A" strokeWidth="1.6" />
              </svg>
            </label>
          </div>
          <div className="calender-days-name">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
          <div className="calender-days"></div>
        </div>

        <div className="bottom-after-calender">
          <h3>Scheduled Lists</h3>
          <ul>
            {events.map((event, index) => (
              <li key={String(index)}>{event.title}</li>
            ))}
          </ul>
        </div>
      </div>

      <div id="calender">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventColor="#7822e624"
          eventMouseEnter={({ event, el }) => {
            // console.log({ event: event.toJSON(), el });
          }}
        />
      </div>
    </div>
  );
};

export default CaledarSchedules;
