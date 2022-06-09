import React from "react";
import styles from "./PricingCardServices.module.css";
export const PricingCardServices = ({ services }) => {
  return (
    <ul className={styles.PricingCardServices}>
      {services.map((EachService, index) => (
        <li key={String(index)} className={styles.listItem}>
          <i className="fa-solid fa-circle-check" style={{ color: "#13225f", fontSize: 20 }}></i>
          <p style={{ marginLeft: 10 }}>{EachService}</p>
        </li>
      ))}
    </ul>
  );
};
