import { httpGetChartStats } from "api/dashboard";
import { httpFetchVisitors } from "api/visitor";
import countries from "App/Utils/countries.json";
import flags from "App/Utils/countryFlags";
import Pagination from "App/Utils/Pagination";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { VectorMap } from "react-jvectormap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { privateRoutes } from "routes/routes";
import { lastItemInArray } from "utilities/misc";
import FireFox from "../../Assets/img/logos_firefox.png";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function LiveVisitors() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
    data: { visitors, limit, page, total, totalPages },
    refetch
  } = useQuery(
    ["visitors", status, currentPage],
    () => httpFetchVisitors(status, "", currentPage),
    {
      initialData: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1
      },
      keepPreviousData: true
    }
  );
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
                <Pagination
                  setPage={setCurrentPage}
                  page={page}
                  limit={limit}
                  total={total}
                  totalPages={totalPages}
                />
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
                      <li>{page * limit - limit + index + 1}.</li>
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
                        {visitor?.visits?.length ? (
                          <a
                            target="_blank"
                            href={lastItemInArray(visitor?.visits)?.url}
                            className="link"
                          >
                            {lastItemInArray(visitor?.visits)?.url}{" "}
                          </a>
                        ) : null}
                      </li>
                      <li>
                        <div className="icons-wrapper">
                          {visitor?.country ? (
                            <img
                              style={{ width: "30px" }}
                              src={`https://countryflagsapi.com/png/${visitor?.country}`}
                              alt="flag"
                            />
                          ) : (
                            <span />
                          )}
                          <img
                            style={{ width: "30px" }}
                            src={visitor?.browser ? `images/${visitor?.browser}.png` : FireFox}
                            alt="browser"
                          />
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
