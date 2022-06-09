import React from "react";
import { Link } from "react-router-dom";
import styles from "./PricingCard.module.css";
import { PricingCardServices } from "./PricingCardServices";
export const PricingCard = ({
  title,
  price,
  duration,
  buy_now_link,
  free_trail_link,
  services,
  time,
  type = null
}) => {
  return (
    <div className={styles.PricingCard}>
      <h1 className={styles.mainheading}>{title}</h1>
      {type === null && (
        <>
          <p className={styles.price}>
            {price} <span>/{time}</span>
          </p>
          <small className={styles.duration}>{duration}</small>
          <Link className={styles.button} to={free_trail_link}>
            <button className={styles.button}>Get Started for Free</button>
          </Link>
          {title !== "Basic" && <span className={styles.freeTrailLink}>14 days Free Trial</span>}
        </>
      )}

      <PricingCardServices services={services} />
    </div>
  );
};
