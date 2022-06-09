export const USER_AUTH_TOKEN = "userAuthToken";
export const USER_PROFILE = "userProfile";

const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getData = (key) => JSON.parse(localStorage.getItem(key));

export const currentUser = () => getData(USER_PROFILE);

export const setCurrentUser = (user) => saveData(USER_PROFILE, user);

export const removeCurrentUser = () => localStorage.removeItem(USER_PROFILE);

export const currentUserAuthToken = () => getData(USER_AUTH_TOKEN);

export const setCurrentUserAuthToken = (token) => saveData(USER_AUTH_TOKEN, token);

export const removeCurrentUserAuthToken = () => localStorage.removeItem(USER_AUTH_TOKEN);
