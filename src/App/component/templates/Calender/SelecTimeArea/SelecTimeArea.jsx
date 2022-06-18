import React from "react";
import styles from "./SelecTimeArea.module.css";

export const SelecTimeArea = ({ data: { event, company, time, setTime, times } }) => {
  return (
    <div className={styles.SelecTimeArea}>
      <h2>Select time:</h2>

      <div className={styles.days}>
        {times.map((t) => (
          <div
            key={t}
            className={`${styles.day} days ${time === t ? styles.selectedTime : ""}`}
            onClick={() => setTime(t)}
          >
            <p style={{ pointerEvents: "none", cursor: "pointer" }}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
