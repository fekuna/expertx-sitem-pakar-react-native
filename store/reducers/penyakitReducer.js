import { GET_GEJALA, GET_PENYAKIT } from "../actions/actionTypes";

const initialState = {
  allPenyakit: [],
  allGejala: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PENYAKIT:
      return {
        ...state,
        allPenyakit: action.payload,
      };

    case GET_GEJALA:
      return {
        ...state,
        allGejala: action.payload,
      };
    default:
      return state;
  }
};
