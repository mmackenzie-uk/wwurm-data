"use client"

import { store } from "@/app/persistence/cart";
import { IProduct } from "../ts/type-definitions";
import { openCart } from "../ts/ui";
import { toCartItem } from "../data/data-conversion";

export default function BtnBuy({ product } : {
    product: IProduct
}) {

    const cartItem = toCartItem(product);
    const addItem = () => {
        store.add(cartItem);
        openCart();
    }

    return (
        <button className="btn-buy" onClick={addItem}>
            <span>$ {product.price.toFixed(2)}</span>
        </button>
    );
}

