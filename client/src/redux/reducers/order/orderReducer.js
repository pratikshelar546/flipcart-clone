import { ADD_ORDER_DETAILS } from "./orderTypes";
const initialState = {
  details: {},
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_DETAILS:
      return {
        ...state,
        details: { ...action.payload },
      };

    default:
      return {
        ...state,
      };
  }
};
export default orderReducer;
