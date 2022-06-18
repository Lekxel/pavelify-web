export const parseQueryParams = (query) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
        let [key, value] = param.split("=");
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
        return params;
      }, {})
    : {};
};

export const moneyFormat = (value, showDecimal = false) =>
  Number(value)
    .toFixed(showDecimal ? 2 : 0)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

export const formatDuration = (totalMinutes) => {
  const mins = totalMinutes % 60;
  const hours = totalMinutes / 60;
  const hr = Math.floor(hours) > 0 ? `${Math.floor(hours)}hr` : "";
  return `${hr} ${mins}mins`;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (str) => (str ? `${str[0].toUpperCase()}${str.slice(1)}` : "");

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validateUrl = (url) =>
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);
export const validatePassword = (password) => password.length >= 6;
export const validateName = (name) => name.length >= 3;
export const validateSubdomain = (subdomain) =>
  /^[a-z]+[a-z0-9-]+[a-z]+$/.test(subdomain?.toLowerCase());
export const validatePhone = (phone) => /^\d{11}$/.test(phone);

export const fileToBase64 = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const removeFalsyValues = (obj) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (!newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
