import React from "react";
import styles from "./PricingCardServices.module.css";
export const PricingCardServices = ({ services }) => {
  return (
    <ul className={styles.PricingCardServices}>
      {services.map((EachService) => (
        <li className={styles.listItem}>
          <i
            class="fa-solid fa-circle-check"
            style={{ color: "#13225f", fontSize: 20 }}
          ></i>
          <p style={{ marginLeft: 10 }}>{EachService}</p>
        </li>
      ))}
    </ul>
  );
};
