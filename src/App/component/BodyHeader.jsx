import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { httpGetUser } from "api/auth";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { privateRoutes } from "routes/routes";
import { logout } from "utilities/network";
import { BASIC } from "utilities/plans";
function BodyHeader({ active, page = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="BodyHeader d-flex-align-center">
      <ul className="bottom-header d-flex-align-center" style={{ marginBottom: 0 }}>
        <li className={`${active === "LiveChat" && "active"}`}>
          <Link to={privateRoutes.liveChat}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.1658 23.8425L26.7183 28.3192C26.86 29.495 25.5992 30.3167 24.5933 29.7075L19.6917 26.7892C19.3517 26.5908 19.2667 26.1658 19.4508 25.8258C20.1592 24.5225 20.5417 23.0492 20.5417 21.5758C20.5417 16.3908 16.0933 12.1692 10.625 12.1692C9.50584 12.1692 8.415 12.3392 7.395 12.6792C6.87084 12.8492 6.36084 12.3675 6.48834 11.8292C7.7775 6.67251 12.7358 2.83334 18.6575 2.83334C25.5708 2.83334 31.1667 8.06084 31.1667 14.5067C31.1667 18.3317 29.1975 21.7175 26.1658 23.8425Z"
                fill="#6A7097"
              />
              <path
                d="M18.4167 21.5758C18.4167 23.2617 17.7933 24.82 16.745 26.0525C15.3425 27.7525 13.1183 28.8433 10.625 28.8433L6.92751 31.0392C6.30418 31.4217 5.51084 30.8975 5.59584 30.175L5.95001 27.3842C4.05168 26.0667 2.83334 23.9558 2.83334 21.5758C2.83334 19.0825 4.16501 16.8867 6.20501 15.5833C7.46584 14.7617 8.98168 14.2942 10.625 14.2942C14.9317 14.2942 18.4167 17.5525 18.4167 21.5758Z"
                fill="#6A7097"
              />
            </svg>
          </Link>
        </li>
        <li className={`${active === "EmailTickets" && "active"}`}>
          <Link to={privateRoutes.emailTickets}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0833 4.95831H9.91668C5.66668 4.95831 2.83334 7.08331 2.83334 12.0416V21.9583C2.83334 26.9166 5.66668 29.0416 9.91668 29.0416H24.0833C28.3333 29.0416 31.1667 26.9166 31.1667 21.9583V12.0416C31.1667 7.08331 28.3333 4.95831 24.0833 4.95831ZM24.7492 13.5858L20.315 17.1275C19.38 17.8783 18.19 18.2466 17 18.2466C15.81 18.2466 14.6058 17.8783 13.685 17.1275L9.25084 13.5858C8.79751 13.2175 8.72668 12.5375 9.08084 12.0841C9.44918 11.6308 10.115 11.5458 10.5683 11.9141L15.0025 15.4558C16.0792 16.32 17.9067 16.32 18.9833 15.4558L23.4175 11.9141C23.8708 11.5458 24.5508 11.6166 24.905 12.0841C25.2733 12.5375 25.2025 13.2175 24.7492 13.5858Z"
                fill="#6A7097"
              />
            </svg>
          </Link>
        </li>

        <li className={`${active === "calender" && "active"}`}>
          <Link to={privateRoutes.calendarBooking}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.7292 5.04331V2.83331C23.7292 2.25248 23.2475 1.77081 22.6667 1.77081C22.0858 1.77081 21.6042 2.25248 21.6042 2.83331V4.95831H12.3958V2.83331C12.3958 2.25248 11.9142 1.77081 11.3333 1.77081C10.7525 1.77081 10.2708 2.25248 10.2708 2.83331V5.04331C6.44584 5.39748 4.59001 7.67831 4.30668 11.0641C4.27834 11.475 4.61834 11.815 5.01501 11.815H28.985C29.3958 11.815 29.7358 11.4608 29.6933 11.0641C29.41 7.67831 27.5542 5.39748 23.7292 5.04331Z"
                fill="#6A7097"
              />
              <path
                d="M28.3333 13.94H5.66667C4.8875 13.94 4.25 14.5775 4.25 15.3567V24.0833C4.25 28.3333 6.375 31.1667 11.3333 31.1667H18.3175C19.295 31.1667 19.975 30.2175 19.6633 29.2967C19.38 28.475 19.1392 27.5683 19.1392 26.9167C19.1392 22.6242 22.6383 19.125 26.9308 19.125C27.3417 19.125 27.7525 19.1533 28.1492 19.2242C28.9992 19.3517 29.7642 18.6858 29.7642 17.8358V15.3708C29.75 14.5775 29.1125 13.94 28.3333 13.94ZM13.0475 25.0892C12.9058 25.2167 12.75 25.3158 12.58 25.3867C12.41 25.4575 12.2258 25.5 12.0417 25.5C11.8575 25.5 11.6733 25.4575 11.5033 25.3867C11.3333 25.3158 11.1775 25.2167 11.0358 25.0892C10.7808 24.82 10.625 24.4517 10.625 24.0833C10.625 23.9983 10.6392 23.8992 10.6533 23.8142C10.6675 23.715 10.6958 23.63 10.7383 23.545C10.7667 23.46 10.8092 23.375 10.8658 23.29C10.9083 23.2192 10.9792 23.1483 11.0358 23.0775C11.1775 22.95 11.3333 22.8508 11.5033 22.78C11.8433 22.6383 12.24 22.6383 12.58 22.78C12.75 22.8508 12.9058 22.95 13.0475 23.0775C13.1042 23.1483 13.175 23.2192 13.2175 23.29C13.2742 23.375 13.3167 23.46 13.345 23.545C13.3875 23.63 13.4158 23.715 13.43 23.8142C13.4442 23.8992 13.4583 23.9983 13.4583 24.0833C13.4583 24.4517 13.3025 24.82 13.0475 25.0892ZM13.0475 20.1308C12.9058 20.2583 12.75 20.3575 12.58 20.4283C12.41 20.4992 12.2258 20.5417 12.0417 20.5417C11.8575 20.5417 11.6733 20.4992 11.5033 20.4283C11.3192 20.3575 11.1775 20.2583 11.0358 20.1308C10.7808 19.8617 10.625 19.4933 10.625 19.125C10.625 18.7567 10.7808 18.3883 11.0358 18.1192C11.1775 17.9917 11.3333 17.8925 11.5033 17.8217C11.8433 17.68 12.24 17.68 12.58 17.8217C12.75 17.8925 12.9058 17.9917 13.0475 18.1192C13.1042 18.19 13.175 18.2608 13.2175 18.3317C13.2742 18.4167 13.3167 18.5017 13.345 18.5867C13.3875 18.6717 13.4158 18.7567 13.43 18.8417C13.4442 18.9408 13.4583 19.04 13.4583 19.125C13.4583 19.4933 13.3025 19.8617 13.0475 20.1308ZM18.0058 20.1308C17.7367 20.3858 17.3825 20.5417 17 20.5417C16.8158 20.5417 16.6317 20.4992 16.4617 20.4283C16.2775 20.3575 16.1358 20.2583 15.9942 20.1308C15.7392 19.8617 15.5833 19.4933 15.5833 19.125C15.5833 19.04 15.5975 18.9408 15.6117 18.8417C15.6258 18.7567 15.6542 18.6717 15.6967 18.5867C15.725 18.5017 15.7675 18.4167 15.8242 18.3317C15.8808 18.2608 15.9375 18.19 15.9942 18.1192C16.5183 17.595 17.4675 17.595 18.0058 18.1192C18.0625 18.19 18.1192 18.2608 18.1758 18.3317C18.2325 18.4167 18.275 18.5017 18.3033 18.5867C18.3458 18.6717 18.3742 18.7567 18.3883 18.8417C18.4025 18.9408 18.4167 19.04 18.4167 19.125C18.4167 19.4933 18.2608 19.8617 18.0058 20.1308Z"
                fill="#6A7097"
              />
              <path
                d="M30.9258 22.9075C28.7158 20.6975 25.1175 20.6975 22.9075 22.9075C20.6975 25.1175 20.6975 28.7158 22.9075 30.9258C25.1175 33.1358 28.7158 33.1358 30.9258 30.9258C33.1358 28.7158 33.1358 25.1175 30.9258 22.9075ZM29.8492 27.71C29.665 27.9083 29.3958 28.0217 29.0983 28.0217H28.05V29.1267C28.05 29.4242 27.9367 29.6792 27.7383 29.8775C27.54 30.0758 27.285 30.1892 26.9875 30.1892C26.4067 30.1892 25.925 29.7075 25.925 29.1267V28.0217H24.8625C24.2817 28.0217 23.8 27.5542 23.8 26.9592C23.8 26.3783 24.2817 25.8967 24.8625 25.8967H25.925V24.8908C25.925 24.31 26.3925 23.8283 26.9875 23.8283C27.5683 23.8283 28.05 24.31 28.05 24.8908V25.8967H29.0983C29.6933 25.8967 30.1608 26.3783 30.1608 26.9592C30.1608 27.2567 30.0475 27.5258 29.8492 27.71Z"
                fill="#6A7097"
              />
            </svg>
          </Link>
        </li>
        <li className={`${active === "settings" && "active"}`}>
          <Link to={privateRoutes.settings}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.4749 13.0616C25.9108 13.0616 24.8624 11.2483 26.1374 9.02412C26.8741 7.73495 26.4349 6.09162 25.1458 5.35495L22.6949 3.95245C21.5758 3.28662 20.1308 3.68328 19.4649 4.80245L19.3091 5.07162C18.0341 7.29578 15.9374 7.29578 14.6483 5.07162L14.4924 4.80245C13.8549 3.68328 12.4099 3.28662 11.2908 3.95245L8.83992 5.35495C7.55075 6.09162 7.11159 7.74912 7.84825 9.03828C9.13742 11.2483 8.08909 13.0616 5.52492 13.0616C4.05159 13.0616 2.83325 14.2658 2.83325 15.7533V18.2466C2.83325 19.72 4.03742 20.9383 5.52492 20.9383C8.08909 20.9383 9.13742 22.7516 7.84825 24.9758C7.11159 26.2649 7.55075 27.9083 8.83992 28.645L11.2908 30.0475C12.4099 30.7133 13.8549 30.3166 14.5208 29.1975L14.6766 28.9283C15.9516 26.7041 18.0483 26.7041 19.3374 28.9283L19.4933 29.1975C20.1591 30.3166 21.6041 30.7133 22.7233 30.0475L25.1741 28.645C26.4633 27.9083 26.9024 26.2508 26.1658 24.9758C24.8766 22.7516 25.9249 20.9383 28.4891 20.9383C29.9624 20.9383 31.1808 19.7341 31.1808 18.2466V15.7533C31.1666 14.28 29.9624 13.0616 28.4749 13.0616ZM16.9999 21.6041C14.4641 21.6041 12.3958 19.5358 12.3958 17C12.3958 14.4641 14.4641 12.3958 16.9999 12.3958C19.5358 12.3958 21.6041 14.4641 21.6041 17C21.6041 19.5358 19.5358 21.6041 16.9999 21.6041Z"
                fill="#6A7097"
              />
            </svg>
          </Link>
        </li>
      </ul>
      <h3>{page}</h3>
      <form className="left-area d-flex-align-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="#9CA2C9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="#9CA2C9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input type="text" placeholder="Search..." />
      </form>

      <div className="right-area d-flex-align-center">
        {user?.company?.plan === BASIC ? (
          <Link to={privateRoutes.plans}>
            <button className="sm-btn">Upgrade</button>
          </Link>
        ) : null}
        <div className="icon-wrapper">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z"
              stroke="#9CA2C9"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z"
              stroke="#9CA2C9"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
              stroke="#9CA2C9"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        <div
          onClick={toggleDropdown}
          className="profile-name-area d-flex-align-center d-flex-justify-center cursor-pointer"
        >
          <p className="pt-2">
            {user?.picture ? (
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  backgroundColor: "transparent"
                }}
                src={user?.picture}
                alt="user"
              />
            ) : (
              <i style={{ fontSize: "30px" }} className="fas fa-user-circle"></i>
            )}
          </p>
          <p className="pt-3">{user?.name}</p>
          <div className="icon-wrapper pt-2">
            <svg
              width="7"
              height="4"
              viewBox="0 0 7 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.44513 3.37805L0 0.621948H6.89025L3.44513 3.37805Z" fill="#282D4A" />
            </svg>
          </div>
        </div>
        <Dropdown isOpen={isOpen} />
      </div>

      <div
        className="burger-icon"
        onClick={(e) => document.querySelector(".Sidebar").classList.toggle("active")}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
}

const Dropdown = ({ isOpen }) =>
  isOpen ? (
    <div
      className="position-absolute bg-white shadow text-start pt-4 rounded"
      style={{
        right: "28px",
        top: "50px",
        padding: "10px 30px"
      }}
    >
      <Link className="cursor-pointer" to={privateRoutes.settingsAccount}>
        <p>My Profile</p>
      </Link>
      <p className="text-start text-primary cursor-pointer" onClick={logout}>
        <span>Logout</span>
      </p>
    </div>
  ) : (
    <div />
  );

export default BodyHeader;
