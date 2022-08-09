import { httpFetchContacts } from "api/dashboard";
import Pagination from "App/Utils/Pagination";
import InitialsImage from "helpers/InitialsImage";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { privateRoutes } from "routes/routes";
import Calenders from "../../Assets/img/calendar.png";
import DocumentText from "../../Assets/img/document-text.png";
import Message from "../../Assets/img/message.png";
import Tickets from "../../Assets/img/sms-tracking.png";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

const channels = ["email", "calendar"];

function Contact() {
  const { channel } = useParams() || { channel: "livechat" };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const {
    data: { contacts, limit, page, total, totalPages },
    refetch
  } = useQuery(["contacts", channel, currentPage], () => httpFetchContacts(channel, currentPage), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalPages: 1
    }
  });

  useEffect(() => {
    let Checkbox = document.querySelector("#all-check-checkbox");
    let CheckboxTbody = document.querySelectorAll(".table-body .row .col1 input");

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
  }, [channel, contacts]);

  const topTitle = () => {
    if (channel === "email") {
      return "Email Tickets";
    } else if (channel === "calendar") {
      return "Calendars";
    }
    return "Live Chats";
  };

  return (
    <div className="Contact main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="contact" />
      <div className="body-area">
        {/* header */}
        <BodyHeader page="Contacts" />

        <div className="body-main-area">
          <div className="body-box">
            <div className="left-side">
              <div className="top-area d-flex-align-center">
                <h3>Channels</h3>
              </div>
              <ul>
                <li
                  className={`${!channels.includes(channel) ? "active" : ""} d-flex-align-center`}
                  onClick={() => navigate(`${privateRoutes.contacts}/livechat`)}
                >
                  <div className="icon-wrapper">
                    <img src={Message} alt="" />
                  </div>
                  <p>Live Chats</p>
                </li>
                <li
                  className={`${channel === "email" ? "active" : ""} d-flex-align-center`}
                  onClick={() => navigate(`${privateRoutes.contacts}/email`)}
                >
                  <div className="icon-wrapper">
                    <img src={Tickets} alt="" />
                  </div>
                  <p>Email Tickets</p>
                </li>
                <li
                  className={`${channel === "calendar" ? "active" : ""} d-flex-align-center`}
                  onClick={() => navigate(`${privateRoutes.contacts}/calendar`)}
                >
                  <div className="icon-wrapper">
                    <img src={Calenders} alt="" />
                  </div>
                  <p>Calendars</p>
                </li>
              </ul>
            </div>

            {/* right area */}
            <div className="right-area">
              <div className="top-area d-flex-align-center">
                <h3>{topTitle()}</h3>
                <CSVLink
                  data={
                    contacts
                      ? contacts?.map((c) => ({
                          name: c.name,
                          email: c.email,
                          country: c.country
                        }))
                      : []
                  }
                  filename={`${channel}-contacts.csv`}
                  target={"_blank"}
                  className="export-area d-flex-align-center cursor-pointer"
                >
                  <img src={DocumentText} alt="" />
                  <p className="pt-3">Export</p>
                </CSVLink>

                <Pagination
                  setPage={setCurrentPage}
                  page={page}
                  limit={limit}
                  total={total}
                  totalPages={totalPages}
                />
              </div>
              <div className="table-wrapper">
                <div className="table">
                  <div className="table-head">
                    <div className="col col1">
                      <input type="checkbox" name="" id="all-check-checkbox" />
                    </div>
                    <div className="col col2">
                      <h5>Profile</h5>
                    </div>
                    <div className="col col3">
                      <h5>Email</h5>
                    </div>
                    <div className="col col4">
                      <h5>Email Consent</h5>
                    </div>
                    <div className="col col5">
                      <h5>Country</h5>
                    </div>
                    <div className="col col6">
                      <h5>Tags</h5>
                    </div>
                    <div className="col col7">
                      <h5>Actions</h5>
                    </div>
                  </div>
                  <div className="table-body">
                    {contacts?.map((contact) => (
                      <div key={contact.id} className="row">
                        <div className="col col1">
                          <input type="checkbox" name="" id="" />
                        </div>
                        <div className="col col2 d-flex-align-center">
                          <InitialsImage name={contact?.name || contact?.email} />
                          <p style={{ wordBreak: "break-all" }}>{contact?.name}</p>
                        </div>
                        <div className="col col3">
                          <p style={{ wordBreak: "break-all" }}>{contact?.email}</p>
                        </div>
                        <div className="col col4">
                          <select name="" id="">
                            <option value="">Unsubscribed</option>
                          </select>
                        </div>
                        <div className="col col5">
                          <p>{contact?.country}</p>
                        </div>
                        <div className="col col6">
                          <h5>-</h5>
                        </div>
                        <div className="col col7">
                          <div className="images-wrapper d-flex-align-center">
                            {/* <img src={Edit} alt="" />
                            <img src={Trash} alt="" /> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
