import { toast } from "react-toastify";
import { ADMIN_LOGIN, ADMIN_SIGNUP, GET_ADMIN, UPDATE_ADMIN, GET_ALL_ADMIN } from "./AuthType";
import axios from "axios";

export const adminSignup = (data) => async (dispatch) => {

    try {
        const admin = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}admin/signup`,
            data: { data }
        });

        localStorage.setItem("admin", JSON.stringify({ token: admin.data }));
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${admin.data.token}`;
        toast.success("Admin has been added successfully", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: ADMIN_SIGNUP, payload: admin.data });
    } catch (error) {
        toast.error("Failed", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const adminLogin = (data) => async (dispatch) => {
    try {
        const admin = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}admin/login`,
            data: { data }

        })
        localStorage.setItem("admin", JSON.stringify({ token: admin.data }));
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${admin.data.token}`;
        toast.success("Signup successfully", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: ADMIN_LOGIN, payload: admin.data });
    } catch (error) {
        toast.error("Login Failed", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const getAdmin = () => async (dispatch) => {    
    try {
        const admin = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}admin/getAdmin`,
        })
        console.log("Called");
        console.log(admin);
        localStorage.setItem("AdminDetail", JSON.stringify(admin?.data?.admin));
        return dispatch({ type: GET_ADMIN, payload: admin?.data?.admin })

    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const getAllAdmin = () => async (dispatch) => {
    try {
        const admins = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}admin/getAllAdmin`,
        });
        console.log(admins.data.admins);
        return dispatch({ type: GET_ALL_ADMIN, payload: admins?.data?.admins })
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const updateAdmin = (id, address) => async (dispatch) => {
    try {
        console.log(address);
        const admin = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}admin/updateAdmin/${id}`,
            data: { address }
        })
        return dispatch({ type: UPDATE_ADMIN, payload: { ...admin.data } })
    } catch (error) {
        toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}