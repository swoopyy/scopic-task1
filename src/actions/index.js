import {
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    SAVE_PRODUCT,
    SHOW_PRODUCT,
    RESET_PRODUCT_TO_SHOW,
    UPDATE_PRODUCT
} from '../constants';


export function editProduct(product_id) {
    return {
        type: EDIT_PRODUCT,
        product_id
    };
}

export function deleteProduct(product_id) {
    return {
        type: DELETE_PRODUCT,
        product_id,
    };
}

export function saveProduct(product) {
    return {
        type: SAVE_PRODUCT,
        product
    };
}

export function updateProduct(oldId, product) {
    return {
        type: UPDATE_PRODUCT,
        product,
        oldId
    }
}

export function showProduct(product_id) {
    return {
        type: SHOW_PRODUCT,
        product_id
    };
}

export function resetProductToShow() {
    return {
        type: RESET_PRODUCT_TO_SHOW,
    };
}

