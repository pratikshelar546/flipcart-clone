import axios from "axios"
import { Log_in, SIGN_UP } from "./authType";
import { toast } from "react-toastify"

export const logIn = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_SERVER_URL}user/signin`,
            data: { credentials: userData },
        });
        // console.log(User?.data);
        localStorage.setItem("user", JSON.stringify({ token: User.data }));
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${User.data.token}`;
        toast.success("Login successfully", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: Log_in, payload: User.data });
    } catch (error) {
        // console.log(process.env.REACT_APP_SERVER_URL);
        toast.error("Login Failed", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({ type: "ERROR", payload: error })
    }
}

// signUp 

export const signUp = (userData)=> async(dispatch)=>{
    try {
        const User = await axios({
            method:"POST",
            url: `${process.env.REACT_APP_SERVER_URL}user/signup`,
            data:{credentials:userData}
        })
        localStorage.setItem("user", JSON.stringify({token:User.data}));
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${User.data.token}`;
        toast.success("Signup successfully", {
            position: toast.POSITION.TOP_RIGHT
        })
        return dispatch({type:SIGN_UP, payload:User.data});
    } catch (error) {
        toast.error("Signup Failed", {
            position: toast.POSITION.TOP_RIGHT
        });
        return dispatch({type:"ERROR",payload:error})
    }
}