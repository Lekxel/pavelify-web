import { httpFetchEventsForLivechat } from "api/calendar";
import Spinner from "App/component/Atoms/Spinner";
import useGetSubdomain from "hooks/useGetSubdomain";
import { useState } from "react";
import { capitalize } from "utilities/misc";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import styles from "./BookMeeting.module.css";
export const BookMeeting = ({ companyID }) => {
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
        <div>
          {events.map((event) => (
            <a
              target={"_blank"}
              href={`${window.location.protocol}//meeting.${domain}/${event?.company?.slug}/${event.slug}`}
              className={"text-black text-center d-block text-primary"}
              key={event?._id}
            >
              <span>{event?.title}</span>
              <br />
              <small>
                ({event?.duration}minutes on {capitalize(event?.location)})
              </small>
            </a>
          ))}
        </div>
      ) : (
        <SenderButton
          onClick={onClick}
          text="Book a meeting"
          img={<i className="fas fa-calendar-week"></i>}
        />
      )}
    </div>
  );
};
