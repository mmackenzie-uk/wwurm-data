"use client"
import { useState } from "react";
import { openCart } from "../ts/ui";
import InputNumber from "./input-number";

import { IProductResponse } from "../conversion/product-convert";
import { toCartItem } from "../conversion/cart-item-convert";
import { store } from "../services/cart-service";

export default function CartAdd({ productResponse } : { productResponse : IProductResponse}) {
    const [count, setCount ] = useState(1);

    const addItem = () => {
        let cartItem = toCartItem(productResponse);
        if (!cartItem) return
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

