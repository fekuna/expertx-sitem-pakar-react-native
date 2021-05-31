import { SIGN_IN, SIGN_UP } from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: !!action.payload.userId,
        user: action.payload,
      };
    default:
      return state;
  }
};
