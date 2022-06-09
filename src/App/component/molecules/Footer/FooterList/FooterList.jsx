import React from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "routes/routes";
import styles from "./FooterList.module.css";
export const FooterList = ({ EachList }) => {
  return (
    <ul className={styles.FooterList}>
      {EachList.map((EachItem, index) => (
        <Each key={String(index)} EachItem={EachItem} />
      ))}
    </ul>
  );
};

const Each = ({ EachItem }) => (
  <>
    {EachItem.type !== "form" && (
      <li className={`${EachItem.type === "heading" ? styles.specialtext : styles.normalText}`}>
        {EachItem.type === "listItems" ? (
          <Link to={EachItem.url} style={{ color: "#fff", textDecoration: "none" }}>
            {EachItem.text}
          </Link>
        ) : EachItem.image ? (
          <Link to={publicRoutes.home}>
            <img
              src={EachItem.image}
              style={{ width: "180px", marginLeft: "-30px" }}
              alt="pavelify"
            />
          </Link>
        ) : (
          EachItem.text
        )}
      </li>
    )}
    {EachItem.type === "form" && (
      <form className={styles.form}>
        <input type="text" placeholder={EachItem.text} className={styles.input} />
        <button className={styles.button}>{EachItem.buttontext}</button>
      </form>
    )}
  </>
);
