import { deleteRequest, get, post } from "utilities/network";

export const httpSaveEvent = (payload, eventID, isAdd = true) => {
  const editStr = `updateEvent/${eventID}`;
  return post(`/calendar/${isAdd ? "addEvent" : editStr}`, payload);
};

export const httpFetchEvents = (page) => {
  return get(`/calendar/fetchEvents?page=${page}`);
};

export const httpDeleteEvent = (id) => {
  return deleteRequest(`/calendar/removeEvent/${id}`);
};

export const httpGetEvent = (companySlug, eventSlug) => {
  return get(`/calendar/getEvent/${companySlug}/${eventSlug}`);
};

export const httpBookEvent = (payload, eventID) => {
  return post(`/calendar/bookEvent/${eventID}`, payload);
};

export const httpFetchBookings = (status, page) => {
  return get(`/calendar/fetchBookings?status=${status}&page=${page}`);
};

export const httpFetchEventsForLivechat = (companyID) => {
  return get(`/calendar/fetchEventsForLivechat/${companyID}`);
};
