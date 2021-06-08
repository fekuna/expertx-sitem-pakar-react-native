import { CALCULATE_DIAGNOSIS, GET_GEJALA, GET_PENYAKIT } from "./actionTypes";

// ENV
import { IP_ADDR } from "@env";

export const getPenyakit = () => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/`, {
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
    response = await fetch(`${IP_ADDR}/api/gejala/`, {
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
};

export const calculateDiagnosis = (data) => async (dispatch) => {
  // console.log(data, "data neh");
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/calculateCF`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }

  const result = await response.json();
  console.log(result);
  dispatch({ type: CALCULATE_DIAGNOSIS, payload: result.maxResult });
};
