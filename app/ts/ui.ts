import { CART_CLOSED_POSITION, CART_OPENED_POSITION } from "../configuration/wwurm";

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



