import { generateUrl } from "./generateUrl";

let token;
let role;
let pseudo;

export const getToken = (tokenData, roleData, pseudoData) => {
  token = tokenData;
  role = roleData;
  pseudo = pseudoData;
};
export const methodType = {
  Get: "GET",
  Post: "POST",
  Del: "DELETE",
  Put: "PUT",
};
export const dataToSend = { content: {} };
export const type = {
  json: "json",
  formData: "formData",
  text: "text",
  blob: "blob",
};
export const dataToGet = {
  type: type.json,
  callback: (data) => console.log(data),
};

export const fetchData = (
  urlTarget,
  method,
  dataSend,
  dataGet,
  withToken,
  getToken
) => {
  const option = { method, headers: new Headers() };
  if (dataSend !== null) {
    dataSend.type === "json"
      ? (option.body = JSON.stringify(dataSend.content))
      : (option.body = dataSend.content);
  }

  option.headers.append(
    "Accept",
    dataGet.type === "json"
      ? "application/json"
      : dataGet.type === "formData"
      ? "multipart/form-data"
      : dataGet.type == "text"
      ? "text/plain"
      : "application/octet-stream"
  );

  option.headers.append(
    "Content-Type",
    dataGet.type === "json"
      ? "application/json"
      : dataGet.type === "formData"
      ? "multipart/form-data"
      : dataGet.type == "text"
      ? "text/plain"
      : "application/octet-stream"
  );

  if (withToken) {
    option.headers.append("role", role);
    option.headers.append("pseudo", pseudo);
    option.headers.append("x-auth-token", token);
  }

  const fetchPromise = () => {
    return new Promise((resolve) => {
      fetch(generateUrl(urlTarget, getToken), option)
        .then((response) => response[dataGet.type]())
        .catch((e) => console.error(e))
        .then((data) => {
          resolve(data);
        })
        .catch(() => alert("error"));
    });
  };

  fetchPromise()
    .then((data) => {
      if (getToken) {
        role = data.role;
        pseudo = data.pseudo;
        token = data.token;
      }
      dataGet.callback(data);
    })
    .catch((e) => {
      console.error(e);
      alert("Error");
    });
};
