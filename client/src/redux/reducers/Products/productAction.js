import { GET_PRODUCT_BYID, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_SEARCH } from "./productType";
import axios from "axios";
import { toast } from "react-toastify"

export const getProductById = (id) => async (dispatch) => {
    try {
        const product = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}product/getProductById/${id}`,
        })
        // const { data } = product;
        // const newData = Object.values(data.product)

        // const fetchedProducts = Array.isArray(newData) ? newData : [];

        // const fetchedProducts = data.product
        // console.log({ ...product?.data.product});
        return dispatch({ type: GET_PRODUCT_BYID, payload:{ ...product?.data.product}});
    } catch (error) {
        console.log(error);
        toast.error("Error occurs", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({ type: "ERROR", payload: error })
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