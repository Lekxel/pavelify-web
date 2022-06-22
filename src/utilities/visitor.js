import { v4 as uuidv4 } from "uuid";
import { currentVisitorProfile, setCurrentVisitorProfile } from "./storage";

export const getUUID = () => {
  const visitorProfile = currentVisitorProfile();
  if (visitorProfile && visitorProfile.uuid) {
    return visitorProfile.uuid;
  }
  const uuid = uuidv4();
  setCurrentVisitorProfile({ ...visitorProfile, uuid });
  return uuid;
};
