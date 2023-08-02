import { combineReducers } from "redux"
import auth from "./Auth/authReducer";
import user from "./User/userReducer"
import product from "./Products/productReducer"
import cart from "./cart/cartReducers"
import Order from "./order/orderReducer"
const rootReducer = combineReducers({
    auth,
    user,
    product,
    cart,
    Order
});
export default rootReducer