import React from "react";
import "./TrustedBrands.css";
import logo1 from "../../../../../Assets/img/5d19fd70762b8_Marshall-Financial-Logo-Transparent.png";
import logo2 from "../../../../../Assets/img/32.png";
import logo3 from "../../../../../Assets/img/findaseo_logo.png";
import logo4 from "../../../../../Assets/img/W3BT-blue-outline-logo.png";
import logo5 from "../../../../../Assets/img/logo-dark_ynf2rh.png";
import logo6 from "../../../../../Assets/img/Conterize-1-removebg-preview (1).png";
const TrustedBrands = () => {
  return (
    <div className="TrustedBrands">
      <div className="content_wrapper w-1200">
        <h1>
          Over 6,000 brands are using Pavelify to grow their business by improving their customer
          experience.{" "}
        </h1>
        <div className="logos_wrapper">
          <img src={logo1} />
          <img src={logo2} />
          <img src={logo3} />
          <img src={logo4} />
          <img src={logo5} />
          <img src={logo6} />
        </div>
      </div>
    </div>
  );
};
export default TrustedBrands;
