import React from "react";
import { io } from "socket.io-client";
import { getUUID } from "utilities/visitor";

export const socket = io(process.env.REACT_APP_SOCKET_URL, {
  //   transports: ["websocket", "polling", "flashsocket"],
  query: `companyID=${window.location.pathname.split("/")[2]}&uuid=${getUUID()}`,
  autoConnect: false
});
export const SocketContext = React.createContext();
