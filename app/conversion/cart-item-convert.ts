import { IProductResponse } from "../conversion/product-convert";
import { ICartItem } from "../domain/cart";

export const toCartItem = (productResponse: IProductResponse, qty = 1) => {
    if (!productResponse.id) {
        return;
    }
    const cartItem : ICartItem = {
        id: productResponse.id,
        name: productResponse.name,
        smallImage: productResponse.smallImage[0],
        price: productResponse.price,
        slug: productResponse.slug,
        qty: qty
    }
    return cartItem;
}