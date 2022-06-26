import { httpFetchVisitors } from "api/visitor";
import flags from "App/Utils/countryFlags";
import { DateTime } from "luxon";
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

  const mapData = {
    CN: 100000,
    IN: 9900,
    SA: 86,
    EG: 70,
    SE: 0,
    FI: 0,
    FR: 0,
    US: 20,
    pk: 20
  };

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
                        <a href="http://palevay.com">http://palevay.com</a>
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
                  <li>STATES</li>
                  <li>Orders</li>
                  <li>Sales</li>
                </ul>
                <ul className="table-body">
                  <ul className="row grid-col-3">
                    <li>United States</li>
                    <li>23,890</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>Germany</li>
                    <li>16,890</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>Japan</li>
                    <li>12,900</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>Portugal</li>
                    <li>9,800</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>Rusia</li>
                    <li>11,890</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>France</li>
                    <li>8,099</li>
                    <li>$3,900</li>
                  </ul>
                  <ul className="row grid-col-3">
                    <li>Spain</li>
                    <li>23,890</li>
                    <li>$3,900</li>
                  </ul>
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
