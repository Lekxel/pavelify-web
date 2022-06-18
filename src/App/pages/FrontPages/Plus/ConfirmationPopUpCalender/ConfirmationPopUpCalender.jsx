import { Button } from "App/component/Atoms/Auth/Button/Button";
import Spinner from "App/component/Atoms/Spinner";
import { DateTime } from "luxon";
import React from "react";
import styles from "./ConfirmationPopUpCalender.module.css";
export const ConfirmationPopUpCalender = ({
  data: {
    company,
    timezone,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    onSubmit,
    prevStep,
    event,
    formattedDate,
    isLoading
  }
}) => {
  return (
    <div className={`${styles.ConfirmationPopUpCalenderWrapper} popup-calender`}>
      <div className={`${styles.ConfirmationPopUpCalender} `}>
        <h2 className={styles.heading}>Confirm booking:</h2>

        <p>
          <b>{event?.duration} Minute Meeting</b> with <b>{company?.companyName}</b>
        </p>
        <div>
          <div className={styles.Close} onClick={prevStep}>
            <i className="fas fa-arrow-left"></i>
          </div>
        </div>
        <ul className={styles.Ul}>
          <li className={styles.Li}>{DateTime.fromISO(formattedDate).toFormat("DDDD, 'at' t")} </li>
          <li className={styles.Li}> {timezone}</li>

          <li className={styles.Li}>15 minutes</li>
        </ul>

        <div className={styles.form}>
          <div>
            <label htmlFor="Name" className={styles.label}>
              Your Name:
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="Name"
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="Email" className={styles.label}>
              Your Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="Email"
              className={styles.input}
            />
          </div>
          <div className={styles.textareawrapper}>
            <label htmlFor="Email" className={styles.label}>
              Your Phone Number:
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              id="Phone"
              className={styles.input}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              onClick={onSubmit}
              block={false}
              text={isLoading ? <Spinner /> : "Schedule Meeting"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
