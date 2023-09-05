import { ADD_REVIEW, GET_REVIEW,DELETE_REVIEW } from "./ReviewType";

const intitalState = {
  review: {},
  allReviews: [],
};
const ReviewReducer = (state = intitalState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        review: { ...action.payload },
      };
    case GET_REVIEW:
      return {
        ...state,
        allReviews: { ...action.payload },
      };
      case DELETE_REVIEW :return{
        ...state,
      }
    default:
      return {
        ...state,
      };
  }
};
export default ReviewReducer;
