import { CART_CLOSED_POSITION, CART_OPENED_POSITION } from "../configuration/wwurm";
import { IProduct, ITruncatedProduct } from "./type-definitions";
import { AWS_BUCKET_NAME, S3_ALBUM_NAME } from "../configuration/wwurm";

export const openCart = () => {
    const sideNav = document.getElementById("cart-aside");
    if (sideNav) {
       sideNav.style.right = CART_OPENED_POSITION;
    }
}

export const closeCart = () => {
    const sideNav = document.getElementById("cart-aside");
    if (sideNav) {
       sideNav.style.right = CART_CLOSED_POSITION;
       window.scroll({top: 0, left: 0});
    }
}

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

export const href = `https://${AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/`;
export const IMAGE_PREFIX = href + S3_ALBUM_NAME + "/";