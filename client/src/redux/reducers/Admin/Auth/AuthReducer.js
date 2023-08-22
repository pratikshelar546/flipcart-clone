import { ADMIN_LOGIN,ADMIN_SIGNUP,GET_ADMIN } from "./AuthType";
const initialState ={
    admin:{}
};
const AuthReducer =(state = initialState,action)=>{
switch( action.type){
    case ADMIN_SIGNUP :return{
        ...state,
        admin:{...action.payload}
    };
    case ADMIN_LOGIN :return{
        ...state,
        admin:{...action.payload}
    };
    case GET_ADMIN:return{
        ...state,
        admin:{...action.payload}

    }
    default: return{
        ...state
    }
}
}
export default AuthReducer