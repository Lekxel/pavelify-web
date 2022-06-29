import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

import { httpGetUser } from "api/auth";
import { httpFetchStats, httpGetChartStats } from "api/dashboard";
import { httpFetchVisitors } from "api/visitor";
import InitialsImage from "helpers/InitialsImage";
import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { privateRoutes } from "routes/routes";
import { moneyFormat } from "utilities/misc";
import ArrowRight from "../../Assets/img/arrow-right.png";
import CalenderPurple from "../../Assets/img/calender-purple.png";
import ChatGreen from "../../Assets/img/chat-green.png";
import Checkmark from "../../Assets/img/checkmark.png";
import GreenMessage from "../../Assets/img/green-message.png";
import LiveChat from "../../Assets/img/live-chat.png";
import MessageBlue from "../../Assets/img/message-blue.png";
import OrangeCalender from "../../Assets/img/orangecalender.svg";
import { filterOptions, Lineoptions, options } from "../Utils/DashboardChart";

function Home() {
  const [filterOption, setFilterOption] = useState(filterOptions[0]);
  const navigate = useNavigate();

  const {
    data: { visitors },
    refetch
  } = useQuery("visitors", () => httpFetchVisitors("", true), {
    initialData: {
      limit: 20,
      page: 1,
      total: 0
    }
  });

  const [lineData, setLineData] = useState({
    labels: [],
    data: []
  });

  const {
    data: {
      stats: {
        labels: chartLabel,
        data: chartData,
        visitsByCountry,
        visitsByCountryData,
        totalUniqueVisitors
      }
    }
  } = useQuery(["chartStats", filterOption], () => httpGetChartStats(filterOption), {
    initialData: {
      stats: {
        labels: [],
        data: [],
        visitsByCountry: [],
        visitsByCountryData: [],
        totalUniqueVisitors: 0
      }
    }
  });

  let Linedata = (canvas) => {
    let CTX = document.querySelector(".chart-line canvas").getContext("2d");
    let gradient = CTX.createLinearGradient(0, 140, 0, 220);
    gradient.addColorStop(0, "#D1E9F7");

    gradient.addColorStop(1, "#ECF6FC");

    return {
      labels: lineData?.data ? [...lineData?.labels] : [],
      datasets: [
        {
          label: "Unique Visits",
          data: lineData?.data ? [...lineData?.data] : [],
          fill: true,

          backgroundColor: gradient,
          borderColor: "#2D98DA"
        }
      ]
    };
  };

  const data = {
    labels: [...visitsByCountry],
    datasets: [
      {
        label: "# of Unique Visits",
        data: [...visitsByCountryData],
        backgroundColor: ["#9953B7", "#18AB8F", "#2D96D6", "#EEF0F6"],
        hoverOffset: 5,
        borderColor: ["#9953B7", "#18AB8F", "#2D96D6", "#EEF0F6"],
        borderWidth: 1,
        cutout: 80
      }
    ]
  };

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  const {
    data: { stats }
  } = useQuery("stats", httpFetchStats, {
    initialData: {
      chatCount: 0,
      calendarCount: 0,
      emailCount: 0
    }
  });

  useEffect(() => {
    setLineData({
      labels: chartLabel,
      data: chartData
    });
  }, [filterOption, chartLabel]);

  return (
    <div className="Home main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="home" />
      <div className="body-area">
        {/* header */}
        <BodyHeader page="Dashboard" />

        <div className="body-main-area">
          <div className="top-banner-results">
            <div className="box">
              <h4 className="heading">Company Name</h4>
              <p>{user?.company?.companyName}</p>
            </div>
            <div className="box d-flex-align-center">
              <img src={ChatGreen} alt="" />

              <div className="presentation">
                <h4 className="heading">Chat Leads Acquired</h4>
                <p>{moneyFormat(stats?.chatCount)}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={CalenderPurple} alt="" />
              <div className="presentation">
                <h4 className="heading">Total Email Tickets</h4>
                <p>{moneyFormat(stats?.emailCount)}</p>
              </div>
            </div>
            <div className="box d-flex-align-center">
              <img src={MessageBlue} alt="" />
              <div className="presentation">
                <h4 className="heading">Calendar Booking</h4>
                <p>{moneyFormat(stats?.calendarCount)}</p>
              </div>
            </div>
          </div>

          <div className="bottom-area">
            <div className="chart-line-wrapper">
              <div className="top d-flex-align-center">
                <h3>Analytics</h3>
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  name=""
                  id=""
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="chart-line" style={{ marginTop: 30, height: 280 }}>
                <Line data={Linedata} options={Lineoptions} />
              </div>
            </div>

            <div className="todo-list">
              <div className="top d-flex-align-center">
                <h3>Todo Lists</h3>
                <Link to={privateRoutes.settings}>
                  <a>See All</a>
                </Link>
              </div>
              <ul className="bottom">
                <li className="d-flex-align-center">
                  <img src={LiveChat} alt="" />
                  <p>Configure Live chat </p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.livechatConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>
                <li className="d-flex-align-center">
                  <img src={GreenMessage} alt="" />
                  <p>Configure Email Ticketing</p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.emailTicketConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>
                <li className="d-flex-align-center">
                  <div className="icon-wrapper orange">
                    <img src={OrangeCalender} alt="" />
                  </div>
                  <p>Configure Calendar Meeting</p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.calendarConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>

                <li className="d-flex-align-center ">
                  <div className="icon-wrapper messenger">
                    <i className="fab fa-facebook-messenger"></i>
                  </div>
                  <p>Integrate Messenger</p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.messengerConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>
                <li className="d-flex-align-center">
                  <div className="icon-wrapper hours">
                    <i className="fas fa-hourglass-start"></i>
                  </div>
                  <p>Set Operating Hours</p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.operatingHoursConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>
                <li className="d-flex-align-center">
                  <div className="icon-wrapper contacts">
                    <i className="far fa-address-book"></i>
                  </div>
                  <p>Import Contacts</p>
                  <a href="#">
                    <img
                      src={
                        user?.company?.configuration?.todolist?.contactsConfigured
                          ? Checkmark
                          : ArrowRight
                      }
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </div>

            <div className="dognut-chart">
              <div className="top d-flex-align-center">
                <h3>Charts</h3>
                <div className="dots">
                  <svg
                    width="22"
                    height="6"
                    viewBox="0 0 22 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2.0625" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="11" cy="3" r="2.0625" fill="#282D4A" />
                    <circle cx="19.9375" cy="3" r="2.0625" fill="#282D4A" />
                  </svg>
                </div>
              </div>

              <div className="chart-container">
                <p>
                  {totalUniqueVisitors} <span>Visitors</span>
                </p>
                <Doughnut data={data} options={options} />
              </div>
            </div>

            <div className="Customer-Lists">
              <div className="top d-flex-align-center">
                <h3>Customer Lists</h3>
                <a onClick={() => navigate(privateRoutes.liveChat)}>See All</a>
              </div>
              <ul className="bottom">
                {visitors?.map((EachVisitor) => (
                  <li className="d-flex-align-center">
                    {EachVisitor.picture ? (
                      <img src={EachVisitor.picture} alt="" />
                    ) : (
                      <InitialsImage name={EachVisitor?.name} color={EachVisitor?.color} />
                    )}
                    <div className="presentation">
                      <p>{EachVisitor?.name}</p>
                      <p>{EachVisitor?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`${privateRoutes.liveChat}/${EachVisitor?.uuid}`)}
                    >
                      Contact
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
