import expect from  "expect.js"
import reducer from "../src/reducers";
import {SHOW_PRODUCT} from "../src/constants";

describe( "product reducer", function( ) {
    describe( "fetch product", function( ) {
        const action = {
            type: SHOW_PRODUCT,
            product_id: 1
        };

        const initialState = {
            products: [ {
                id: 1,
                price: 10,
                name: "Banana",
                description: "The banana is an edible fruit – botanically a berry– produced by several kinds of large herbaceous flowering plants in the genus Musa.",
                creationDate: new Date(),
            } ],
            productToShow: {},
        };

        const result = reducer( initialState, action );

        it( "should set the productToShow", function( ) {
            expect( result.productToShow.id ).to.be( 1 );
            expect( result.productToShow.name ).to.be("Banana");
            expect( result.productToShow.price).to.be( 10 );
        } );
    } );
} );