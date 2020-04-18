export function getProducts(products) {
    return {
        type: "GET_PRODUCTS",
        payload: products
    }
}

export function saveProduct(product) {
    return {
        type: "SAVE_PRODUCT",
        payload: product
    }
}

export function productToEdit(product) {
    return {
        type: "PRODUCT_TO_EDIT",
        payload: product
    }
}

export function editProduct(product) {
    return {
        type: "EDIT_PRODUCT",
        payload: product
    }
}


export function deleteProduct(id) {
    return {
        type: "DELETE_PRODUCT",
        payload: id
    }
}


export function sortProducts(val) {
    return {
        type: "SORT_PRODUCTS",
        payload: val
    }
}
