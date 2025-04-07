"use client"
import { openCart } from "../ts/ui";
import { IProductDTO } from "../DTO-mappings/product-mappings";
import { toCartItem } from "../DTO-mappings/cart-item-mappings";
import { store } from "../services/cart-service";

export default function BtnBuy({ productDTO } : {
    productDTO: IProductDTO
}) {

    const cartItem = toCartItem(productDTO);
    if (!cartItem) return;
    const addItem = () => {
        store.add(cartItem);
        openCart();
    }

    return (
        <button className="btn-buy" onClick={addItem}>
            <span>$ {productDTO.price.toFixed(2)}</span>
        </button>
    );
}

