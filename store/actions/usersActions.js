import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { GET_USERS, SIGN_IN, SIGN_UP, SET_ERRORS } from "./actionTypes";

// ENV
import { IP_ADDR } from "@env";

export const signin = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message);
    }
  } catch (e) {
    const message = e.message;
    dispatch({
      type: SET_ERRORS,
      payload: {
        login: message,
      },
    });
  }

  const { token } = await response.json();

  const decoded = jwtDecode(token);
  await SecureStore.setItemAsync("userToken", token);
  // const tokenNich = await SecureStore.getItemAsync("userToken");
  console.log(decoded);
  // console.log(tokenNich);
  dispatch(setCurrentUser(decoded));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return { type: SIGN_IN, payload: decoded };
};

// logoutUser
export const logoutUser = () => async (dispatch) => {
  // Remove token from secureStorage
  await SecureStore.deleteItemAsync("userToken");

  dispatch(setCurrentUser({}));
};

// Check whether user login or not
export const authCheckLoginUser = () => async (dispatch) => {
  const token = await SecureStore.getItemAsync("userToken");
  console.log(token, "authCheck");
  if (!token) {
    console.log("g ada token");
    return;
  }

  const decoded = jwtDecode(token);
  dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    dispatch(logoutUser());
  }
};

export const signup = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      console.log("masokk isn't oke", responseData.errors);
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (e) {
    const message = JSON.parse(e.message);
    console.log("Message:", message);
    let errors = {};
    message.map((m) => {
      errors = {
        ...errors,
        [m.param]: m.msg,
      };
    });
    console.log(errors, "hehe");
    dispatch({
      type: SET_ERRORS,
      payload: {
        register: errors,
      },
    });
  }

  const { token } = await response.json();

  const decoded = jwtDecode(token);
  await SecureStore.setItemAsync("userToken", token);

  dispatch({
    type: SIGN_IN,
    payload: decoded,
  });
};

export const getAllUsers = () => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message);
    }
  } catch (e) {
    console.log(e.message);
  }

  const result = await response.json();
  // console.log(result)

  dispatch({
    type: GET_USERS,
    payload: result,
  });
};
