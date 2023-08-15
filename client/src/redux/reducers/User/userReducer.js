import { GET_USER, FORGOT_PASSWORD, RESET_PASSWORD, CHANGE_PASSWORD } from "./userType";


const initialState = {
    user: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: { ...action.payload }
            };
        case FORGOT_PASSWORD:
            return {
                ...state,

            };
        case RESET_PASSWORD:
            return {
                ...state,

            };
        case CHANGE_PASSWORD: return {
            ...state
        }
        default: return {
            ...state
        }
    }
}
export default userReducer