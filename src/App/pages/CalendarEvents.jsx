import { httpGetUser } from "api/auth";
import { httpDeleteEvent, httpFetchEvents, httpSaveEvent } from "api/calendar";
import Spinner from "App/component/Atoms/Spinner";
import Pagination from "App/Utils/Pagination";
import copy from "clipboard-copy";
import TimezoneOptions from "helpers/TimezoneOptions";
import useGetSubdomain from "hooks/useGetSubdomain";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Datetime from "react-date-time-new";
import "react-date-time-new/css/react-datetime.css";
import { useQuery } from "react-query";
import { showError, showSuccess } from "utilities/alerts";
import { capitalize, days as daysOfTheWeek, validateName } from "utilities/misc";
import Edit from "../../Assets/img/edit-2.png";
import Trash from "../../Assets/img/trash.png";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

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
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const { domain } = useGetSubdomain();
  const [livechatVisibility, setLivechatVisibility] = useState("No");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  const {
    data: { events, limit, page, total, totalPages },
    refetch
  } = useQuery("events", () => httpFetchEvents(currentPage), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalPages: 1
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
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  };

  const handleSubmit = () => {
    if (!validateName(title)) {
      return showError("Title is required");
    }
    if (!to || !from) return showError("Available time is required is required");
    setLoading(true);

    const data = {
      title,
      slug,
      availableTimeRange: {
        from: DateTime.fromJSDate(from).toFormat("HH:mm"),
        to: DateTime.fromJSDate(to).toFormat("HH:mm")
      },
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
    setFrom(DateTime.fromFormat(event.availableTimeRange.from, "HH:mm").toJSDate());
    setTo(DateTime.fromFormat(event.availableTimeRange.to, "HH:mm").toJSDate());
    setDuration(event.duration);
    setSlug(event.slug);
    setLivechatVisibility(event.showOnLivechat ? "Yes" : "No");
    setDays(event.availableDays);
    setShowModal(true);
    setTimezone(event.timezone);
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
        <BodyHeader page="Calendar Events" />

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
                  <div
                    className="px-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "space-between",
                      border: "1px solid #ccc",
                      borderRadius: "4px"
                    }}
                  >
                    <span>https://meeting.pavelify.help/{user?.company?.slug}/</span>
                    <input
                      type="text"
                      placeholder="Link"
                      className="form-control border-0 ps-0 shadow-none"
                      value={slug}
                      onChange={(e) =>
                        setSlug(e.target.value.replace(/[^a-z0-9 ]/g, "").replace(/\s/g, "-"))
                      }
                    />
                  </div>
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
                      justifyContent: "space-evenly",
                      alignItems: "center"
                    }}
                  >
                    <div className="col">
                      <Datetime
                        dateFormat={false}
                        timeFormat={true}
                        onChange={(s) => setFrom(DateTime.fromISO(s.toISOString()).toJSDate())}
                        value={from}
                      />
                      {/* <TimePicker
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                        required
                        value={from}
                        onChange={(s) => console.log(s)}
                      /> */}
                    </div>
                    <div className="col text-center">
                      <b className="text-center">-</b>
                    </div>
                    <div className="col">
                      <Datetime
                        dateFormat={false}
                        timeFormat={true}
                        onChange={(s) => setTo(DateTime.fromISO(s.toISOString()).toJSDate())}
                        value={to}
                      />
                      {/* <TimePicker
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                        required
                        value={to}
                        onChange={setTo}
                      /> */}
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
                            className="d-inline"
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
          <div className="body-box" style={{ display: "block" }}>
            {/* right area */}
            <div className="right-area">
              <div className="top-area d-flex-align-center">
                <button onClick={handleAdd}>Add New Event</button>

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
                            <b>{page * limit - limit + index + 1}</b>
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
                                    `${window.location.protocol}//meeting.${domain}/${user?.company?.slug}/${eachEevnt.slug}`
                                  )
                                }
                              >
                                <i
                                  style={{
                                    color: "rgb(45, 150, 214)",
                                    fontSize: "32px",
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
