import { ORDERS, GETDETAILS } from "./OrderType";
const initialState = { orders: { loading: true }, orderDetails: {} }
const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS:
            return {
                loading: false,
                ...state,
                orders: { ...action.payload }
            }
        case GETDETAILS: return {
            ...state,
            orderDetails: { ...action.payload }
        }
        default: return {
            ...state
        }
    }
}
export default OrderReducer;