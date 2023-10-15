import { ADMIN_LOGIN, ADMIN_SIGNUP, GET_ADMIN, UPDATE_ADMIN, GET_ALL_ADMIN } from "./AuthType";
const initialState = {
    admin: {},
    getAdmin: {  },
    updatedAdmin: {},
    allAdmins: []
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
                ...state,
                getAdmin: { ...action.payload }

            };
        case UPDATE_ADMIN: return {
            ...state,

        };
        case GET_ALL_ADMIN: return {
            ...state,
            allAdmins: action.payload
        }
        default: return {
            ...state,
            updatedAdmin: { ...action.payload }
        }
    }
}
export default AuthReducer