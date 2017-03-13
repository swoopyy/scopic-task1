import uuidV1 from 'uuid/v1';
import {
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SHOW_PRODUCT,
} from '../constants';

var initialState = {
  products: [
    {
      id: uuidV1(),
      price: 12,
      name: "Red Delicious Apple",
      description: "Red Delicious is one of the most famous American apples, and one of the most widely grown apple varieties.",
      creationDate: new Date(),
    },
    {
      id: uuidV1(),
      price: 10,
      name: "Banana",
      description: "The banana is an edible fruit – botanically a berry– produced by several kinds of large herbaceous flowering plants in the genus Musa.",
      creationDate: new Date(),
    },
    {
      id: uuidV1(),
      price: 20,
      name: "Cherry",
      decription: "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit).",
      creationDate: new Date(),
    },
    {
      id: uuidV1(),
      price: 11,
      name: "Peach",
      decription: "The peach (Prunus persica) is a deciduous tree native to the region of Northwest China between the Tarim Basin and the north slopes of the Kunlun Shan mountains, where it was first domesticated and cultivated.",
      creationDate: new Date(),
    },
    {
      id: uuidV1(),
      price: 11,
      name: "Pineapple",
      decription: "The pineapple (Ananas comosus) is a tropical plant with an edible multiple fruit consisting of coalesced berries, also called pineapples,[2][3] and the most economically significant plant in the Bromeliaceae family.",
      creationDate: new Date(),
    },
  ],
  productToShow: null,
};

function findProductById(id, products) {
  for (var i = 0; i < products.length; ++i) {
    if (products[i].id === id) {
      return products[i];
    }
  }
}

function deleteProductById(id, products) {
  var out_ar = [];
  for (var i = 0; i < products.length; ++i) {
    if (products[i].id !== id) {
      out_ar.push(products[i]);
    }
  }
  return out_ar;
}

function updateProductById(id, products, newProduct) {
  for (var i = 0; i < products.length; ++i) {
    if (products[i].id === id) {
      products[i] = {
        id,
        ...newProduct
      };
      return products;
    }
  }
}

export default function products(state=initialState, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: deleteProductById(action.product_id, state.products)
      }
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: updateProductById(action.product_id, state.products, state.product),
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        productToShow: findProductById(action.product_id, state.products),
      }
    case SHOW_PRODUCT:
      return {
        ...state,
        productToShow: findProductById(action.product_id, state.products),
      }
    default:
      return state;
  }
        case RESET_PRODUCT_TO_SHOW:
            console.log("PRODUCT TO SHOW");
            return {
                ...state,
                productToShow: null,

}
