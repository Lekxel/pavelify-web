import { Link } from "react-router-dom";
import { privateRoutes } from "routes/routes";

const SettingsSidebar = ({ containerClass = "", active = "" }) => (
  <div className={`left-side ${containerClass}`}>
    <ul>
      <li className="heading">Channels</li>
      <li className="active">
        <Link to={privateRoutes.settingsLiveChat}>Live Chats</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsEmailTickets}>Email Tickets</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsCalendar}>Calendars</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsMessengers}>Mesenggers</Link>
      </li>
    </ul>

    {/* second list */}

    <ul>
      <li className="heading">General</li>
      <li>
        <Link to={privateRoutes.settingsQuickResponse}>Quick Response</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsQuickResponse}>Operators</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsDepartments}>Departements</Link>
      </li>{" "}
      <li>
        <Link to={privateRoutes.settingsIntegration}>Integration</Link>
      </li>{" "}
      <li>
        <Link to={privateRoutes.settingsEmailSetup}>Email Setup</Link>
      </li>
    </ul>

    {/* third list */}
    <ul>
      <li className="heading">Personal</li>
      <li>
        <Link to={privateRoutes.settingsAccount}>Account</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsNotifications}>Notifications</Link>
      </li>
      <li>
        <Link to={privateRoutes.settingsOperatingHours}>Operation Hours</Link>
      </li>
    </ul>
  </div>
);

export default SettingsSidebar;
