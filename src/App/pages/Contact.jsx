import { httpFetchAllContacts, httpFetchContacts } from "api/dashboard";
import Spinner from "App/component/Atoms/Spinner";
import Pagination from "App/Utils/Pagination";
import InitialsImage from "helpers/InitialsImage";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
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
  const { channel = "livechat" } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const csvInstance = useRef();

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

  useEffect(() => {
    if (processedData.length && csvInstance.current && csvInstance.current.link) {
      setTimeout(() => {
        csvInstance.current.link.click();
        setProcessedData([]);
        setShow(false);
      });
    }
  }, [processedData]);

  const exportAll = async () => {
    setLoading(true);
    httpFetchAllContacts(channel)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          const { contacts } = data;
          setProcessedData(
            contacts
              ? contacts?.map((c) => ({
                  name: c.name,
                  email: c.email,
                  country: c.country
                }))
              : []
          );
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const processSelected = () => {
    let Checkbox = document.querySelector("#all-check-checkbox");

    if (Checkbox.checked) {
      setProcessedData(
        contacts
          ? contacts?.map((c) => ({
              name: c.name,
              email: c.email,
              country: c.country
            }))
          : []
      );
    } else {
      let CheckboxTbody = document.querySelectorAll(".table-body .row .col1 input");

      let tobeProcessed = [];
      CheckboxTbody.forEach((c, index) => {
        if (c.checked) {
          let contact = contacts[index];
          tobeProcessed.push({
            name: contact.name,
            email: contact.email,
            country: contact.country
          });
        }
      });
      setProcessedData(tobeProcessed);
    }
  };

  return (
    <div className="Contact main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="contact" />
      <div className="body-area">
        {/* header */}
        <BodyHeader page="Contacts" />

        <Modal show={show} centered onHide={() => setShow(false)}>
          <Modal.Header>
            <Modal.Title>Export Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4">What to Export?</div>
            <div className="mb-4">
              <Button className="me-5" variant="primary" onClick={processSelected}>
                {loading ? <Spinner /> : "Selected Contacts"}
              </Button>
              <Button variant="primary" onClick={exportAll}>
                {loading ? <Spinner /> : "Export All"}
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-5" variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            {/* <Button variant="danger" onClick={handleDelete}>
              {loading ? <Spinner /> : "Delete"}
            </Button> */}
          </Modal.Footer>
        </Modal>

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
                <span
                  onClick={() => setShow(true)}
                  className="d-block export-area d-flex-align-center cursor-pointer"
                >
                  <img src={DocumentText} alt="" />
                  <span className="d-inline-block">Export</span>
                </span>
                <CSVLink
                  data={processedData}
                  filename={`${channel}-contacts.csv`}
                  target={"_blank"}
                  className="hidden"
                  ref={csvInstance}
                ></CSVLink>

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
