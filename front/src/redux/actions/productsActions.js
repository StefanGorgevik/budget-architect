export function getProducts(products) {
    return {
        type: "GET_PRODUCTS",
        payload: products
    }
}
export function editProduct(product) {
    return {
        type: "EDIT_PRODUCT",
        payload: product
    }
}

export function handleIsChecked(val, checked) {
    return {
        type: "HANDLE_IS_CHECKED",
        val: val,
        checked: checked
    }
}

export function deleteProducts() {
    return {
        type: "DELETE_PRODUCTS"
    }
}

export function addNewGroupClicked(clicked) {
    return {
        type: "ADD_NEW_GROUP_CLICKED",
        payload: clicked
    }
}
export function changeMode(mode) {
    return {
        type: "CHANGE_MODE",
        payload: mode
    }
}

export function saveGroup(group) {
    return {
        type: "SAVE_GROUP",
        payload: group
    }
}

export function deleteGroup(group) {
    return {
        type: "DELETE_GROUP",
        payload: group
    }
}

export function sortGroups(val) {
    return {
        type: "SORT_GROUPS",
        payload: val
    }
}
export function sortProducts(val) {
    return {
        type: "SORT_PRODUCTS",
        payload: val
    }
}
