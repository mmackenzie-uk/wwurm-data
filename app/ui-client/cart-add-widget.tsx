"use client"

import {  store } from "@/app/persistence/cart";
import { ITruncatedProduct, IProduct, ICartItem } from "../ts/type-definitions"

import { useState } from "react";
import { openCart } from "../ts/ui";
import InputNumber from "./input-number";
import { toCartItem } from "../data/data-conversion";

export default function CartAdd({ product } : { product : IProduct}) {
    const [count, setCount ] = useState(1);

    const addItem = () => {
        let cartItem = toCartItem(product);
        cartItem.qty = count;
        store.add(cartItem);
        openCart();
    }

    const increment = () => setCount(c => count + 1);

    const decrement = () => {
        if (count > 1) {
            setCount(c => c - 1)
        }  
    }

    return (
        <>
            <div className="product-quantity">
                <InputNumber value={count} increment={increment} decrement={decrement} />
            </div>
            <button className="product-buy-now" onClick={addItem}>Buy Now</button>
        </>
    );
}

