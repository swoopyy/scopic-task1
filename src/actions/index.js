import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SAVE_PRODUCT,
  SHOW_PRODUCT,
} from '../constants';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product
  };
}


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

export function showProduct(product_id) {
  return {
    type: SHOW_PRODUCT,
    product_id
  }
}
