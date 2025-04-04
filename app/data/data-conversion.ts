import { IProduct, ITruncatedProduct } from "../ts/type-definitions";

export const truncate = (product: IProduct) => {
    const truncatedProduct : ITruncatedProduct = {
        id: product.id,
        name: product.name,
        smallImage: product.smallImage,
        price: product.price,
        slug: product.slug
    }
    return truncatedProduct;
}