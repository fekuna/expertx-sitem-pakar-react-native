import { GET_HISTORY_DIAGNOSIS_USER } from "./actionTypes";

// ENV
import { IP_ADDR } from "@env";

export const getHistoryUser = (data) => async (dispatch) => {
  let response;
  try {
    response = await fetch(`${IP_ADDR}/api/history/user/${data.id}`, {
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
    type: GET_HISTORY_DIAGNOSIS_USER,
    payload: result,
  });
};
