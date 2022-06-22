import { httpGetUser } from "api/auth";
import { httpUpdateCompany } from "api/company";
import useGetSubdomain from "hooks/useGetSubdomain";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { showSuccess } from "utilities/alerts";

const SettingsLiveChat = () => {
  const { domain } = useGetSubdomain();
  const [preChat, setPreChat] = useState({});
  const [sidebar, setSidebar] = useState({});
  const [appearance, setAppearance] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  useEffect(() => {
    user?.company?.configuration?.chatConfiguration?.preChat &&
      setPreChat(JSON.parse(user?.company?.configuration?.chatConfiguration?.preChat));
    user?.company?.configuration?.chatConfiguration?.sidebar &&
      setSidebar(JSON.parse(user?.company?.configuration?.chatConfiguration?.sidebar));
    user?.company?.configuration?.chatConfiguration?.appearance &&
      setAppearance(JSON.parse(user?.company?.configuration?.chatConfiguration?.appearance));
  }, [user?.company]);

  const submitConfiguration = () => {
    setLoading(true);

    const data = {
      configuration: {
        chatConfiguration: {
          preChat: JSON.stringify(preChat),
          sidebar: JSON.stringify(sidebar),
          appearance: JSON.stringify(appearance)
        }
      }
    };

    httpUpdateCompany(data)
      .then((res) => {
        setLoading(false);
        if (res.success) {
          showSuccess(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="right-side">
      <h2>Live Chats</h2>
      <ul>
        <li>
          <div className="head d-flex-align-center">
            <p>Installation</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" strokeWidth="2" />
            </svg>
          </div>
          <div action="" className="body">
            <div className="container text-center">
              <h5>
                Paste this on every page of your website you want the live chat widget to appear:
              </h5>
              <div className="form-group mb-3 mt-1">
                <textarea
                  readOnly
                  className="form-control"
                  style={{ height: "150px", fontSize: "11px" }}
                  cols="50"
                  rows="10"
                  value={`<script>
! function(e, t) {
	e.chatID = "${user?.company?._id}";
	var a = t.createElement("script");
	a.type = "text/javascript", a.async = !0, a.src = "${window.location.protocol}//${domain}/embed.js";
	var c = t.getElementsByTagName("script")[0];
	c.parentNode.insertBefore(a, c)
}(window, document);
</script>`}
                ></textarea>
              </div>
              {/* <h3>You can also use the direct link:</h3>
              <textarea
                readOnly
                name=""
                id=""
                cols="50"
                rows="10"
                value={`${window.location.protocol}//livechat.${domain}/${user?.company?._id}`}
              ></textarea> */}
            </div>
          </div>
        </li>
        <li>
          <div className="head d-flex-align-center">
            <p>Pre Chat Survey</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" strokeWidth="2" />
            </svg>
          </div>

          <div className="body">
            {/* first part */}
            <div className="wrapper">
              <h5>Display</h5>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="display-checkbox"
                    checked={preChat?.display || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        display: e.target.checked
                      }))
                    }
                  />
                  <label htmlFor="display-checkbox">
                    <span className="ball"></span>
                  </label>
                  <p>Message</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Please introduce yourself.:"
                    value={preChat?.introductionMessage || ""}
                    id="message"
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        introductionMessage: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* second part */}

            <div className="wrapper">
              <h5>Survey Fields</h5>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-1"
                    checked={preChat?.surveyFields?.name?.enabled || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          name: {
                            ...pre.surveyFields.name,
                            enabled: e.target.checked
                          }
                        }
                      }))
                    }
                  />
                  <label htmlFor="survey-1">
                    <span className="ball"></span>
                  </label>
                  <p>Name</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={preChat?.surveyFields?.name?.placeholder || ""}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          name: {
                            ...pre.surveyFields.name,
                            placeholder: e.target.value
                          }
                        }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-2"
                    checked={preChat?.surveyFields?.email?.enabled || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          email: {
                            ...pre.surveyFields.email,
                            enabled: e.target.checked
                          }
                        }
                      }))
                    }
                  />
                  <label htmlFor="survey-2">
                    <span className="ball"></span>
                  </label>
                  <p>Email</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your email..."
                    value={preChat?.surveyFields?.email?.placeholder || ""}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          email: {
                            ...pre.surveyFields.email,
                            placeholder: e.target.value
                          }
                        }
                      }))
                    }
                  />
                </div>
              </div>

              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="survey-3"
                    checked={preChat?.surveyFields?.phoneNumber?.enabled || false}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          phoneNumber: {
                            ...pre.surveyFields.phoneNumber,
                            enabled: e.target.checked
                          }
                        }
                      }))
                    }
                  />
                  <label htmlFor="survey-3">
                    <span className="ball"></span>
                  </label>
                  <p>Phone Number</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Enter your phone number..."
                    value={preChat?.surveyFields?.phoneNumber?.placeholder || ""}
                    onChange={(e) =>
                      setPreChat((pre) => ({
                        ...pre,
                        surveyFields: {
                          ...pre.surveyFields,
                          phoneNumber: {
                            ...pre.surveyFields.phoneNumber,
                            placeholder: e.target.value
                          }
                        }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <button className="sm-btn" type="button" onClick={submitConfiguration}>
              Save Settings
            </button>
          </div>
        </li>
        <li>
          <div className="head d-flex-align-center">
            <p>Appearance</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" strokeWidth="2" />
            </svg>
          </div>
          <div action="" className="body">
            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="showButtonLabel"
                    checked={appearance?.showButtonLabel || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        showButtonLabel: e.target.checked
                      }))
                    }
                  />
                  <label htmlFor="showButtonLabel">
                    <span className="ball"></span>
                  </label>
                  <p>Button Label</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    placeholder="Button Label Text"
                    value={appearance?.buttonLabelText || ""}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        buttonLabelText: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="enableSound"
                    checked={appearance?.enableSound || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        enableSound: e.target.checked
                      }))
                    }
                  />
                  <label htmlFor="enableSound">
                    <span className="ball"></span>
                  </label>
                  <p>Enable Sound</p>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Widget Position</p>
                </div>
                <div className="right-side">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center"
                    }}
                  >
                    <input
                      type="radio"
                      style={{ width: "30px" }}
                      name="btnradio"
                      id="btnLeft"
                      autoComplete="off"
                      checked={appearance?.widgetPosition === "left"}
                      onChange={(e) =>
                        setAppearance((pre) => ({
                          ...pre,
                          widgetPosition: e.target.checked ? "left" : "right"
                        }))
                      }
                    />
                    <label className="btn-outline-primary" htmlFor="btnLeft">
                      Left
                    </label>

                    <input
                      name="btnradio"
                      type="radio"
                      style={{ width: "30px", marginRight: "20px" }}
                      id="btnRight"
                      autoComplete="off"
                      checked={appearance?.widgetPosition === "right"}
                      onChange={(e) =>
                        setAppearance((pre) => ({
                          ...pre,
                          widgetPosition: e.target.checked ? "right" : "left"
                        }))
                      }
                    />
                    <label className="btn-outline-primary" htmlFor="btnRight">
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Background Color</p>
                </div>
                <div className="right-side">
                  <input
                    type="color"
                    className="form-control mt-2"
                    name="backgroundColor"
                    id=""
                    value={appearance?.backgroundColor || ""}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        backgroundColor: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Online Status</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    className="form-control mb-4"
                    id="onlineStatus"
                    value={appearance?.onlineStatus || ""}
                    placeholder="Online Status"
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        onlineStatus: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <input
                    type="checkbox"
                    name=""
                    id="offline-display"
                    checked={appearance?.displayWhenOffline || false}
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        displayWhenOffline: e.target.checked
                      }))
                    }
                  />
                  <label htmlFor="offline-display">
                    <span className="ball"></span>
                  </label>
                  <p>Display Chat when you are Offline</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.offlineStatus || ""}
                    placeholder="Offline Status"
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        offlineStatus: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <h3 style={{ margin: "12px 1px" }}>Getting Started:</h3>
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Status</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.gettingStartedStatus || ""}
                    placeholder=""
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        gettingStartedStatus: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="wrapper">
              <div className="selection-wrapper d-flex-align-center">
                <div className="left-side d-flex-align-center">
                  <p>Message</p>
                </div>
                <div className="right-side">
                  <input
                    type="text"
                    value={appearance?.gettingStartedMessage || ""}
                    placeholder=""
                    onChange={(e) =>
                      setAppearance((pre) => ({
                        ...pre,
                        gettingStartedMessage: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <button className="sm-btn" type="button" onClick={submitConfiguration}>
              Save Settings
            </button>
          </div>
        </li>
        <li>
          <div className="head d-flex-align-center">
            <p>Chat Page</p>
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" strokeWidth="2" />
            </svg>
          </div>
          {/* <form action="" className="body"></form> */}
        </li>
      </ul>
    </div>
  );
};

export default SettingsLiveChat;
