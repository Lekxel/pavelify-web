import { httpFetchBookings } from "api/calendar";
import BookingList from "App/component/templates/CalendarBooking/BookingList";
import CalendarSchedules from "App/component/templates/CalendarBooking/CalendarSchedules";
import Pagination from "App/Utils/Pagination";
import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: {
      bookings,
      limit,
      page,
      total,
      totalEvents,
      totalBookings,
      totalPast,
      totalUpcoming,
      totalPages
    },
    refetch
  } = useQuery(["bookings", status, currentPage], () => httpFetchBookings(status, currentPage), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalEvents: 0,
      totalBookings: 0,
      totalPast: 0,
      totalUpcoming: 0,
      totalPages: 1
    },
    keepPreviousData: true
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
      return (
        <BookingList
          limit={limit}
          page={page}
          bookings={bookings}
          handleSelectForDelete={handleSelectForDelete}
        />
      );
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
          <div className="body-box mt-0" style={{ display: "block" }}>
            <div className="right-area">
              <ul className="navigation-bar d-flex-align-center mt-0">
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
                <div className="ms-5">
                  {isValidStatus ? (
                    <Pagination
                      setPage={setCurrentPage}
                      page={page}
                      limit={limit}
                      total={total}
                      totalPages={totalPages}
                    />
                  ) : null}
                </div>
              </ul>

              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderBooking;
