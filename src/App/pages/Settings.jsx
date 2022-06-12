import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";
import { privateRoutes } from "routes/routes";
import SettingsSidebar from "App/component/organisms/settings/SettingsSidebar";
import SettingsLiveChat from "App/component/organisms/settings/pages/SettingsLiveChat";
import SettingsAccount from "App/component/organisms/settings/pages/SettingsAccount";
import SettingsEmailSetup from "App/component/organisms/settings/pages/SettingsEmailSetup";
import SettingsIntegrations from "App/component/organisms/settings/pages/SettingsIntegrations";
import SettingsOperatingHours from "App/component/organisms/settings/pages/SettingsOperatingHours";
import SettingsNotification from "App/component/organisms/settings/pages/SettingsNotification";

function Settings() {
  const path = useLocation()?.pathname;
  useEffect(() => {
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, []);

  const currentPage = () => {
    switch (path) {
      case privateRoutes.settingsLiveChat:
        return <SettingsLiveChat />;
      case privateRoutes.settingsAccount:
        return <SettingsAccount />;
      case privateRoutes.settingsEmailSetup:
        return <SettingsEmailSetup />;
      case privateRoutes.settingsIntegration:
        return <SettingsIntegrations />;
      case privateRoutes.settingsOperatingHours:
        return <SettingsOperatingHours />;
      case privateRoutes.settingsNotifications:
        return <SettingsNotification />;

      default:
        return <div />;
    }
  };

  const additionalContainerClass = () => {
    switch (path) {
      case privateRoutes.settingsEmailSetup:
        return "email_provider";
      case privateRoutes.settingsIntegration:
        return "integration";
      default:
        return "";
    }
  };

  return (
    <div className={`Settings main-wrapper d-flex ${additionalContainerClass()}`}>
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="settings" />

        <div className="body-main-area">
          <h2>Settings</h2>
          <div className="body-box">
            <SettingsSidebar />
            {/* right side */}
            {currentPage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
