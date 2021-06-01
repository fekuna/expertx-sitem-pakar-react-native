import { GET_GEJALA, GET_PENYAKIT } from "./actionTypes";

export const getPenyakit = () => async (dispatch) => {
  let response;
  try {
    response = await fetch("http://192.168.1.4:5000/api/penyakit/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }

  const result = await response.json();

  dispatch({
    type: GET_PENYAKIT,
    payload: result,
  });
};


export const getGejala = () => async (dispatch) => {
  let response;
  try {
    response = await fetch("http://192.168.1.4:5000/api/gejala/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }

  const result = await response.json();

  dispatch({
    type: GET_GEJALA,
    payload: result,
  });
}