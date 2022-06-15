import { deleteRequest, get, post } from "utilities/network";

export const httpSaveEvent = (payload, eventID, isAdd = true) => {
  const editStr = `updateEvent/${eventID}`;
  return post(`/calendar/${isAdd ? "addEvent" : editStr}`, payload);
};

export const httpFetchEvents = () => {
  return get("/calendar/fetchEvents");
};

export const httpDeleteEvent = (id) => {
  return deleteRequest(`/calendar/removeEvent/${id}`);
};
