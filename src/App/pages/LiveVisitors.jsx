import { httpGetChartStats } from "api/dashboard";
import { httpFetchVisitors } from "api/visitor";
import countries from "App/Utils/countries.json";
import flags from "App/Utils/countryFlags";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { VectorMap } from "react-jvectormap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { privateRoutes } from "routes/routes";
import GermanyFlag from "../../Assets/img/flag-germany.png";
import LeftArrow from "../../Assets/img/left-contact.png";
import FireFox from "../../Assets/img/logos_firefox.png";
import RightArrow from "../../Assets/img/right-contact.png";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function LiveVisitors() {
  const navigate = useNavigate();

  const [traffic, setTraffic] = useState([]);
  const [mapData, setMapData] = useState({});

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
  } = useQuery(["chartStats", "Last 7 Days"], () => httpGetChartStats("Last 7 Days"), {
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

  useEffect(() => {
    let dt = [];
    visitsByCountry.forEach((c, index) => {
      if (c) {
        dt.push({
          country: c,
          visits: visitsByCountryData[index]
        });
      }
    });
    setTraffic(dt);

    let md = {};
    visitsByCountry.forEach((a, i) => {
      let country = countries.filter((c) => c.name === a);
      if (country?.length) {
        md[country[0].countryCode] = visitsByCountryData[i];
      }
    });

    setMapData(md);
  }, [visitsByCountry]);

  const status = "online";

  const {
    data: { visitors, limit, page, total },
    refetch
  } = useQuery(["visitors", status], () => httpFetchVisitors(status), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0
    }
  });

  console.log(visitors);

  return (
    <div className="LiveVisitors main-wrapper  d-flex">
      {/* sidebar */}
      <Sidebar active="LiveVisitor" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="LiveVisitor" page="Live Visitors" />
        <div className="body-main-area">
          <div className="grid-box-area visitor-grid grid-col-3">
            <div className="visitors-in-site">
              <div className="top-area d-flex-align-center">
                <h4>Visitors on your site at the moment</h4>
                <div className="slider-area  d-flex-align-center">
                  <p>
                    <span>{(page - 1) * limit + 1}</span> -{" "}
                    <span>{total > page * limit ? page * limit : total}</span> of{" "}
                    <span>{total}</span>
                  </p>
                  <div className="slider-images d-flex-align-center">
                    <img src={LeftArrow} alt="" />
                    <img src={RightArrow} alt="" />
                  </div>
                </div>
              </div>
              <div className="table" style={{ overflowY: "auto" }}>
                <ul className="table-head">
                  <li>No</li>
                  <li>Name</li>
                  <li>Entered</li>
                  <li>Last Visited Page</li>
                  <li>Country/Device</li>
                </ul>

                <ul className="table-body">
                  {visitors?.map((visitor, index) => (
                    <div key={visitor?.uuid} className="row">
                      <li>{index + 1}.</li>
                      <li>
                        <div className="tag" style={{ background: visitor?.color || "red" }}>
                          {visitor?.name?.replace("#", "").charAt(0).toUpperCase()}
                        </div>
                        <div className="presentation">
                          <h5 className="pt-2">{visitor?.name}</h5>
                          {/* <p>New</p> */}
                        </div>
                      </li>
                      <li>{DateTime.fromISO(visitor?.timestamp).toFormat("DD")}</li>
                      <li>
                        <a target={"_blank"} href="http://palevay.com">
                          http://palevay.com
                        </a>
                      </li>
                      <li>
                        <div className="icons-wrapper">
                          <img
                            src={
                              visitor?.country
                                ? flags?.filter((f) => f.CountryName === visitor?.country)[0].Flag
                                : GermanyFlag
                            }
                            alt=""
                          />
                          <img src={FireFox} alt="" />
                        </div>

                        <button
                          onClick={() => navigate(`${privateRoutes.liveChat}/${visitor?.uuid}`)}
                        >
                          Start Chat
                        </button>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            <div className="traffic-channels">
              <h4>Traffic Channels</h4>
              <div className="table">
                <ul className="table-head grid-col-3">
                  <li>Country</li>
                  <li>Unique Visits</li>
                </ul>
                <ul className="table-body">
                  {traffic?.map((t) => (
                    <ul key={t?.country} className="row grid-col-3">
                      <li className="d-flex-align-center">
                        <img
                          src={
                            t?.country
                              ? flags?.filter((f) => f.CountryName === t?.country)[0].Flag
                              : ""
                          }
                          alt=""
                          className="flag me-2"
                          style={{ width: "25px" }}
                        />
                        <span>{t?.country}</span>
                      </li>
                      <li>{t?.visits}</li>
                    </ul>
                  ))}
                </ul>
              </div>
            </div>

            <div className="map-area">
              <h4>Visitors Analytics</h4>
              <div style={{ height: 300 }} className="map">
                <VectorMap
                  map={"world_mill"}
                  backgroundColor="#fff"
                  zoomOnScroll={false}
                  regionStyle={{
                    initial: {
                      fill: "#dfe1f7"
                    },
                    hover: {
                      fill: "#7822e6"
                    },
                    selected: {
                      fill: "#7822e6"
                    }
                  }}
                  series={{
                    regions: [
                      {
                        values: mapData, //this is your data
                        scale: ["#7822e6"], //your color game's here
                        normalizeFunction: "polynomial"
                      }
                    ]
                  }}
                  regionsSelectable={true}
                  containerStyle={{
                    width: "100%",
                    height: "100%"
                  }}
                  containerClassName="map"
                />
              </div>
            </div>

            {/* chart area */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveVisitors;
