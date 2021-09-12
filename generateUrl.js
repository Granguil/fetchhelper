export const generateUrl = (url, getToken) => {
  if (!getToken) {
    if (window.location.port == "3000") {
      url = "http://localhost:5000/" + url;
    } else {
      url = "/GranguilData/" + url;
    }
  } else {
    if (window.location.port == "3000") {
      url = "http://localhost:8080/Connexion/" + url;
    } else {
      url = "/Connexion/" + url;
    }
  }

  return url;
};
