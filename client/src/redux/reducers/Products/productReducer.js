import {
  GET_PRODUCT_BYID,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_SEARCH,
} from "./productType";

const initialState = {
  products: [],
  categoryProduct: [],
  searchProduct: [],
};
// console.log(initialState.products);
const productReducer = (state = initialState, action) => {
  // console.log(action.payload)

  switch (action.type) {
    case GET_PRODUCT_BYID:
      return {
        ...state,
        products: {...action.payload},
      };
    case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        categoryProduct: [...action.payload],
      };
    case GET_PRODUCT_SEARCH:
      return {
        ...state,
        searchProduct: [...action.payload],
      };

    default:
      return {
        ...state,
      };
  }
};

export default productReducer;
