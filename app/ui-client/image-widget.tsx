"use client"

import { useState } from "react";
import { SHOP } from "../configuration/wwurm";

export default function ImageWidget({ thumbnails, images }: {
    thumbnails?: Array<string>;
    images?: Array<string>;
}) {

    const [selected, setSelected] = useState(0);
    const handleSelect = (index: number) => setSelected(index);

    return (
    <div className="product-images">
        <ul className="thumbnail-list" role="list">
        {
            thumbnails && thumbnails.map((src, index) => 
            <li key={index} className={`thumbnail ${(index === selected) ? "thumbnail-selected" : ""}`} >
                <img src={`/${SHOP}/${src}`} onClick={() => handleSelect(index)} className="thumbnail-img"/>
            </li>)
        } 
        </ul>
        <ul className="images-list" role="list">
        {
            images && images.map((src, index) => 
            <li key={index} className="product-image-wrap">
                <img 
                    className = {`product-image ${(index === selected) ? "selected" : ""}`} 
                    src={`/${SHOP}/${src}`} 
                />
            </li>)
        }
        </ul>
    </div>
    );
  }