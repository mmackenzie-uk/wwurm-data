"use client"

import {  store } from "@/app/persistence/cart";
import { ITruncatedProduct, IProduct } from "../ts/type-definitions"

import { useState } from "react";
import { openCart } from "../ts/ui";
import InputNumber from "./input-number";

type IBtnBuy = {
    product?: IProduct
}

export default function CartAdd({ product } : IBtnBuy) {
    const [count, setCount ] = useState(1);

    let truncatedProduct : ITruncatedProduct;

    if (product) {
        truncatedProduct = {
            id: product.id,
            name: product.name,
            image: product.smallImage? product.smallImage[0] : "",
            price: product.price,
            slug: product.slug
        }
    }
    
    const addItem = () => {
        if (truncatedProduct) {
            store.add(truncatedProduct, count);
            openCart();
        }
    }

    const increment = () => {
        setCount(c => count + 1)
    }

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

