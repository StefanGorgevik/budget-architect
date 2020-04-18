const initState = {
    products: [],
    addNewGroupClicked: false,
    mode: 'products',
    productToEdit: {}
}

export function productsReducer(state = initState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return { ...state, products: action.payload }
        }
        case "SAVE_PRODUCT": {
            return { ...state, products: [...state.products, action.payload] }
        }
        case "PRODUCT_TO_EDIT": {
            return {
                ...state, productToEdit: action.payload
            }
        }
        case "EDIT_PRODUCT": {
            return {
                ...state, products: state.products.map((prod) => {
                    if(prod._id === action.payload._id) {
                        return {
                            ...prod,
                            ...action.payload
                        }
                    } else {
                        return prod
                    }
                })
            }
        }
        case "DELETE_PRODUCT": {
            return {
                ...state, products: state.products.filter(prod => prod._id !== action.payload)
            }
        }
        case "SORT_PRODUCTS": {
            let val = action.payload
            return {
                ...state, products: [...state.products].sort((a, b) =>
                    (a[val] > b[val]) ? 1 : ((b[val] > a[val]) ? -1 : 0))
            }
        }
        default:
            return state;
    }
}