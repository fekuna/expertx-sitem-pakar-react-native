import {
  CALCULATE_DIAGNOSIS,
  GET_GEJALA,
  GET_PENYAKIT,
  SET_ERRORS,
} from "./actionTypes";

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

export const addPenyakit = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (e) {
    const message = JSON.parse(e.message);
    let errors = {};
    message.map((m) => {
      errors = {
        ...errors,
        [m.param]: m.msg,
      };
    });
    dispatch({
      type: SET_ERRORS,
      payload: {
        addPenyakit: errors,
      },
    });
  }

  const result = await response.json();

  return result;
};

export const editPenyakit = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/${data.penyakitId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
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
    dispatch({
      type: SET_ERRORS,
      payload: {
        editPenyakit: errors,
      },
    });
  }

  const result = await response.json();

  return result;
};

export const deletePenyakit = (id) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (e) {
    const message = JSON.parse(e.message);
    console.log("delete penyakit error: ", message);
  }

  dispatch(getPenyakit());
};

// GEJALA

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

export const addGejala = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/gejala/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(JSON.stringify(responseData.errors));
    }
  } catch (e) {
    const message = JSON.parse(e.message);
    let errors = {};
    message.map((m) => {
      errors = {
        ...errors,
        [m.param]: m.msg,
      };
    });
    dispatch({
      type: SET_ERRORS,
      payload: {
        addGejala: errors,
      },
    });
  }

  const result = await response.json();

  return result;
};

export const editGejala =
  ({ gejalaId, ...data }) =>
  async (dispatch) => {
    console.log("gejalaId: ", gejalaId);
    console.log(data);
    let response;
    try {
      response = await fetch(`${IP_ADDR}/api/gejala/${gejalaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const responseData = await response.json();
        console.log(responseData, "errorEditGejala nich");
        throw new Error(JSON.stringify(responseData.errors));
      }
    } catch (e) {
      const message = JSON.parse(e.message);
      let errors = {};
      message.map((m) => {
        errors = {
          ...errors,
          [m.param]: m.msg,
        };
      });
      dispatch({
        type: SET_ERRORS,
        payload: {
          editGejala: errors,
        },
      });
    }

    // console.log("tembuss");

    const result = await response.json();

    return result;
  };

export const calculateDiagnosis = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/penyakit/calculateCF`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      throw new Error(responseData.message);
    }
  } catch (e) {
    const message = e.message;
    console.log(message, "oakwdoakd");
    dispatch({
      type: SET_ERRORS,
      payload: {
        diagnosis: "Input data is not correct, please try again.",
      },
    });
    return null;
  }

  const result = await response.json();

  dispatch({ type: CALCULATE_DIAGNOSIS, payload: result });

  return result;
};
