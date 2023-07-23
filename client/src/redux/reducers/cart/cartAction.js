import axios from "axios"
import {ADD_CART, GET_CART} from "./cartTypes"
import { toast } from "react-toastify"

export const addCart = (details,quantity)=> async(dispatch)=>{

    const user = JSON.parse(localStorage.getItem("newUser"));
    const userId = user?._id;
    try {
        const cart = await axios({
            method:"PUT",
            url:`${process.env.REACT_APP_SERVER_URL}cart/Add/${userId}`,
            data: { productDetails: [{ details, quantity }] }
        });
        // console.log(cart?.data?.cart);
        return dispatch({type: ADD_CART , payload:cart})
        
    }catch (error) {
        console.log(error);
        toast.error("Something went wrong" , {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}


export const GetCart = (id)=> async(dispatch)=>{
    try {
        const cart =await axios({
            method:"GET",
            url:`${process.env.REACT_APP_SERVER_URL}cart/getCart/${id}`,
        })
        // console.log(cart?.data.getCart);
                // console.log(cart?.data?.GetCart);
        return dispatch({type:GET_CART , payload:{...cart?.data.getCart}})
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}