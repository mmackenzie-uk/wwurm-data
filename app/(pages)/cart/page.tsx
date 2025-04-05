"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { SHOP } from "@/app/configuration/wwurm"; 
import { store } from "@/app/cart-store/cart";
import { ICart } from "@/app/ts/type-definitions";
import InputNumber from "@/app/ui-client/input-number";

export default function Cart() {
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
       <div className="cart">
        <section className="section">
        
            <div className="card-grid">
                <div className="card-grid-item-left">
                    <h2 className="card-grid-item-title">Warenkorb</h2>
                    <ul className="cart-items" role="list">
                    {
                        cart.map(({id, name, price, image, slug, qty}) => 
                        <li key={id} className="cart-item">
                            <div className="cart-row">
                                <div className="cart-col-1">
                                    <div className="cart-col-img-wrap" >
                                        <img src={`/${SHOP}/${image}`} className="cart-col-img" width="75"/>
                                    </div>
                                </div>
                                <div className="cart-col-2">
                                    <Link href={slug} className="cart-col-heading">{name}</Link>
                                    <div className="cart-price-small">$ {price.toFixed(2)}</div>
                                    <div className="col-cart-qty">
                                        <span>Anz.</span>
                                        <InputNumber 
                                            increment={() => store.increase(id)}              
                                            decrement={() => store.reduce(id)}              
                                            value={qty}
                                        />
                                    </div>
                                </div>
                                <div className="cart-col-3">
                                    <h4>&nbsp;</h4>
                                    <div className="cart-price-small">&nbsp;</div>
                                    <p>$ {(price * qty).toFixed(2)}</p>
                                    <button className="remove-btn" onClick={() => store.remove(id)}>
                                        <i className="cm-font nm-font-close2"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                        )
                    }
                    </ul>
                </div>
                <div className="card-grid-item-right">
                    <h2 className="card-grid-item-title">Warenkorb-Summe</h2>
                    <div className="cart-coupon">
                        <div className="nm-coupon-inner">
                            <span id="nm-coupon-btn">Gutschein hinzufü­gen</span>
                        </div> 
                    </div>
                    <div className="cart-subtotal"><span>Zwis­chen­summe</span><span className="cart-subtotal-price">$ {total.toFixed(2)}</span></div>
                    <div className="cart-shipping-wrap">
                        <p className="cart-shipping">Versand</p>
                        <p className="cart-shipping-nsw"><span>Innerhalb Berlins & Deutschlands (1–2 Tage)</span>
                            <span className="cart-shipping-nsw-price">$ 0</span></p>
                        <p className="cart-shipping-australia">Versand Europaweit</p>
                    </div>
                    <div className="cart-total"><span>Total</span><span>$ {total.toFixed(2)}</span></div>
                    <Link href="/" className="cart-btn">Weiter einkaufen</Link>
                    <button className="cart-paypal-btn">Weiter zur Kasse</button>
                </div>
            </div>
           
        </section>

       </div>
    );
}


