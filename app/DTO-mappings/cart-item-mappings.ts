
import { ICartItem } from "../domain/cart";
import { IProductDTO } from "../DTO/productDTO";

export const toCartItem = (productDTO: IProductDTO, qty = 1) => {
    if (!productDTO.id) {
        return;
    }
    const cartItem : ICartItem = {
        id: productDTO.id,
        name: productDTO.name,
        smallImage: productDTO.smallImage[0],
        price: productDTO.price,
        slug: productDTO.slug,
        qty: qty
    }
    return cartItem;
}