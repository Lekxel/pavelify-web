import { Link, useLocation } from "react-router-dom";
import { privateRoutes } from "routes/routes";

const SettingsSidebar = ({ containerClass = "", active = "" }) => {
  const path = useLocation()?.pathname;

  return (
    <div className={`left-side ${containerClass}`}>
      <ul>
        <li className="heading">Channels</li>
        <li className={path === privateRoutes.settingsLiveChat && "active"}>
          <Link to={privateRoutes.settingsLiveChat}>Live Chats</Link>
        </li>
        <li className={path === privateRoutes.settingsEmailTickets && "active"}>
          <Link to={privateRoutes.settingsEmailTickets}>Email Tickets</Link>
        </li>
        <li className={path === privateRoutes.settingsCalendar && "active"}>
          <Link to={privateRoutes.settingsCalendar}>Calendars</Link>
        </li>
        <li className={path === privateRoutes.settingsMessengers && "active"}>
          <Link to={privateRoutes.settingsMessengers}>Messengers</Link>
        </li>
      </ul>

      {/* second list */}

      <ul>
        <li className="heading">General</li>
        <li className={path === privateRoutes.settingsQuickResponse && "active"}>
          <Link to={privateRoutes.settingsQuickResponse}>Quick Response</Link>
        </li>
        <li className={path === privateRoutes.settingsOperators && "active"}>
          <Link to={privateRoutes.operators}>Operators</Link>
        </li>
        <li className={path === privateRoutes.settingsDepartments && "active"}>
          <Link to={privateRoutes.settingsDepartments}>Departments</Link>
        </li>{" "}
        <li className={path === privateRoutes.settingsIntegration && "active"}>
          <Link to={privateRoutes.settingsIntegration}>Integration</Link>
        </li>{" "}
        <li className={path === privateRoutes.settingsEmailSetup && "active"}>
          <Link to={privateRoutes.settingsEmailSetup}>Email Setup</Link>
        </li>
      </ul>

      {/* third list */}
      <ul>
        <li className="heading">Personal</li>
        <li className={path === privateRoutes.settingsAccount && "active"}>
          <Link to={privateRoutes.settingsAccount}>Account</Link>
        </li>
        <li className={path === privateRoutes.settingsNotifications && "active"}>
          <Link to={privateRoutes.settingsNotifications}>Notifications</Link>
        </li>
        <li className={path === privateRoutes.settingsOperatingHours && "active"}>
          <Link to={privateRoutes.settingsOperatingHours}>Operation Hours</Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;
