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
