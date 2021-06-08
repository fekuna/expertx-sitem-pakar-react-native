import {
  SIGN_IN,
  GET_USERS,
  GET_HISTORY_DIAGNOSIS_USER,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  allUsers: [],
  historyDiagnosis: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: !!action.payload.userId,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_HISTORY_DIAGNOSIS_USER:
      return {
        ...state,
        historyDiagnosis: action.payload,
      };
    default:
      return state;
  }
};
