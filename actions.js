/***
 *  Products Reducers
 ***/
export default (state = { products: [],detail_products: [] }, action) => {
    if(action.type === "ACTUAL_PRODUCTS")
    {
        return { ...state,
            products: action.products };
    }
    else if(action.type === "GET_SINGLE_PRODUCT"){
        if (state.products.findIndex(product => product.id === action.productId) !== -1) {
            const product_single = state.products.reduce((itemAcc, product) => {
                return product
            }, [])
            return { ...state,
                detail_products: product_single };
        }
    }
    else
    {
        return state;
    }
};