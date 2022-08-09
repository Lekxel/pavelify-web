import { useQuery } from "react-query";
import { Navigate, Route, Routes as ReactRoutes, useLocation } from "react-router-dom";
import { currentUser } from "utilities/storage";

import Analytics from "App/pages/Analytics";
import CalendarEvents from "App/pages/CalendarEvents";
import CalenderBooking from "App/pages/CalenderBooking";
import Contact from "App/pages/Contact";
import EmailTickets from "App/pages/EmailTickets";
import Home from "App/pages/Home";
import LiveChat from "App/pages/LiveChat";
import LiveVisitors from "App/pages/LiveVisitors";
import Operators from "App/pages/Operators";
import Settings from "App/pages/Settings";

// front page
import HomePage from "App/pages/FrontPages/HomePage/HomePage";
import Login from "App/pages/FrontPages/Plus/Auth/Login/Login";
import Register from "App/pages/FrontPages/Plus/Auth/Register/Register";
import { Calender } from "App/pages/FrontPages/Plus/Calender/Calender";
import Careers from "App/pages/FrontPages/Plus/Careers/Careers";
import Features from "App/pages/FrontPages/Plus/Features/Features";
import Pricing from "App/pages/FrontPages/Plus/Pricing/Pricing";
import PrivacyPolicy from "App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
import Terms from "App/pages/FrontPages/Plus/Terms/Terms";
// import { ConfirmationPopUpCalender } from "App/pages/FrontPages/Plus/ConfirmationPopUpCalender/ConfirmationPopUpCalender";
import Home_Desk from "App/pages/Home_Desk";
import Plans from "App/pages/Plans";

import { httpGetUser } from "api/auth";
import LiveChatWidget from "App/component/templates/LiveChat/LiveChat";
import ConfirmResetPassword from "App/pages/FrontPages/Plus/Auth/Login/ConfirmResetPassword";
import ForgotPassword from "App/pages/FrontPages/Plus/Auth/Login/ForgotPassword";
import Ticket from "App/pages/Ticket";
import Logout from "helpers/Logout";
import Redirect from "helpers/Redirect";
import useGetSubdomain from "hooks/useGetSubdomain";
import { privateRoutes, publicRoutes } from "routes/routes";

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
    case publicRoutes.app:
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
          <Route
            path={publicRoutes.forgotPassword}
            element={
              <Redirect
                url={`${window.location.protocol}//${privateRoutes.app}.${domain}${publicRoutes.forgotPassword}${window.location?.search}`}
              />
            }
          />
          <Route
            path={publicRoutes.confirmResetPassword}
            element={
              <Redirect
                url={`${window.location.protocol}//${privateRoutes.app}.${domain}${publicRoutes.confirmResetPassword}${window.location?.search}`}
              />
            }
          />
          <Route path={publicRoutes.livechatWidget} element={<LiveChatWidget />} />
        </>
      );

    case publicRoutes.meeting:
      return <Route path={publicRoutes.bookCalendar} element={<Calender />} />;
    case privateRoutes.app:
      return (
        <>
          <Route path={publicRoutes.login} element={<Login />} />
          <Route path={publicRoutes.register} element={<Register />} />
          <Route path={publicRoutes.forgotPassword} element={<ForgotPassword />} />
          <Route path={publicRoutes.confirmResetPassword} element={<ConfirmResetPassword />} />
          <Route path={privateRoutes.logout} element={<Logout />} />

          <Route
            path={privateRoutes.dashboard}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path={privateRoutes.liveChat}>
            <Route
              path={""}
              element={
                <RequireAuth>
                  <LiveChat />
                </RequireAuth>
              }
            />
            <Route
              path={":uuid"}
              element={
                <RequireAuth>
                  <LiveChat />
                </RequireAuth>
              }
            />
          </Route>

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

          <Route path={privateRoutes.calendarBooking}>
            <Route
              path={""}
              element={
                <RequireAuth>
                  <CalenderBooking />
                </RequireAuth>
              }
            />
            <Route
              path={":status"}
              element={
                <RequireAuth>
                  <CalenderBooking />
                </RequireAuth>
              }
            />
          </Route>

          <Route
            path={privateRoutes.calendarEvents}
            element={
              <RequireAuth>
                <CalendarEvents />
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

          <Route path={privateRoutes.contacts}>
            <Route
              path={""}
              element={
                <RequireAuth>
                  <Contact />
                </RequireAuth>
              }
            />
            <Route
              path={":channel"}
              element={
                <RequireAuth>
                  <Contact />
                </RequireAuth>
              }
            />
          </Route>

          <Route path={privateRoutes.emailTickets}>
            <Route
              path={""}
              element={
                <RequireAuth>
                  <EmailTickets />
                </RequireAuth>
              }
            />
            <Route
              path={":status"}
              element={
                <RequireAuth>
                  <EmailTickets />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path={`${privateRoutes.ticket}/:ticketID`}
            element={
              <RequireAuth>
                <Ticket />
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
            path={privateRoutes.plans}
            element={
              <RequireAuth>
                <Plans />
              </RequireAuth>
            }
          />

          <Route path={privateRoutes.settings}>
            <Route
              path=""
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
            <Route
              path=":page"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
          </Route>

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
