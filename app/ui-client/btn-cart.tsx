"use client"

import { useEffect, useState } from "react";

import { store } from "@/app/cart-store/cart";
import { openCart } from "../ts/ui";

export default function BtnCart() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(store.getCount())
        store.registerCallback(callback)
    }, []);

    const callback = () => setCount(store.getCount());
    
    return (
        <button onClick={openCart} className="cart-header-btn">
            <i className="cm-font-shopping-cart" ></i>
            &nbsp;<span className="cart-header-count">{count}</span> 
        </button>
    );
}