import { httpFetchBookings } from "api/calendar";
import BookingList from "App/component/templates/CalendarBooking/BookingList";
import CalendarSchedules from "App/component/templates/CalendarBooking/CalendarSchedules";
import LeftArrow from "Assets/img/left-contact.png";
import RightArrow from "Assets/img/right-contact.png";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { privateRoutes } from "routes/routes";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

const statuses = ["all", "upcoming", "past"];

function CalenderBooking() {
  const { status } = useParams() || { status: "all" };
  const navigate = useNavigate();
  const [isValidStatus, setIsValidStatus] = React.useState(false);

  const {
    data: { bookings, limit, page, total, totalEvents, totalBookings, totalPast, totalUpcoming },
    refetch
  } = useQuery(["bookings", status], () => httpFetchBookings(status), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalEvents: 0,
      totalBookings: 0,
      totalPast: 0,
      totalUpcoming: 0
    }
  });

  useEffect(() => {
    if (statuses.includes(status)) {
      setIsValidStatus(true);
    } else {
      setIsValidStatus(false);
    }
  }, [status]);

  const handleSelectForDelete = async (booking) => {};

  const renderComponent = () => {
    if (isValidStatus) {
      return <BookingList bookings={bookings} handleSelectForDelete={handleSelectForDelete} />;
    }
    return <CalendarSchedules bookings={bookings} />;
  };

  return (
    <div className="Contact EmailTickets CalenderBooking main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="calender" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="calender" page="Calendar Booking" />

        <div className="body-main-area">
          <div className="body-box" style={{ display: "block" }}>
            <div className="right-area">
              <ul className="navigation-bar d-flex-align-center">
                <li
                  onClick={() => navigate(`${privateRoutes.calendarBooking}/all`)}
                  className={`d-flex-align-center ${status === "all" ? "active" : ""}`}
                >
                  <p>Scheduled Meetings</p>
                  <span>{totalBookings}</span>
                </li>
                <li
                  onClick={() => navigate(`${privateRoutes.calendarBooking}/upcoming`)}
                  className={`d-flex-align-center ${status === "upcoming" ? "active" : ""}`}
                >
                  <p>Upcoming Meetings</p>
                  <span>{totalUpcoming}</span>
                </li>
                <li
                  onClick={() => navigate(`${privateRoutes.calendarBooking}/past`)}
                  className={`d-flex-align-center ${status === "past" ? "active" : ""}`}
                >
                  <p>Past Meetings</p>
                  <span>{totalPast}</span>
                </li>
                <li className="button-wrapper">
                  <Link to={privateRoutes.calendarEvents}>
                    <button className="schedule-btn">Manage Events ({totalEvents})</button>
                  </Link>
                </li>
              </ul>
              {isValidStatus && (
                <div className="top-area d-flex-align-center">
                  <div></div>
                  <div className="slider-area d-flex-align-center">
                    <p className="me-3">
                      <span>{(page - 1) * limit + 1}</span> -{" "}
                      <span>{total > page * limit ? page * limit : total}</span> of{" "}
                      <span>{total}</span>
                    </p>
                    <div className="slider-images d-flex-align-center mb-3">
                      <img src={LeftArrow} alt="" />
                      <img src={RightArrow} alt="" />
                    </div>
                  </div>
                </div>
              )}

              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderBooking;
