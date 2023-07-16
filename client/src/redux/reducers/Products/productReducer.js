import { GET_PRODUCT,GET_PRODUCT_BY_CATEGORY , GET_PRODUCT_SEARCH} from "./productType";

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
            };
            case GET_PRODUCT_SEARCH:
                return{
                    ...state,
                    products:[...action.payload]
                }
          
    
        default:
          return{
            ...state
          }
    }
}

export default productReducer