import { ADD_ORDER_DETAILS, GET_ORDERdETAILS_USERID } from "./orderTypes";
import axios from "axios";
import { toast } from "react-toastify";

export const addDetails =
  ( shippingInfo, orderItems, paymentInfo,totalCartPrice,totalOfferPrice,user) =>
    async (dispatch) => {
      try {
        // console.log("okay am from add deatils");
        // console.log(shippingInfo,orderItems);
        // const userId = user?._id;
        // console.log(user);
        // console.log(shippingInfo, orderItems, paymentInfo,totalCartPrice,totalOfferPrice,user);
        const details = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_SERVER_URL}order/orderDetails`,
          data: 
            shippingInfo,
            orderItems,
            paymentInfo,totalCartPrice,totalOfferPrice,
            user,
          
        });
        // console.log(details.data.details);
        return dispatch({ type: ADD_ORDER_DETAILS, payload: details.data.details });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return dispatch({ type: "ERROR", payload: error.message });
      }
    };

    // get order details by user id
    export const getDetailsByUserId = (id)=> async(dispatch)=>{
      // console.log(id);
      try {
        const getDetails = await axios({
          method:"GET",
          url:`${process.env.REACT_APP_SERVER_URL}order/getOrderDetails/${id}`,
        });
        // console.log(getDetails.data.orderDetails);
        return dispatch({type:GET_ORDERdETAILS_USERID , payload:getDetails?.data.orderDetails})
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return dispatch({ type: "ERROR", payload: error.message });
      }
    }