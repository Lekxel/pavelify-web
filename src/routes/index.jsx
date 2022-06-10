import { Routes as ReactRoutes, Route, Navigate, useLocation, R } from "react-router-dom";
import { currentUser } from "utilities/storage";
import { useQuery } from "react-query";

import Settings from "App/pages/Settings";
import SettingsAccount from "App/pages/SettingsAccount";
import SettingsOperatingHours from "App/pages/SettingsOperatingHours";
import SettingsIntegrations from "App/pages/SettingsIntegrations";
import SettingsNotification from "App/pages/SettingsNotification";
import Contact from "App/pages/Contact";
import EmailTickets from "App/pages/EmailTickets";
import Operators from "App/pages/Operators";
import LiveChat from "App/pages/LiveChat";
import LiveVisitors from "App/pages/LiveVisitors";
import Home from "App/pages/Home";
import Analytics from "App/pages/Analytics";
import CalenderBooking from "App/pages/CalenderBooking";

// front page
import HomePage from "App/pages/FrontPages/HomePage/HomePage";
import Pricing from "App/pages/FrontPages/Plus/Pricing/Pricing";
import Features from "App/pages/FrontPages/Plus/Features/Features";
import Careers from "App/pages/FrontPages/Plus/Careers/Careers";
import PrivacyPolicy from "App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
import Terms from "App/pages/FrontPages/Plus/Terms/Terms";
import Login from "App/pages/FrontPages/Plus/Auth/Login/Login";
import Register from "App/pages/FrontPages/Plus/Auth/Register/Register";
// import { Calender } from "App/pages/FrontPages/Plus/Calender/Calender";
// import { ConfirmationPopUpCalender } from "App/pages/FrontPages/Plus/ConfirmationPopUpCalender/ConfirmationPopUpCalender";
import Home_Desk from "App/pages/Home_Desk";
import SettingsEmailSetup from "App/pages/SettingsEmailSetup";

import { privateRoutes, publicRoutes } from "routes/routes";
import useGetSubdomain from "hooks/useGetSubdomain";
import Redirect from "helpers/Redirect";
import { httpGetUser } from "api/auth";
import Logout from "helpers/Logout";

export function RequireAuth({ children }) {
  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: { user: currentUser() }
  });
  const location = useLocation();

  if (!user?._id) {
    return <Navigate to={publicRoutes.login} state={{ from: location }} />;
  }

  return children;
}

const Switch = () => {
  const { subdomain, domain } = useGetSubdomain();

  switch (subdomain) {
    case null || "":
      return (
        <>
          <Route path={publicRoutes.home} element={<HomePage />} />
          <Route path={publicRoutes.features} element={<Features />} />
          <Route path={publicRoutes.pricing} element={<Pricing />} />
          <Route path={publicRoutes.careers} element={<Careers />} />
          <Route path={publicRoutes.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={publicRoutes.terms} element={<Terms />} />
          <Route
            path={publicRoutes.login}
            element={
              <Redirect
                url={`${window.location.protocol}//${privateRoutes.app}.${domain}${publicRoutes.login}${window.location?.search}`}
              />
            }
          />
          <Route
            path={publicRoutes.register}
            element={
              <Redirect
                url={`${window.location.protocol}//${privateRoutes.app}.${domain}${publicRoutes.register}${window.location?.search}`}
              />
            }
          />
        </>
      );
    case "app":
      return (
        <>
          <Route path={publicRoutes.login} element={<Login />} />
          <Route path={publicRoutes.register} element={<Register />} />

          <Route path={privateRoutes.logout} element={<Logout />} />

          <Route
            path={privateRoutes.dashboard}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path={privateRoutes.liveChat}
            element={
              <RequireAuth>
                <LiveChat />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.liveVisitors}
            element={
              <RequireAuth>
                <LiveVisitors />
              </RequireAuth>
            }
          />
          <Route
            path={privateRoutes.analytics}
            element={
              <RequireAuth>
                <Analytics />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.calendarBooking}
            element={
              <RequireAuth>
                <CalenderBooking />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.contacts}
            element={
              <RequireAuth>
                <Contact />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.emailTickets}
            element={
              <RequireAuth>
                <EmailTickets />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.helpDesk}
            element={
              <RequireAuth>
                <Home_Desk />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.operators}
            element={
              <RequireAuth>
                <Operators />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settings}
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settingsAccount}
            element={
              <RequireAuth>
                <SettingsAccount />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settingsEmailSetup}
            element={
              <RequireAuth>
                <SettingsEmailSetup />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settingsIntegration}
            element={
              <RequireAuth>
                <SettingsIntegrations />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settingsNotifications}
            element={
              <RequireAuth>
                <SettingsNotification />
              </RequireAuth>
            }
          />

          <Route
            path={privateRoutes.settingsOperatingHours}
            element={
              <RequireAuth>
                <SettingsOperatingHours />
              </RequireAuth>
            }
          />
          <Route path={"*"} element={<Navigate to={privateRoutes.dashboard} />} />
        </>
      );

    default:
      return <Route path={"*"} element={<Login />} />;
  }
};

function Routes() {
  return <ReactRoutes>{Switch()}</ReactRoutes>;
}

export default Routes;
