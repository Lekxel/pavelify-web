import React, { useEffect, useState } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import LeftArrow from "../../Assets/img/left-contact.png";
import RightArrow from "../../Assets/img/right-contact.png";
import Edit from "../../Assets/img/edit-2.png";
import Trash from "../../Assets/img/trash.png";
import Settings from "../../Assets/img/settings-table.svg";
import { Button, Modal } from "react-bootstrap";
import copy from "clipboard-copy";
import { showError, showSuccess } from "utilities/alerts";
import { capitalize, validateName, days as daysOfTheWeek } from "utilities/misc";
import Spinner from "App/component/Atoms/Spinner";
import { useQuery } from "react-query";
import { DateTime } from "luxon";
import { httpDeleteEvent, httpFetchEvents, httpSaveEvent } from "api/calendar";
import useGetSubdomain from "hooks/useGetSubdomain";
import TimezoneOptions from "helpers/TimezoneOptions";
import { httpGetUser } from "api/auth";

const locations = ["zoom", "google meet", "phone"];

function CalendarEvents() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [title, setTitle] = useState("");
  const [event, setEvent] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [location, setLocation] = useState("zoom");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState([]);
  const [slug, setSlug] = useState("");
  const [duration, setDuration] = useState("15");
  const [timezone, setTimezone] = useState("");
  const { domain } = useGetSubdomain();
  const [livechatVisibility, setLivechatVisibility] = useState("No");

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  const {
    data: { events, limit, page, total },
    refetch
  } = useQuery("events", httpFetchEvents, {
    initialData: {
      limit: 10,
      page: 1,
      total: 0
    }
  });

  const clearForm = () => {
    setTitle("");
    setLocation("zoom");
    setFrom("");
    setTo("");
    setDuration("15");
    setSlug("");
    setLivechatVisibility("No");
    setDays([]);
  };

  const handleSubmit = () => {
    if (!validateName(title)) {
      return showError("Title is required");
    }
    setLoading(true);

    const data = {
      title,
      slug,
      availableTimeRange: { from, to },
      availableDays: days,
      duration,
      showOnLivechat: Boolean(livechatVisibility === "Yes"),
      location,
      timezone
    };

    httpSaveEvent(data, event?._id, isAdd)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          refetch();
          showSuccess(data.message);
          clearForm();
          setShowModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleAdd = () => {
    clearForm();
    setIsAdd(true);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setIsAdd(false);
    setEvent(event);
    setTitle(event.title);
    setLocation(event.location);
    setFrom(event.availableTimeRange.from);
    setTo(event.availableTimeRange.to);
    setDuration(event.duration);
    setSlug(event.slug);
    setLivechatVisibility(event.showOnLivechat ? "Yes" : "No");
    setDays(event.availableDays);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!event._id) return showError("Please select an Event");

    setLoading(true);
    httpDeleteEvent(event._id)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          refetch();
          showSuccess(data.message);
          setShowDeleteModal(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSelectForDelete = (event) => {
    setEvent(event);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    setSlug(
      title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s/g, "-")
    );
  }, [title]);

  const toggleDays = (day, checked) => {
    setDays((days) =>
      checked ? [...days.filter((da) => da !== day), day] : days.filter((da) => da !== day)
    );
  };

  const copyLink = async (link) => {
    await copy(link);
    showSuccess("Link copied to clipboard");
  };

  return (
    <div className="Contact Operators main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="calender" />
      <div className="body-area">
        {/* header */}
        <BodyHeader />

        <Modal show={showModal} centered onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Add New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <b>
                  <label className="d-inline" htmlFor="">
                    Title
                  </label>
                </b>
                <input
                  type="text"
                  placeholder="Event Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="mt-3">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Direct Link
                    </label>
                  </b>
                  <input
                    type="text"
                    placeholder="Link"
                    className="form-control"
                    value={slug}
                    onChange={(e) =>
                      setSlug(e.target.value.replace(/[^a-z0-9 ]/g, "").replace(/\s/g, "-"))
                    }
                  />
                </div>

                <div className="mt-4">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Available Time
                    </label>
                  </b>
                  <div
                    className="row mt-1"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div className="col">
                      <input
                        type="time"
                        placeholder="From"
                        className="form-control me-2"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                    <div className="mx-2">
                      <b>-</b>
                    </div>
                    <div className="col">
                      <input
                        type="time"
                        placeholder="To"
                        className="form-control"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Duration
                    </label>
                  </b>
                  <div className="">
                    <select
                      placeholder="Duration"
                      className="form-control"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value={15}>15 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={60}>1 hour</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Timezone
                    </label>
                  </b>
                  <div className="">
                    <select
                      placeholder="Timezone"
                      className="form-control"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <TimezoneOptions />
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <b>
                    <label htmlFor="" className="text-center">
                      Available Days
                    </label>
                  </b>
                  <div className=" mt-2">
                    <div
                      className="text-center justify-content-center d-flex"
                      style={{
                        flexWrap: "wrap"
                      }}
                    >
                      {daysOfTheWeek.map((day, index) => (
                        <div key={String(index)} className="col-4 col-md-3 my-2">
                          <input
                            className="fodrm-control d-inline"
                            id={day}
                            checked={days.indexOf(day) >= 0}
                            type="checkbox"
                            value={day}
                            onChange={(e) => toggleDays(e.target.value, e.target.checked)}
                          />{" "}
                          <label className="d-inline ms-1" htmlFor={day}>
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Meeting Location
                    </label>
                  </b>
                  <div
                    className="row mt-2"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center"
                    }}
                  >
                    {locations?.map((l, index) => (
                      <div key={l} className="col form-group">
                        <label htmlFor={l}>{capitalize(l)}</label>
                        <input
                          type="radio"
                          className="dform-control ms-1"
                          name="location"
                          value={l}
                          id={l}
                          checked={location === l}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 mb-1">
                  <b>
                    <label className="d-inline" htmlFor="">
                      Visible on Livechat Widget
                    </label>
                  </b>
                  <div
                    className="row mt-2"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center"
                    }}
                  >
                    <div className="col form-group">
                      <label htmlFor="c-Yes">Yes</label>
                      <input
                        type="radio"
                        className="dform-control ms-1"
                        name="livechatVisibility"
                        value="Yes"
                        id="c-Yes"
                        checked={livechatVisibility === "Yes"}
                        onChange={(e) => setLivechatVisibility(e.target.value)}
                      />
                    </div>

                    <div className="col form-group">
                      <label htmlFor="c-No">No</label>
                      <input
                        type="radio"
                        className="dform-control ms-1"
                        name="livechatVisibility"
                        value="No"
                        id="c-No"
                        checked={livechatVisibility === "No"}
                        onChange={(e) => setLivechatVisibility(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-5" variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {loading ? <Spinner /> : "Continue"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}

        <Modal show={showDeleteModal} centered onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Delete Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Are you sure you want to delete <b>{event?.title}</b>?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="me-5" variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              {loading ? <Spinner /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="body-main-area">
          <h2>Events</h2>
          <div className="body-box" style={{ display: "block" }}>
            {/* right area */}
            <div className="right-area">
              <div className="top-area d-flex-align-center">
                <button onClick={handleAdd}>Add New Event</button>

                <div className="slider-area  d-flex-align-center">
                  <p>
                    <span>{(page - 1) * limit + 1}</span> -{" "}
                    <span>{total > page * limit ? page * limit : total}</span> of{" "}
                    <span>{total}</span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>

              <div className="table-wrapper">
                <div className="table">
                  <div className="table-head">
                    <div className="col col1">
                      <b>#</b>
                    </div>
                    <div className="col col2">
                      <h5>Title</h5>
                    </div>
                    <div className="col col3">
                      <h5>Time</h5>
                    </div>
                    <div className="col col4">
                      <h5>Duration</h5>
                    </div>
                    <div className="col col5">
                      <h5>Available Days</h5>
                    </div>
                    <div className="col col6">
                      <h5>Location</h5>
                    </div>
                    <div className="col col7">
                      <h5>Actions</h5>
                    </div>
                  </div>
                  <div className="table-body">
                    {events &&
                      events.map((eachEevnt, index) => (
                        <div key={eachEevnt?._id} className="table-head">
                          <div className="col col1">
                            <b>{index + 1}</b>
                          </div>
                          <div className="col col2 d-flex-align-center">
                            <p>{eachEevnt?.title}</p>
                          </div>
                          <div className="col col3">
                            <p>
                              {eachEevnt?.availableTimeRange?.from} -{" "}
                              {eachEevnt?.availableTimeRange?.to}
                            </p>
                            <p>({eachEevnt?.timezone})</p>
                          </div>
                          <div className="col col4">
                            <p>{eachEevnt?.duration} mins</p>
                          </div>
                          <div className="col col5">
                            <p>{eachEevnt?.availableDays?.join(", ")}</p>
                          </div>
                          <div className="col col6">
                            <p>{capitalize(eachEevnt?.location)}</p>
                          </div>
                          <div className="col col7">
                            <div className="images-wrapper d-flex-align-center">
                              <span
                                onClick={() =>
                                  copyLink(
                                    `${window.location.protocol}//meeting.${domain}/${user?.company?.companyName}/${eachEevnt.slug}`
                                  )
                                }
                              >
                                <i
                                  style={{
                                    color: "rgb(45, 150, 214)",
                                    fontSize: "30px",
                                    cursor: "pointer"
                                  }}
                                  className="fa fa-copy me-2"
                                ></i>
                              </span>
                              <span onClick={() => handleEdit(eachEevnt)}>
                                <img src={Edit} alt="" />
                              </span>
                              <span
                                className="mx-2"
                                onClick={() => handleSelectForDelete(eachEevnt)}
                              >
                                <img src={Trash} alt="" />
                              </span>
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

export default CalendarEvents;
