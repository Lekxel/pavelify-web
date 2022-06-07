import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import { OperatingHoursCheckbox } from "../component/organisms/settings/OperatingHours/OperatingHoursCheckbox/OperatingHoursCheckbox";

function SettingsOperatingHours() {
  useEffect(() => {
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, []);
  return (
    <div className="Settings main-wrapper d-flex">
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="settings" />

        <div className="body-main-area">
          <h2>Settings</h2>
          <div className="body-box">
            <div className="left-side account-left-side">
              <ul>
                <li className="heading">Channels</li>
                <li>
                  <Link>Live Chats</Link>
                </li>
                <li>
                  <Link>Email Tickets</Link>
                </li>
                <li>
                  <Link>Calendars</Link>
                </li>
                <li>
                  <Link>Mesenggers</Link>
                </li>
              </ul>

              {/* second list */}

              <ul>
                <li className="heading">General</li>
                <li>
                  <Link>Quick Response</Link>
                </li>
                <li>
                  <Link>Operators</Link>
                </li>
                <li>
                  <Link>Departements</Link>
                </li>{" "}
                <li>
                  <Link to="/dashboard/SettingsIntegration">Integration</Link>
                </li>{" "}
                <li>
                  <Link to="/dashboard/SettingsEmailSetup">Email Setup</Link>
                </li>
              </ul>

              {/* third list */}
              <ul>
                <li className="heading">Personal</li>
                <li>
                  <Link to="/dashboard/SettingsAccount">Account</Link>
                </li>
                <li>
                  <Link to="/dashboard/SettingsNotifications">
                    Notifications
                  </Link>
                </li>
                <li className="active">
                  <Link to="/dashboard/SettingsOperatingHours">
                    Operation Hours
                  </Link>
                </li>
              </ul>
            </div>

            {/* right side */}
            <div className="right-side Operating-right-side">
              <h2 className="special-h2">Operating Hours</h2>
              <form action="">
                <OperatingHoursCheckbox day="Sunday" />
                <OperatingHoursCheckbox day="Monday" />
                <OperatingHoursCheckbox day="Tuesday" />
                <OperatingHoursCheckbox day="Wednesday" />
                <OperatingHoursCheckbox day="Thursday" />
                <OperatingHoursCheckbox day="Friday" />
                <OperatingHoursCheckbox day="Saturday" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsOperatingHours;
