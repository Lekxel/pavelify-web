import SettingsAccount from "App/component/organisms/settings/pages/SettingsAccount";
import SettingsCalendarSetup from "App/component/organisms/settings/pages/SettingsCalendarSetup";
import SettingsDepartment from "App/component/organisms/settings/pages/SettingsDepartment";
import SettingsEmailSetup from "App/component/organisms/settings/pages/SettingsEmailSetup";
import SettingsIntegrations from "App/component/organisms/settings/pages/SettingsIntegrations";
import SettingsLiveChat from "App/component/organisms/settings/pages/SettingsLiveChat";
import SettingsNotification from "App/component/organisms/settings/pages/SettingsNotification";
import SettingsOperatingHours from "App/component/organisms/settings/pages/SettingsOperatingHours";
import SettingsQuickResponse from "App/component/organisms/settings/pages/SettingsQuickResponse";
import SettingsSidebar from "App/component/organisms/settings/SettingsSidebar";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { privateRoutes } from "routes/routes";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function Settings() {
  const path = useLocation()?.pathname;
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params.page) {
      navigate(`${privateRoutes.settingsLiveChat}`);
    }
  }, []);

  useEffect(() => {
    let Head = document.querySelectorAll(".right-side .head");
    Head.forEach((EachHead) => {
      EachHead.addEventListener("click", (e) => {
        let ParentElement = e.target.parentNode;

        ParentElement.classList.toggle("active");
      });
    });
  }, [path]);

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
      case privateRoutes.settingsQuickResponse:
        return <SettingsQuickResponse />;
      case privateRoutes.settingsDepartments:
        return <SettingsDepartment />;
      case privateRoutes.settingsCalendar:
        return <SettingsCalendarSetup />;

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
      case privateRoutes.settingsQuickResponse:
        return "Contact Operators";
      case privateRoutes.settingsDepartments:
        return "Contact Operators";
      case privateRoutes.settingsCalendar:
        return "email_provider";
      default:
        return "";
    }
  };

  return (
    <div className={`Settings  main-wrapper d-flex ${additionalContainerClass()}`}>
      <Sidebar active="settings" />
      <div className="body-area">
        {/* header */}
        <BodyHeader page="Settings" active="settings" />

        <div className="body-main-area">
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
