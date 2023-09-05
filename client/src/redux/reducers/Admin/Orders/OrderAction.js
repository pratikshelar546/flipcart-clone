import { GETDETAILS, ORDERS } from "./OrderType";
import axios from "axios"
import { toast } from "react-toastify";


export const getOrderDetails = (id) => async (dispatch) => {
    try {
        // console.log("pe");
// console.log("id of admin",id);
        const order = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}order/getOrderdProduct/${id}`,
        });
        // console.log(order.data);
        return dispatch({ type: ORDERS, payload: order.data })
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }

}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        const product = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}order/detDetailsByProductId/${id}`,
        });
        // console.log(product.data);
        return dispatch({ type: GETDETAILS, payload: product.data })
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }

}
export const updateStatus = (id, orderStatus) => async (dispatch) => {
    try {
        console.log(orderStatus);
        const update = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}order/updateStatus/${id}`,
            data: {orderStatus}

        })
        console.log(update);
        return dispatch({ payload: update.data })
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
