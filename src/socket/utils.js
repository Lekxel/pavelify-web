import { currentUser } from "utilities/storage";
import { getUUID } from "utilities/visitor";

export const getTheUUID = (pathname) => {
  let paths = pathname.split("/");

  if (paths.length < 3) {
    return "";
  }
  switch (paths[1]) {
    case "widget":
      return getUUID();
    case "live-chat":
      return paths[2];
    default:
      return "";
  }
};

export const getTheCompanyID = (pathname) => {
  let paths = pathname.split("/");

  if (paths.length < 3) {
    return "";
  }

  switch (paths[1]) {
    case "widget":
      return paths[2];
    case "live-chat":
      return currentUser()?.companyID;
    default:
      return "";
  }
};

export const getTheOperatorID = (pathname) => {
  let paths = pathname.split("/");

  if (paths.length < 3) {
    return "";
  }

  switch (paths[1]) {
    case "widget":
      return "";
    case "live-chat":
      return currentUser()?._id;
    default:
      return "";
  }
};

export const getThePlatform = (pathname) => {
  let paths = pathname.split("/");

  if (paths.length < 3) {
    return "";
  }

  switch (paths[1]) {
    case "widget":
      return "widget";
    case "live-chat":
      return "live-chat";
    default:
      return "";
  }
};
