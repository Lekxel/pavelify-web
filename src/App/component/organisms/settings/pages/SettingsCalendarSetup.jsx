import { httpGetUser } from "api/auth";
import copy from "clipboard-copy";
import { useQuery } from "react-query";
import { showSuccess } from "utilities/alerts";

const SettingsCalendarSetup = () => {
  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  const copyLink = async (email) => {
    await copy(email);
    showSuccess("Email copied to clipboard");
  };

  return (
    <div className="right-side Operating-right-side">
      <h2 className="special-h2">Setup Calendar Booking </h2>
      <p>
        For you to be able to book appointments with your customers, you need to setup your calendar
        with the following third party apps.
      </p>
      <div className="step step1 mt-5">
        <h3>1. Authorize your Zoom Account</h3>
        <a href={`${process.env.REACT_APP_BASE_URL}/auth/zoomAuth/${user?._id}`} target={"_blank"}>
          Click here to Authorize your Zoom Account
        </a>
      </div>
    </div>
  );
};

export default SettingsCalendarSetup;
