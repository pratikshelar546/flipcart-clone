import { toast } from "react-toastify";
import { ADD_REVIEW, GET_REVIEW, DELETE_REVIEW } from "./ReviewType";
import axios from "axios";

export const AddNewReview = (data) => async (dispatch) => {
  // console.log(data);
  try {
    const review = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}review/Add`,
      data: data,
    });
    console.log(review.data);
    return dispatch({ type: ADD_REVIEW, payload: review.data });
  } catch (error) {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return dispatch({ type: "ERROR", payload: error.message });
  }
};
export const getReviews = (id) => async (dispatch) => {
  try {
    const reviews = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}review/getReviewByProduct/${id}`,
    });
    console.log(reviews.data.reviews);
    return dispatch({ type: GET_REVIEW, payload: reviews.data.reviews });
  } catch (error) {
    // console.log(error.response);
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return dispatch({ type: "ERROR", payload: error.message });
  }
};
export const deleteReviewById = (id) => async (dispatch) => {
  try {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_SERVER_URL}review/deleteReview/${id}`,
    });
    toast.success("Deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return dispatch({ type: DELETE_REVIEW, message: "deleted" });
  } catch (error) {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return dispatch({ type: "ERROR", payload: error.message });
  }
};
