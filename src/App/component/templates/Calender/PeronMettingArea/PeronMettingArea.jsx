import InitialsImage from "helpers/InitialsImage";
import TimezoneOptions from "helpers/TimezoneOptions";
import React from "react";
import profileImage from "../../../../../Assets/img/msg4.png";
import styles from "./PeronMettingArea.module.css";
export const PeronMettingArea = ({ data: { timezone, setTimezone, company, event } }) => {
  return (
    <div className={`${styles.PeronMettingArea} `}>
      <div className={styles.profile}>
        <p>
          {company?.picture ? (
            <img src={company.picture} alt="" className={styles.Img} />
          ) : (
            <InitialsImage name={company?.companyName} />
          )}
        </p>
        <p className={styles.para}>{company?.companyName}</p>
      </div>
      <h2 className={styles.heading}>{event?.title}</h2>
      <p className={styles.time}>{event?.duration} minutes</p>

      <div>
        <h2 className="mb-1 mt-4" style={{ fontSize: "1.2rem" }}>
          Select a Timezone:
        </h2>

        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          id="timezone"
          name="timezone"
          className="py-1"
        >
          <TimezoneOptions />
        </select>
      </div>
    </div>
  );
};
