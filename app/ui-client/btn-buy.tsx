"use client"

import { store } from "@/app/cart-store/cart";
import { openCart } from "../ts/ui";
import { IProductResponse } from "../conversion/product-convert";
import { toCartItem } from "../conversion/cart-item-convert";

export default function BtnBuy({ productResponse } : {
    productResponse: IProductResponse
}) {

    const cartItem = toCartItem(productResponse);
    if (!cartItem) return;
    const addItem = () => {
        store.add(cartItem);
        openCart();
    }

    return (
        <button className="btn-buy" onClick={addItem}>
            <span>$ {productResponse.price.toFixed(2)}</span>
        </button>
    );
}

