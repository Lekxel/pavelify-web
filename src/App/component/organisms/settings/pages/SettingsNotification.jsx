import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "App/component/BodyHeader";
import Sidebar from "App/component/Sidebar";
import SettingsSidebar from "App/component/organisms/settings/SettingsSidebar";

const SettingsNotification = () => (
  <div className="right-side account-right-side notification-right-side">
    <h2 className="special-h2">
      {" "}
      <i className="fas fa-bell"></i>Notifications
    </h2>
    <form action="">
      <div className="input-wrapper">
        <label htmlFor="">Incoming Visitor</label>{" "}
        <select name="" id="">
          <option value="default">default</option>
        </select>
      </div>{" "}
      <div className="input-wrapper">
        <label htmlFor="">New Chat Request</label>{" "}
        <select name="" id="">
          <option value="default">default</option>
        </select>
      </div>{" "}
      <div className="input-wrapper">
        <label htmlFor="">New Message</label>{" "}
        <select name="" id="">
          <option value="default">default</option>
        </select>
      </div>
      <h2>
        <i className="fas fa-envelope"></i> Send Email Notifications
      </h2>
      <div className="input-wrapper">
        <label htmlFor="Email">Send For</label>
        <input type="email" id="Email" />
      </div>
      <button className="add_email_address_button">Add new email address</button>{" "}
      <button className="save-button">Save</button>
    </form>
  </div>
);

export default SettingsNotification;
