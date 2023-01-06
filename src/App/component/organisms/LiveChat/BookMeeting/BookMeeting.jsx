import { httpFetchEventsForLivechat } from "api/calendar";
import Spinner from "App/component/Atoms/Spinner";
import useGetSubdomain from "hooks/useGetSubdomain";
import { useState } from "react";
import { capitalize } from "utilities/misc";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import styles from "./BookMeeting.module.css";
export const BookMeeting = ({ companyID, appearance }) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { domain } = useGetSubdomain();

  const fetchEvents = () => {
    setLoading(true);
    httpFetchEventsForLivechat(companyID)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setEvents(data.events);
          setLoaded(true);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onClick = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className={styles.BookMeeting}>
      <h2 className={styles.heading}>Schedule a Meeting</h2>
      {loading ? (
        <div className="text-center">
          <Spinner className="text-primary" />
        </div>
      ) : loaded ? (
        !events.length ? (
          <p className="mt-3 text-center" style={{ color: "#222" }}>
            No Meeting available
          </p>
        ) : (
          <div>
            {events.map((event) => (
              <a
                target={"_blank"}
                href={`${window.location.protocol}//meeting.${domain}/${event?.company?.slug}/${event.slug}`}
                className={"text-black text-center d-block text-primary"}
                style={{
                  borderBottom: "1px solid lightgrey",
                  marginBottom: "10px",
                  padding: "12px 5px",
                  boxShadow: "2px 2px 2px 2px lightgrey",
                  borderRadius: "8px"
                }}
                key={event?._id}
              >
                <span>{event?.title}</span>
                <br />
                <small
                  style={{
                    fontSize: "12px"
                  }}
                >
                  ({event?.duration}minutes on {capitalize(event?.location)})
                </small>
              </a>
            ))}
          </div>
        )
      ) : (
        <SenderButton
          bg={appearance?.backgroundColor}
          onClick={onClick}
          text="Book a meeting"
          img={<i className="fas fa-calendar-week"></i>}
        />
      )}
    </div>
  );
};
