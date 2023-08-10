import { ADD_ORDER_DETAILS, GET_ORDERdETAILS_USERID } from "./orderTypes";
const initialState = {
  details: {},
  detailsById: {}
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_DETAILS:
      return {
        ...state,
        details: { ...action.payload },
      };
    case GET_ORDERdETAILS_USERID:
      return {
        ...state,
        detailsById: { ...action.payload }
      }

    default:
      return {
        ...state,
      };
  }
};
export default orderReducer;
