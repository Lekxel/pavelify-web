export const USER_AUTH_TOKEN = "userAuthToken";
export const USER_PROFILE = "userProfile";
export const VISITOR_PROFILE = "VISITOR_PROFILE";

const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getData = (key) => JSON.parse(localStorage.getItem(key));

export const currentUser = () => getData(USER_PROFILE);

export const setCurrentUser = (user) => saveData(USER_PROFILE, user);

export const removeCurrentUser = () => localStorage.removeItem(USER_PROFILE);

export const currentUserAuthToken = () => getData(USER_AUTH_TOKEN);

export const setCurrentUserAuthToken = (token) => saveData(USER_AUTH_TOKEN, token);

export const removeCurrentUserAuthToken = () => localStorage.removeItem(USER_AUTH_TOKEN);

export const currentVisitorProfile = () => getData(VISITOR_PROFILE);

export const setCurrentVisitorProfile = (visitor) => saveData(VISITOR_PROFILE, visitor);

export const removeCurrentVisitorProfile = () => localStorage.removeItem(VISITOR_PROFILE);
