import { GET_USER } from "./userType";

const initialState = {
    user:{},
}

const userReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_USER:
            return{
                ...state,
            };
            default:return{
                ...state
            }
    }
}
export default userReducer