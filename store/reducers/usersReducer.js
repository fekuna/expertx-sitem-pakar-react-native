import { SIGN_IN, GET_USERS } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  allUsers: []
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
        allUsers: action.payload
      }
    default:
      return state;
  }
};
