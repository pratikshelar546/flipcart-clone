import { Log_in, SIGN_UP } from "./authType";
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Log_in:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
