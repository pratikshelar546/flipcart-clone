import { GET_PRODUCT , GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_SEARCH} from "./productType";
import axios from "axios";
import {toast} from "react-toastify"

export const productByCategory = (category)=> async(dispatch)=>{
    try {
        const products = await axios({
            method:"GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProduct/${category}`,

        });
        const { data } = products;
        const fetchedProducts = Array.isArray(data.product) ? data.product : [];
    
        // console.log(products.data.product);
        return dispatch({type:GET_PRODUCT_BY_CATEGORY,payload:fetchedProducts})
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({type:"ERROR",payload:error})
    }
}

export const getproductBySearch = (search)=>async (dispatch)=>{
    try {
        const products = await axios({
            method:"GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProduct/search/${search}`,
        }) 
        const { data } = products;
        const fetchedProducts = Array.isArray(data.product) ? data.product : [];
        
    
        // console.log(products.data.product);
        return dispatch({type:GET_PRODUCT_SEARCH,payload:fetchedProducts})
        
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({type:"ERROR",payload:error})
    }
}