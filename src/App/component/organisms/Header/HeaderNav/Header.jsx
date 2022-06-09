import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRoutes } from "routes/routes";
import { HeaderNavItemWrapper } from "../../../molecules/Header/HeaderNav/HeaderNavItemWrapper";
import { HandleSidebar } from "./event/HandleSideBar";
import styles from "./Header.module.css";

export const Header = ({ headerOptions, activeLink, not_margin = null, showbg = null }) => {
  return (
    <div
      className={`${styles.Header} header_scroll ${not_margin && styles.not_margin} ${
        showbg && styles.bgwhite
      }`}
    >
      <div className={`${styles.HeaderContent} w-1200`}>
        <h1>
          <Link to={publicRoutes.home}>
            <img src="/images/logo.png" style={{ width: "180px" }} alt="pavelify" />
          </Link>
        </h1>
        <HeaderNavItemWrapper headerOptions={headerOptions} activeLink={activeLink} />

        <div className={`${styles.burgerIcon}`} onClick={HandleSidebar}>
          <i className="fas fa-bars" style={{ color: not_margin && "#fff" }}></i>
        </div>
      </div>
    </div>
  );
};
