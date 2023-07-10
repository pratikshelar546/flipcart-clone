import {combineReducers } from "redux"
import auth from "./Auth/authReducer";
import user from "./User/userReducer"
import product from "./Products/productReducer"
const rootReducer= combineReducers({
auth,
user,
product
});
export default rootReducer