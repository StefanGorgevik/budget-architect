const initState = {
    products: [
        {
            id: 25,
            name: "cheese",
            type: "food",
            price: 150,
            quantity: 1,
            date: "2020-01-01",
            isChecked: false
        },
        {
            id: 1,
            name: "burger",
            type: "food",
            price: 120,
            quantity: 2,
            date: "2019-01-01",
            isChecked: false
        },
        {
            id: 3,
            name: "coca cola",
            type: "drinks",
            price: 60,
            quantity: 5,
            date: "2020-06-01",
            isChecked: false
        }
    ],
    productGroups: [
        {
            id: 0,
            groupDate: "2019-05-01",
            type: 'groceries',
            groupTotalPrice: 500,
            isChecked: false,
            products: [
                {
                    id: 25,
                    name: "Burger",
                    price: 150,
                    quantity: 2
                },
                {
                    id: 255,
                    name: "Alva",
                    price: 100,
                    quantity: 2
                },
            ]
        },
        {
            id: 22,
            groupDate: "2020-01-01",
            type: "electronics",
            groupTotalPrice: 600,
            isChecked: false,
            products: [
                {
                    id: 23,
                    name: "Phone",
                    price: 150,
                    quantity: 2
                },
                {
                    id: 233,
                    name: "Laptop",
                    price: 150,
                    quantity: 2
                }
            ]
        }
    ],
    addNewGroupClicked: false,
    mode: 'products',
    productToEdit: {},
    signInClicked: false,
    accountClicked: false
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case "SAVE_PRODUCT": {
            return { ...state, products: [...state.products, action.payload] }
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
        case "SIGN_IN_CLICKED": {
            return {
                ...state,  signInClicked: action.payload}
        }
        case "ACCOUNT_CLICKED": {
            return {
                ...state,  accountClicked: action.payload}
        }
        default:
            return state;
    }
}