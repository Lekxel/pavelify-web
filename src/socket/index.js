import React from "react";
import { io } from "socket.io-client";
import { getTheCompanyID, getTheOperatorID, getThePlatform, getTheUUID } from "./utils";

export const socket = io(process.env.REACT_APP_SOCKET_URL, {
  //   transports: ["websocket", "polling", "flashsocket"],
  query: `companyID=${getTheCompanyID(window.location.pathname)}&uuid=${getTheUUID(
    window.location.pathname
  )}&platform=${getThePlatform(window.location.pathname)}&operatorID=${getTheOperatorID(
    window.location.pathname
  )}`,
  autoConnect: false
});
export const SocketContext = React.createContext();
