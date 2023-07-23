import axios from "axios";
import { GET_USER } from "./userType";
import {toast} from "react-toastify"


export const getUser = ()=> async(dispatch)=>{
    try {
        const User = await axios({
            method:"GET",
            url:`${process.env.REACT_APP_SERVER_URL}user/getUser`,
        });
        // console.log(User);
        localStorage.setItem('newUser', JSON.stringify(User?.data?.user));
        return dispatch({ type: GET_USER, payload: { ...User.data.user } });
    } catch (error) {
        toast.error("User not Found", {
            position: toast.POSITION.TOP_RIGHT
          })
          return dispatch({type:"ERROR", payload:error})
    }
}