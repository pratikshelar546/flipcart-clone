import axios from "axios";
import { FORGOT_PASSWORD, GET_USER, RESET_PASSWORD } from "./userType";
import { toast } from "react-toastify"


export const getUser = () => async (dispatch) => {
    try {
        const User = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_SERVER_URL}user/getUser`,
        });
        // console.log(User);
        localStorage.setItem('newUser', JSON.stringify(User?.data?.user));
        return dispatch({ type: GET_USER, payload: { ...User.data.user } });
    } catch (error) {
        toast.error("User not Found", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}
export const forgetPassword = () => async (dispatch) => {
    const { email } = JSON.parse(localStorage.getItem('newUser'))

    try {
        const forgot = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}user/forgetPassword`,
            data: { email }
        })
        return dispatch({ type: FORGOT_PASSWORD, payload: forgot?.data?.message })
    } catch (error) {
        toast.error("User not Found", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
};
export const resetPassword = (token, password) => async (dispatch) => {
    console.log(password, token);
    try {
        const reset = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}user/resetPassword/${token}`,
            data: { password }
        });
        return dispatch({ type: RESET_PASSWORD, payload: reset.data.message })
    } catch (error) {
        toast.error("User not Found", {
            position: toast.POSITION.BOTTOM_CENTER
        })
        return dispatch({ type: "ERROR", payload: error })
    }

}

export const changePassword = (oldPassword, newPassowrd, confirmPassword, email) => async (dispatch) => {
    try {
        const changePass = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER_URL}user/chnagePassword`,
            data: {
                oldPassword, newPassowrd, confirmPassword, email
            }
        })
        console.log(changePass?.data);
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error })

    }
}