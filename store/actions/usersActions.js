import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { GET_USERS, SIGN_IN, SIGN_UP } from "./actionTypes";

export const signin = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch("http://192.168.1.4:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "fekuna", password: "asd123123" }),
    });
  } catch (e) {
    console.log(e);
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

export const signup = (data) => {
  return {
    type: SIGN_UP,
    payload: data,
  };
};

export const getAllUsers = () => async (dispatch) => {
  let response;
  try {
    response = await fetch("http://192.168.1.4:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e, 'getAllusers eeeee');
  }

  const result = await response.json();
  // console.log(result)

  dispatch({
    type: GET_USERS,
    payload: result,
  });
};
