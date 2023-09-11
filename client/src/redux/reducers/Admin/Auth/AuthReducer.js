import { ADMIN_LOGIN, ADMIN_SIGNUP, GET_ADMIN,UPDATE_ADMIN } from "./AuthType";
const initialState = {
    admin: {},
    getAdmin: { loading: true },
    updatedAdmin:{}
};
const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_SIGNUP: return {
            ...state,
            admin: { ...action.payload }
        };
        case ADMIN_LOGIN: return {
            ...state,
            admin: { ...action.payload }
        };
        case GET_ADMIN:
             return {
            loading: false,
            ...state,
            getAdmin: { ...action.payload }

        };
        case UPDATE_ADMIN: return{
            ...state,

        }
        default: return {
            ...state,
            updatedAdmin:{...action.payload}
        }
    }
}
export default AuthReducer