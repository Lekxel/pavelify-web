import Edit from "Assets/img/edit-2.png";
import Trash from "Assets/img/trash.png";
import { DateTime } from "luxon";
import { capitalize } from "utilities/misc";

const BookingList = ({ bookings, handleSelectForDelete }) => {
  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="table-head">
          <div className="col col7">
            <b>#</b>
          </div>
          <div className="col col2">
            <h5>Customer</h5>
          </div>
          <div className="col col3">
            <h5>Event</h5>
          </div>
          <div className="col col4">
            <h5>Location</h5>
          </div>
          <div className="col col5">
            <h5>Duration</h5>
          </div>
          <div className="col col6">
            <h5>Start Time</h5>
          </div>
          <div className="col col1">
            <h5>Actions</h5>
          </div>
        </div>
        <div className="table-body">
          {bookings &&
            bookings.map((eachBooking, index) => (
              <div key={eachBooking?._id} className="table-head">
                <div className="col col7">
                  <b>{index + 1}</b>
                </div>
                <div className="col col2">
                  <span>{eachBooking?.customerInfo?.name}</span>
                  <br />
                  <span>{eachBooking?.customerInfo?.phone}</span>
                  <br />
                  <span>{eachBooking?.customerInfo?.email}</span>
                </div>
                <div className="col col3">
                  <p>{eachBooking?.calendarEvent?.title}</p>
                </div>
                <div className="col col4">
                  <p>{eachBooking?.duration} mins</p>
                </div>
                <div className="col col5">
                  <p>{DateTime.fromISO(eachBooking?.time).toFormat("DDDD, t (zZZ)")}</p>
                </div>
                <div className="col col6">
                  <p>{capitalize(eachBooking?.location)}</p>
                </div>
                <div className="col col1">
                  <div className="images-wrapper d-flex-align-center">
                    {/* <span onClick={() => handleEdit(eachBooking)}>
                      <img src={Edit} alt="" />
                    </span> */}
                    <a
                      href="/"
                      style={{
                        color: "#2D96D6",
                        fontWeight: "bold"
                      }}
                    >
                      Start Now
                    </a>
                    <span className="mx-2" onClick={() => handleSelectForDelete(eachBooking)}>
                      <img src={Trash} alt="" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
