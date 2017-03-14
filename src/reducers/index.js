import uuidV1 from 'uuid/v1';
import {
    SAVE_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    SHOW_PRODUCT,
    RESET_PRODUCT_TO_SHOW
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
            description: "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit).",
            creationDate: new Date(),
        },
        {
            id: uuidV1(),
            price: 11,
            name: "Peach",
            description: "The peach (Prunus persica) is a deciduous tree native to the region of Northwest China between the Tarim Basin and the north slopes of the Kunlun Shan mountains, where it was first domesticated and cultivated.",
            creationDate: new Date(),
        },
        {
            id: uuidV1(),
            price: 11,
            name: "Pineapple",
            description: "The pineapple (Ananas comosus) is a tropical plant with an edible multiple fruit consisting of coalesced berries, also called pineapples,[2][3] and the most economically significant plant in the Bromeliaceae family.",
            creationDate: new Date(),
        },
    ],
    productToShow: {
        id: uuidV1(),
        price: "",
        description: "",
        name: "",
        creationDate: new Date(),
    },
};

function findProductById(id, products) {
    for (var i = 0; i < products.length; ++i) {
        if (products[i].id === id) {
            return products[i];
        }
    }
}

function deleteProductById(id, products) {
    var out = [];
    for (var i = 0; i < products.length; ++i) {
        if (products[i].id !== id) {
            out.push(products[i]);
        }
    }
    return out;
}

function updateProduct(oldId, product, products) {
    var out = [];
    for (var i = 0; i < products.length; ++i) {
        if (products[i].id === oldId) {
            out[i] = product;
        } else {
            out[i] = products[i];
        }
    }
    return out;
}

export default function products(state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_PRODUCT:
            let product = {
                ...action.product,
                id: uuidV1(),
                creationDate: new Date(),
            };
            return {
                ...state,
                products: [...state.products, product],
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: deleteProductById(action.product_id, state.products)
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: updateProduct(action.oldId, action.product, state.products),
            };
        case EDIT_PRODUCT:
            return {
                ...state,
                productToShow: findProductById(action.product_id, state.products),
            };
        case SHOW_PRODUCT:
            return {
                ...state,
                productToShow: findProductById(action.product_id, state.products),
            };
        case RESET_PRODUCT_TO_SHOW:
            return {
                ...state,
                productToShow: {
                    id: uuidV1(),
                    price: "",
                    description: "",
                    name: "",
                    creationDate: new Date(),
                },
            };
        default:
            return state;
    }

}
