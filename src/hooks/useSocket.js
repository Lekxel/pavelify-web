import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { io } from "socket.io-client";
const { getTheOperatorID, getThePlatform, getTheCompanyID, getTheUUID } = require("socket/utils");

const useSocket = () => {
  const location = useLocation();

  const [socket, setSocket] = useState(
    io(process.env.REACT_APP_SOCKET_URL, {
      transports: ["websocket", "polling", "flashsocket"],
      query: `companyID=${getTheCompanyID(window.location.pathname)}&uuid=${getTheUUID(
        location.pathname
      )}&platform=${getThePlatform(window.location.pathname)}&operatorID=${getTheOperatorID(
        window.location.pathname
      )}`,
      autoConnect: false
    })
  );

  useEffect(() => {
    setSocket(
      io(process.env.REACT_APP_SOCKET_URL, {
        transports: ["websocket", "polling", "flashsocket"],
        query: `companyID=${getTheCompanyID(window.location.pathname)}&uuid=${getTheUUID(
          location.pathname
        )}&platform=${getThePlatform(window.location.pathname)}&operatorID=${getTheOperatorID(
          window.location.pathname
        )}`,
        autoConnect: false
      })
    );
  }, [location]);
  return socket;
};

export default useSocket;
