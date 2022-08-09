import styles from "./LiveChatMessageArea.module.css";

export const Introduction = ({
  innerSize: { width, height },
  appearance,
  preChat,
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  companyName,
  introduce
}) => {
  const HandleCovertingScreen = (e) => {
    e.preventDefault();
    document.querySelector("#MessageArea").style.display = "block";
    document.querySelector("#Introduction").style.display = "none";
  };

  const close = (e) => {
    e.preventDefault();
    document.querySelector("#collpase-area").style.display = "block";
    document.querySelector("#Introduction").style.display = "none";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let res = introduce();
    if (res) {
      HandleCovertingScreen(e);
    }
  };

  return (
    <div
      className={`${styles.LiveChatMessageArea} ${
        width <= 600 ? styles.LiveChatMessageArea_600 : ""
      } collapse-bot`}
      id="Introduction"
    >
      <div className={`${styles.top} ${width <= 600 ? styles.top_600 : ""}`}>
        <div className={`${styles.presentation}`}>
          <h4 className={``}>{companyName}</h4>
          <p className={styles.para_top}>{preChat?.introductionMessage}</p>
        </div>
        <div
          className={`${styles.CloseIcon} ${styles.closeIconIntro}`}
          onClick={close}
          onTouchStart={close}
        >
          <i className="fas fa-times text-white"></i>
        </div>
      </div>

      <div
        className={`${styles.body} ${width <= 600 ? styles.body_600 : ""} py-4 bg-white`}
        id="name-entry"
        // style={{  position: "relative" }}
      >
        <h5 className="text-center px-3">
          Please give the team a way to reach you incase we get disconnected.
        </h5>

        <div
          className="text-center"
          style={{
            marginTop: "30px",
            textAlign: "center",
            zIndex: 9999
          }}
          id="preInput"
        >
          <div className="text-center mx-3">
            {preChat?.surveyFields?.name?.enabled && (
              <input
                id="user-name"
                type="text"
                placeholder={preChat?.surveyFields?.name?.placeholder}
                className="form-control mb-3"
                // style={{ height: "36px", width: "78%" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {preChat?.surveyFields?.email?.enabled && (
              <input
                id="user-email"
                type="text"
                placeholder={preChat?.surveyFields?.email?.placeholder}
                className="form-control mb-3"
                value={email}
                // style={{ height: "36px", width: "78%" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            {preChat?.surveyFields?.phoneNumber?.enabled && (
              <input
                id="user-phone"
                type="tel"
                placeholder={preChat?.surveyFields?.phoneNumber?.placeholder}
                className="form-control mb-1"
                value={phoneNumber}
                style={{ height: "36px", width: "78%" }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            )}
          </div>
          <p
            className="text-start"
            style={{
              margin: "0px 32px",
              textAlign: "left",
              lineHeight: "16px"
            }}
          >
            <small style={{ fontSize: "12px", color: "#333" }}>
              We will not use your email for marketing or promotional purposes. This is strictly for
              the sole purpose of providing you support.
            </small>
          </p>
          <div className={`text-center mb-3  ${width <= 600 ? "pt-5" : "pt-3"}`}>
            <button
              id="submit-name"
              type="submit"
              className="btn btn-block px-5 py-2"
              style={{
                background: appearance?.backgroundColor || "#13215e",
                color: "white"
                // fontWeight: "bold"
              }}
              onClick={onSubmit}
            >
              Continue &nbsp;<i className="fa fa-long-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
