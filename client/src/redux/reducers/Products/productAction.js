import { GET_PRODUCT_BYID, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_SEARCH, GET_PRODUCT_BYADMIN,ADD_PRODUCT } from "./productType";
import axios from "axios";
import { toast } from "react-toastify"

export const getProductById = (id) => async (dispatch) => {
    try {
        const product = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProductById/${id}`,
        })

        return dispatch({ type: GET_PRODUCT_BYID, payload: { ...product?.data.product } });
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const updateProductById = (id, data) => async (dispatch) => {
    console.log(id);
    // console.log(data.highlights);
    try {
        const product = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}product/updateProduct/${id}`,
            data: data
        })
        console.log(product.data.updateProduct);
    } catch (error) {
        console.log(error);
    }
}
export const productByCategory = (category) => async (dispatch) => {
    try {
        const products = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProduct/${category}`,

        });
        const { data } = products;
        const fetchedProducts = Array.isArray(data.product) ? data.product : [];

        // console.log(products.data.product);
        return dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: fetchedProducts })
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}

export const getproductBySearch = (search) => async (dispatch) => {
    try {
        const products = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProduct/search/${search}`,
        })
        const { data } = products;
        const fetchedProducts = Array.isArray(data.product) ? data.product : [];


        // console.log(products.data.product);
        return dispatch({ type: GET_PRODUCT_SEARCH, payload: fetchedProducts })

    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const getProductByAdmin = (id) => async (dispatch) => {
    try {
        const products = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProdductByAdmin/${id}`,

        });
        // console.log(...products.data.products);
        return dispatch({ type: GET_PRODUCT_BYADMIN, payload: products.data.products })
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const addProduct = (data)=> async(dispatch)=>{
    console.log(data);
    try {
       const product = await axios({
        method:"POST",
        url: `${process.env.REACT_APP_SERVER_URL}product/addProduct`,
        data:data
       }) ;
    //    console.log(product.data);
    toast.success("Product added successfully",{
        position:toast.POSITION.TOP_RIGHT
    })
    return dispatch({type:ADD_PRODUCT,message:"PRoduct added"})
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
    }
}