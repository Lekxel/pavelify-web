import { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

import { httpFetchTickets } from "api/email";
import Pagination from "App/Utils/Pagination";
import InitialsImage from "helpers/InitialsImage";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { privateRoutes } from "routes/routes";
import { capitalize } from "utilities/misc";
import BlueLow from "../../Assets/img/blue-low.png";
import user from "../../Assets/img/user.png";

const statuses = ["open", "due", "hold", "unassigned"];

function EmailTickets() {
  const { status } = useParams() || { status: "all" };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: {
      tickets,
      limit,
      page,
      total,
      totalPages,
      openCount,
      dueCount,
      holdCount,
      unassignedCount,
      allCount
    },
    refetch
  } = useQuery(["tickets", status, currentPage], () => httpFetchTickets(status, currentPage), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalPages: 1,
      openCount: 0,
      dueCount: 0,
      holdCount: 0,
      unassignedCount: 0,
      allCount: 0
    },
    keepPreviousData: true
  });

  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(".table-body-area .row .checkbox-wrapper input");

    //    click event on first checkbox i mean main checkbox
    Checkbox.addEventListener("click", (e) => {
      if (e.target.checked === true) {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = true;
        });
      } else {
        CheckboxTbody.forEach((EachInput) => {
          EachInput.checked = false;
        });
      }
    });
  }, []);

  return (
    <div className="EmailTickets main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="EmailTickets" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="EmailTickets" page="Email Tickets" />

        <div className="body-main-area">
          <ul className="navigation-bar d-flex-align-center">
            <li
              className={`${!statuses.includes(status) ? "active" : ""} d-flex-align-center`}
              onClick={() => navigate(`${privateRoutes.emailTickets}/all`)}
            >
              <p>All Tickets</p>
              <span>{allCount}</span>
            </li>
            <li
              className={`${status === "open" ? "active" : ""} d-flex-align-center`}
              onClick={() => navigate(`${privateRoutes.emailTickets}/open`)}
            >
              <p>Open</p>
              <span>{openCount}</span>
            </li>
            <li
              className={`${status === "due" ? "active" : ""} d-flex-align-center`}
              onClick={() => navigate(`${privateRoutes.emailTickets}/due`)}
            >
              <p>Due Today</p>
              <span>{dueCount}</span>
            </li>
            <li
              className={`${status === "hold" ? "active" : ""} d-flex-align-center`}
              onClick={() => navigate(`${privateRoutes.emailTickets}/hold`)}
            >
              <p>On Hold</p>
              <span>{holdCount}</span>
            </li>
            <li
              className={`${status === "unassigned" ? "active" : ""} d-flex-align-center`}
              onClick={() => navigate(`${privateRoutes.emailTickets}/unassigned`)}
            >
              <p>Unassigned</p>
              <span>{unassignedCount}</span>
            </li>
          </ul>
          <div className="body-box">
            <div className="top-area d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <div className="checkbox-wrapper">
                  <input type="checkbox" name="" id="all-check-checkbox" />
                </div>

                <div className="drop-down-wrapper d-flex-align-center">
                  <p>Sort by:</p>
                  <div className="drop-down d-flex-align-center">
                    <p>Date Created</p>
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.5 3L6.53109 0H0.468911L3.5 3Z" fill="#282D4A" />
                    </svg>
                  </div>
                </div>

                <div className="drop-down-wrapper d-flex-align-center">
                  <p>Filter by:</p>
                  <div className="drop-down d-flex-align-center">
                    <p>Department</p>
                    <svg
                      width="7"
                      height="3"
                      viewBox="0 0 7 3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.5 3L6.53109 0H0.468911L3.5 3Z" fill="#282D4A" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="right-area d-flex-align-center">
                <Pagination
                  setPage={setCurrentPage}
                  page={page}
                  limit={limit}
                  total={total}
                  totalPages={totalPages}
                />
              </div>
            </div>

            {/*table body area */}

            <div className="table-body-area">
              {tickets?.map((ticket) => (
                <div
                  onClick={() => navigate(`${privateRoutes.ticket}/${ticket._id}`)}
                  key={ticket._id}
                  className="row d-flex-align-center cursor-pointer"
                >
                  <div className="checkbox-wrapper">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div className="profile-area d-flex-align-center">
                    <InitialsImage
                      name={ticket?.from?.name || ticket?.from?.address}
                      color={ticket.color}
                    />
                    <div className="presentation ms-2">
                      {ticket?.unreadCount ? (
                        <h4>{ticket.subject}</h4>
                      ) : (
                        <p className="text-black">{ticket.subject}</p>
                      )}
                      <p>
                        <span>{ticket.from?.address}</span> -{" "}
                        <span>{DateTime.fromISO(ticket.timestamp).toFormat("DD t")}</span>
                      </p>
                    </div>
                  </div>
                  <div className="right-side d-flex-align-center">
                    <div className="icon-wrapper d-flex-align-center">
                      <img src={BlueLow} alt="" />
                      <p>Low</p>
                    </div>
                    <div className="icon-wrapper d-flex-align-center">
                      <img src={user} alt="" />
                      <p>{capitalize(ticket.department)}</p>
                    </div>

                    <button className={ticket.status === "pending" ? "open-btn" : "close-btn"}>
                      {capitalize(ticket.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailTickets;
