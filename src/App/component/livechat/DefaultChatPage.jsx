import CalendarIcon from "Assets/img/calender-purple.png";
import AppIcon from "Assets/img/checkmark.png";
import ChatIcon from "Assets/img/green-message.png";
import SupportIcon from "Assets/img/live-chat.png";
import TeamIcon from "Assets/img/message-blue.png";
import Logo from "Assets/img/Pavelify.png";
import UserIcon from "Assets/img/user.png";
import InitialsImage from "helpers/InitialsImage";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { privateRoutes } from "routes/routes";

const DefaultChatPage = () => (
  <div className="middle-side">
    <div className="contact-area">
      <div className="top-area d-flex-align-center">
        <h3>Contacts</h3>
        <div className="icon-wrapper">
          <svg
            width="22"
            height="5"
            viewBox="0 0 22 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.0625" cy="2.0625" r="2.0625" fill="#282D4A" />
            <circle cx="11" cy="2.0625" r="2.0625" fill="#282D4A" />
            <circle cx="19.9375" cy="2.0625" r="2.0625" fill="#282D4A" />
          </svg>
        </div>
      </div>

      <div className="contact-images d-flex-align-center">
        <InitialsImage width={"40px"} height="40px" name={"A"} />
        <InitialsImage width={"40px"} height="40px" color={"orange"} name={"B"} />
        <InitialsImage width={"40px"} height="40px" color={"red"} name={"C"} />
        <InitialsImage width={"40px"} height="40px" color={"purple"} name={"D"} />
        <InitialsImage width={"40px"} height="40px" color={"indigo"} name={"E"} />
        <div className="add-contact">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="17.5" stroke="#7822E6" strokeOpacity="0.12" />
            <path d="M17.75 11V24.5" stroke="#7822E6" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 17.75H24.5" stroke="#7822E6" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>

    <div className="messages-container-wrapper position-relative px-4">
      <div className="d-flex-align-center cursor-pointer mt-3">
        <div
          style={{
            background: "#0F1957",
            borderRadius: "50%",
            height: "42px",
            width: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px"
          }}
          className="images_wrapper"
        >
          <img
            src={Logo}
            style={{
              width: "40px",
              objectFit: "contain"
            }}
            alt=""
          />
        </div>
        <div style={{ marginRight: "5px" }}>
          <div className="left-side">
            <h4>Pavelify Team</h4>
          </div>
        </div>
        <p className="pt-2 ms-2">{DateTime.now().toFormat("t")}</p>
      </div>

      <div className="mt-4" style={{ color: "grey" }}>
        <p>Hey there, welcome to Pavelify.</p>
        <p className="mt-2">
          Here are a few things to get started. We hope you enjoy Pavelify and we look forward to
          supporting you should you have any questions or need any assistance.
        </p>
      </div>

      <div className="mt-4">
        <p className="d-flex-align-center mb-3">
          <img
            src={ChatIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.settingsLiveChat}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Install the live chat widget to chat with your site visitors
            </span>
          </Link>
        </p>

        <p className="d-flex-align-center mb-3">
          <img
            src={UserIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.settingsAccount}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Upload a profile photo and update your profile
            </span>
          </Link>
        </p>

        <p className="d-flex-align-center mb-3">
          <img
            src={SupportIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.settingsEmailSetup}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Connect your support email to reply to customers
            </span>
          </Link>
        </p>

        <p className="d-flex-align-center mb-3">
          <img
            src={CalendarIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.calendarBooking}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Setup appointments scheduling
            </span>
          </Link>
        </p>

        <p className="d-flex-align-center mb-3">
          <img
            src={TeamIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.operators}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Add team members/operators
            </span>
          </Link>
        </p>

        <p className="d-flex-align-center mb-3">
          <img
            src={AppIcon}
            style={{
              width: "30px",
              objectFit: "contain"
            }}
            alt=""
          />
          <Link to={privateRoutes.settingsIntegration}>
            <span
              style={{
                textDecoration: "underline",
                marginLeft: "8px",
                color: "#333"
              }}
            >
              Integrate your apps
            </span>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default DefaultChatPage;
