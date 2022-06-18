import React from "react";
import styles from "./CalenderBookingArea.module.css";
import { CalenderPure } from "./CalenderPure/CalenderPure";
export const CalenderBookingArea = ({ data }) => {
  return (
    <div className={styles.CalenderBookingArea}>
      <h1 className={styles.heading}>Pick a date:</h1>

      <CalenderPure data={data} />
    </div>
  );
};
