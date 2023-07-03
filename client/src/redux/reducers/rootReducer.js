import {combineReducers } from "redux"
import auth from "./Auth/authReducer";
import user from "./User/userReducer"
const rootReducer= combineReducers({
auth,
user
});
export default rootReducer