"use client"

import { ICallback, ICart, IStore, ITruncatedProduct,  } from "../ts/type-definitions";

/* Localstorage is used for state management as state is not preserved from server
 side render of Nextjs */

const CART_KEY = "wwurm-access-key";

/* Singleton - must be a singleton to work */
let instance: Store;

class Store implements IStore {
    cart: ICart = [];

    /* Maintain a list of callback functions to update the ui when the cart is changed */
    callbacks: Array<ICallback> = [];

    constructor() {
        /* instantiate as a singleton */
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        // important: update cart from local storage when constructor called, 
        // otherwise it initialise to empty on
        // every page refresh
        let _contents = global?.localStorage?.getItem(CART_KEY); 
        if ( _contents ) {
            this.cart = JSON.parse(_contents);     
        }
        instance = this;
    }

    getInstance = () => this;

    triggerCallbacks = () => this.callbacks.forEach((fn) => fn());

    getCount = () => this.cart.length;
    
    getCart() {
        let _contents = localStorage.getItem(CART_KEY);
        if ( _contents ) {
            this.cart = JSON.parse(_contents);     
        } else {
            this.cart = [];
        }
        return this.cart;
    }

    async sync () {
        /* the state is the local stoprage. update with each change to cart */
        let _cart = JSON.stringify(this.cart);
        await localStorage.setItem(CART_KEY, _cart);
    }

    find (id: number) {
        //find an item in the cart by it's id
        let match = this.cart.filter(item => ( item.id === id ));
        if( match && match[0] )
            return match[0];
    }

    add (truncatedProduct: ITruncatedProduct, qty=1) {
        //add a new item to the cart
        //check that it is not in the cart already
        const id = truncatedProduct.id;
        if( this.find(id) ){
            this.cart = this.cart.map(item => {
                if( item.id === id )
                    item.qty = item.qty + qty;
                return item;
            });
        } else {
            this.cart.push({
                id: truncatedProduct.id,
                name: truncatedProduct.name,
                qty: qty,
                price: truncatedProduct.price,
                slug: truncatedProduct.slug,
                smallImage: truncatedProduct.smallImage
            });
        } 
        this.sync();
        this.triggerCallbacks();  
    }

    increase (id : number) {    
        //increase the quantity of an item in the cart   
        const qty = 1;
        this.cart = this.cart.map(item => {
            if( item.id === id )
                item.qty = item.qty + qty;
            return item;
        });
        //update localStorage
        this.sync(); 
        this.triggerCallbacks();
    }

    reduce (id : number,) {
        //reduce the quantity of an item in the cart
        const qty = 1;
        this.cart = this.cart.map( item => {
            if( item.id === id )
                item.qty = item.qty - qty;
            return item;
        });
        this.cart.forEach(async item => {
            if(item.id === id && item.qty === 0)
                await this.remove(id);
        });
        //update localStorage
        this.sync();
        this.triggerCallbacks();
    }

    remove (id: number) {
        //remove an item entirely from CART.contents based on its id
        this.cart = this.cart.filter( item => {
            if( item.id !== id )
                return true;
        });
        //update localStorage
        this.sync();
        this.triggerCallbacks();
    }

    empty () {
        //empty whole cart
        this.cart = [];
        //update localStorage
        this.sync();
        this.triggerCallbacks();
    }

    /* register a callback function to be called when the cart is updated */
    registerCallback = (fn: () => void) => this.callbacks.push(fn);

}

const store = new Store();

export { store } ;

