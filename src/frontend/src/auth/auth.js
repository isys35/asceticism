import decodeJwt from "jwt-decode";
import { AUTH_URL, BACK_GITHUB_OAUTH_URL } from "../config.js";

export const isAuthenticated = () => {
  const permissions = localStorage.getItem("permissions");
  if (!permissions) {
    return false;
  }
  return permissions === "user" || permissions === "admin";
};

/**
 * Login to backend and store JSON web token on success
 *
 * @param email
 * @param password
 * @returns JSON data containing access token on success
 * @throws Error on http errors or failed attempts
 */
export const login = async (email, password) => {
  // Assert email or password is not empty
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error("Email or password was not provided");
  }
  const formData = new FormData();
  // OAuth2 expects form data, not JSON data
  formData.append("username", email);
  formData.append("password", password);

  const request = new Request(AUTH_URL, {
    method: "POST",
    body: formData,
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error("Internal server error");
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  if ("access_token" in data) {
    setJwtData(data);
  }

  return data;
};

export const logout = () => {
  localStorage.clear();
  window.location.replace("/login");
};

export const githubOAuth = async code => {
  let url = BACK_GITHUB_OAUTH_URL + `/${code}`;
  let response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw "AuthError";
  }
  return await response.json();
};

export const setJwtData = data => {
  const decodedToken = decodeJwt(data["access_token"]);
  localStorage.setItem("token", data["access_token"]);
  localStorage.setItem("permissions", decodedToken.permissions);
  localStorage.setItem("email", decodedToken.email);
  localStorage.setItem("first_name", JSON.stringify(decodedToken.first_name));
  localStorage.setItem("last_name", JSON.stringify(decodedToken.last_name));
  localStorage.setItem(
    "homepage_viewed",
    JSON.stringify(decodedToken.homepage_viewed),
  );
};
