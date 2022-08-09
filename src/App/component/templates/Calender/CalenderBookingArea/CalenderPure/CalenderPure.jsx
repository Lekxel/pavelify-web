import { useEffect } from "react";
import { CalenderJs } from "./event/calender";

export const CalenderPure = ({ data: { setDate, date, event, calendarClicked } }) => {
  useEffect(() => {
    CalenderJs(date, setDate, event, calendarClicked);
  }, [event?.availableDays, new Date(date).getDate()]);
  return (
    <div className="box calender stagger">
      <div className="calender-top">
        <div className="icon-wrapper" id="calender-back-icon-wrapper">
          <i className="fas fa-arrow-left"></i>
        </div>
        <strong className="Calender-DateTime">Dec, 2021</strong>
        <div className="icon-wrapper" id="calender-towards-icon-wrapper">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
      <div className="calender-days-name">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thur</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
      <div className="calender-days"></div>
    </div>
  );
};
