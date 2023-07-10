import { GET_PRODUCT,GET_PRODUCT_BY_CATEGORY } from "./productType";

const initialState ={
products:[],
categoryProduct:[],

}

const productReducer = (state = initialState,action)=>{
    switch (action.type) {
        case GET_PRODUCT:
            return{
                ...state,
             products:[...action.payload]
            };
            case GET_PRODUCT_BY_CATEGORY:
            return{
                ...state,
                categoryProduct:[...action.payload]
            }
          
    
        default:
          return{
            ...state
          }
    }
}

export default productReducer