import { GET_CART, ADD_CART } from "./cartTypes";
const initialState = {
  cart: [],
  newCart: {}
};
console.log(initialState?.cart);
const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: { ...action.payload },
      };
    case ADD_CART:
      return {
        ...state,
        newCart: { ...action.payload }
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducers;
