import { get } from "utilities/network";

export const httpFetchTickets = (status, page) => {
  return get(`/emailticket/fetchTickets?status=${status}&page=${page}`);
};

export const httpGetTicket = (ticketID) => {
  return get(`/emailticket/getTicket/${ticketID}`);
};
