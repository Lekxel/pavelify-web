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
