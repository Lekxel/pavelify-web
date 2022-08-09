import { isValidPhoneNumber } from "libphonenumber-js";

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
export const validatePhone = (phone) => isValidPhoneNumber(phone);

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

const max_file_size_in_kb = 1024 * 1024 * 10;
const allowed_extensions = [
  "png",
  "jpeg",
  "jpg",
  "gif",
  "doc",
  "docx",
  "pdf",
  "xls",
  "xlsx",
  "mp4",
  "3gp",
  "txt",
  "csv",
  "msword"
];

const getFileSizeKB = (file_size) => {
  file_size = parseInt(file_size / 1024);
  return file_size;
};

const getFileType = (file) => {
  return file?.type.split("/").pop() || file?.name.split(".")[file?.name.split(".").length - 1];
};

const arrToLowerCase = (arr = []) => {
  return arr.map((str) => str.toLowerCase());
};

export const changeFileName = (file, newName) => {
  return new File([file], newName, {
    // type: file.type,
    type: "text/plain",
    lastModified: file.lastModified
  });
};

export const onFilePicked = (e) => {
  let file_size_kb;
  let file_type;

  let { files } = e.target;

  file_size_kb = getFileSizeKB(files[0].size);
  file_type = getFileType(files[0]).toLowerCase();

  if (max_file_size_in_kb && file_size_kb > max_file_size_in_kb) {
    alert(`Maximum allowed file size = ${max_file_size_in_kb} kb`);
    return false;
  }

  if (allowed_extensions && !arrToLowerCase(allowed_extensions).includes(file_type)) {
    alert(`Allowed file type = ${allowed_extensions}`);
    return false;
  }

  return files[0];
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const linkify = (text = "") => {
  let urlRegex =
    // eslint-disable-next-line
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return `<a target="_blank" href="${url}">${url}</a>`;
  });
};

export const loadAttachment = (attachment, type, isClient = false) => {
  try {
    if (type === "image") {
      return `<img alt="img-attachment" src='${attachment}' style="max-width:100%;padding:12px; object-fit:contain;max-height:100%" />`;
    } else if (type === "video") {
      return `<video max-width="${isClient ? "200" : "320"}" height="${
        isClient ? "180" : "240"
      }" controls>
  <source src="${attachment}#t=0.8" type="video/mp4">
</video>`;
    } else if (type === "application" || type === "text" || type === "") {
      return `<img alt="img-attachment" src='/images/document.png' style="width:35px;margin-right:5px;" /> <span>${linkify(
        attachment
      )}</span>`;
    }
    return linkify(attachment);
  } catch (e) {
    return null;
  }
};

export const lastItemInArray = (arr) => arr[arr.length - 1];
