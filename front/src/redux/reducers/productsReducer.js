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
        case "EDIT_PRODUCT": {
            return {
                ...state, products: state.products.filter(prod =>
                    prod.id !== action.payload.id), productToEdit: action.payload
            }
        }
        case "HANDLE_IS_CHECKED": {
            return {
                ...state, products: state.products.map((prod, i) => prod.name === action.val ? { ...prod, isChecked: action.checked } : prod)
            }
        }
        case "DELETE_PRODUCTS": {
            return {
                ...state, products: state.products.filter(prod => { return !prod.isChecked }
                )
            }
        }
        case "ADD_NEW_GROUP_CLICKED": {
            return { ...state, addNewGroupClicked: action.payload }
        }
        case "CHANGE_MODE": {
            return { ...state, mode: action.payload }
        }
        case "SAVE_GROUP": {
            return { ...state, productGroups: [...state.productGroups, action.payload] }
        }
        case "DELETE_GROUP": {
            return { ...state, productGroups: state.productGroups.filter(group => group.id !== action.payload.id) }
        }
        case "SORT_GROUPS": {
            let val = action.payload
            return {
                ...state, productGroups: [...state.productGroups].sort((a, b) =>
                    (a[val] > b[val]) ? 1 : ((b[val] > a[val]) ? -1 : 0))
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