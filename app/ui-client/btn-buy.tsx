"use client"

import { store } from "@/app/persistence/cart";
import { IProduct } from "../ts/type-definitions";
import { openCart } from "../ts/ui";
import { truncate } from "../data/data-conversion";

export default function BtnBuy({ product } : {
    product: IProduct
}) {

    const truncatedProduct = truncate(product);
    const addItem = () => {
        store.add(truncatedProduct);
        openCart();
    }

    return (
        <button className="btn-buy" onClick={addItem}>
            <span>$ {product.price.toFixed(2)}</span>
        </button>
    );
}

