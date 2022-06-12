const SettingsLiveChat = () => (
  <div className="right-side">
    <h2>Live Chats</h2>
    <ul>
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
            <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" stroke-width="2" />
          </svg>
        </div>

        <form className="body">
          {/* first part */}
          <div className="wrapper">
            <h5>Display</h5>
            <div className="selection-wrapper d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <input type="checkbox" name="" id="display-checkbox" />
                <label htmlFor="display-checkbox">
                  <span className="ball"></span>
                </label>
                <p>Message</p>
              </div>
              <div className="right-side">
                <input type="text" placeholder="Please introduce yourself:" />
              </div>
            </div>
          </div>

          {/* second part */}

          <div className="wrapper">
            <h5>Survey Fields</h5>
            <div className="selection-wrapper d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <input type="checkbox" name="" id="survey-1" />
                <label htmlFor="survey-1">
                  <span className="ball"></span>
                </label>
                <p>Name</p>
              </div>
              <div className="right-side">
                <input type="text" placeholder="Enter your name..." />
              </div>
            </div>

            <div className="selection-wrapper d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <input type="checkbox" name="" id="survey-2" />
                <label htmlFor="survey-2">
                  <span className="ball"></span>
                </label>
                <p>Email</p>
              </div>
              <div className="right-side">
                <input type="text" placeholder="Enter your email..." />
              </div>
            </div>

            <div className="selection-wrapper d-flex-align-center">
              <div className="left-side d-flex-align-center">
                <input type="checkbox" name="" id="survey-3" />
                <label htmlFor="survey-3">
                  <span className="ball"></span>
                </label>
                <p>Phone Number</p>
              </div>
              <div className="right-side">
                <input type="text" placeholder="Enter your phone number..." />
              </div>
            </div>
          </div>

          <button className="sm-btn">Save Settings</button>
        </form>
      </li>
      <li>
        <div className="head d-flex-align-center">
          <p>Appereance</p>
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" stroke-width="2" />
          </svg>
        </div>
        <form action="" className="body"></form>
      </li>

      <li>
        <div className="head d-flex-align-center">
          <p>Side Bar</p>
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" stroke-width="2" />
          </svg>
        </div>
        <form action="" className="body"></form>
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
            <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" stroke-width="2" />
          </svg>
        </div>
        <form action="" className="body"></form>
      </li>

      <li>
        <div className="head d-flex-align-center">
          <p>Instalations</p>
          <svg
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 1.5L10 10.5L1 1.5" stroke="#282D4A" stroke-width="2" />
          </svg>
        </div>
        <form action="" className="body"></form>
      </li>
    </ul>
  </div>
);

export default SettingsLiveChat;
