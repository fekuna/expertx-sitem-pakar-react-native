import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { SIGN_IN, SIGN_UP } from "./actionTypes";

export const signin = (data) => async (dispatch) => {
  const response = await fetch("http://192.168.1.4:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "fekuna", password: "asd123123" }),
  });
  const { token } = await response.json();

  const decoded = jwtDecode(token);
  await SecureStore.setItemAsync("userToken", token);
  // const tokenNich = await SecureStore.getItemAsync("userToken");
  console.log(decoded);
  // console.log(tokenNich);
  dispatch({
    type: SIGN_IN,
    payload: decoded,
  });
};

export const signup = (data) => {
  return {
    type: SIGN_UP,
    payload: data,
  };
};
