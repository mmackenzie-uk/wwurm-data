"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import { AWS_BUCKET_NAME, S3_ALBUM_NAME, SHOP } from "../configuration/wwurm";
import { store } from "@/app/persistence/cart";
import { ICart } from "../ts/type-definitions";
import InputNumber from "./input-number";
import { closeCart, IMAGE_PREFIX } from "../ts/utility";

export default function CartAside() {
    const [cart, setCart] = useState<ICart>([]);

    useEffect(() => {
        setCart(store.getCart());
        store.registerCallback(callback);
    }, []);

    const callback = () => setCart(store.getCart());

    let total = 0;
    cart.forEach(({ price, qty }) => {
        total = price * qty + total;
    });
    return (
            <div id="cart-aside" className="cart-aside-wrap">
                <div className="cart-aside-header">
                    <div className="cart-aside-header-wrap">
                        <button onClick={closeCart} className="cart-aside-close-btn">Schließen</button> 
                    </div>
                </div>        
                {
                (cart.length === 0) ?
                    <ul className="cart-aside-list" role="list">
                        <li key={"empty-cart-key"} className="cart-aside-empty">
                            <i className="nm-font nm-font-close2"></i>
                            <p className="cart-aside-notify">Es befinden sich keine Produkte im Warenkorb.</p>
                        </li>
                    </ul>
                :
                    <ul className="cart-aside-items" role="list">
                    {
                        cart.map(({id, name, price, smallImage, slug, qty}) => {                      
                            const src = IMAGE_PREFIX + encodeURIComponent(smallImage!.split(',')[0]); 
                            return ( 
                                <li key={id} className="cart-aside-item">
                                    <div className="row">
                                        <div className="col-1">
                                            <div className="col-img-wrap" >
                                                <img src={src} className="col-img" width="60"/>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <Link href={slug} className="col-heading overflow">{name}
                                            </Link>
                                            <div className="col-qty"><span>Anz. </span>  
                                                <InputNumber 
                                                    increment={() => store.increase(id)}              
                                                    decrement={() => store.reduce(id)}              
                                                    color="#eee"
                                                    value={qty}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <h4>&nbsp;</h4>
                                            <p>$ {(price * qty).toFixed(2)}</p>
                                            <button onClick={() => store.remove(id)} className="remove-cart-btn">
                                                <i className="cm-font nm-font-close2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>)
                            })
                    }
                    </ul>
                }
                <div className="cart-aside-summary">
                    <p>Zwischensumme:</p>
                    <p>$ {total.toFixed(2)}</p>
                </div>
                <div className="cart-aside-footer">
                    <div className="cart-aside-footer-wrap">
                        <Link href="/" className="cart-aside-continue-btn" scroll={false} onClick={closeCart}>Weiter einkaufen</Link>
                        <Link href="/cart" className="cart-aside-checkout-btn" scroll={false} onClick={closeCart} >Kasse</Link>
                    </div>   
                </div>
            </div>
    );
        
}
