import { GET_PRODUCT , GET_PRODUCT_BY_CATEGORY} from "./productType";
import axios from "axios";
import {toast} from "react-toastify"

export const productByCategory = (category)=> async(dispatch)=>{
    try {
        const products = await axios({
            method:"GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProduct/${category}`,

        });
        // console.log(products.data.product);
        return dispatch({type:GET_PRODUCT_BY_CATEGORY,payload:products.data.product})
    } catch (error) {
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({type:"ERROR",payload:error})
    }
}