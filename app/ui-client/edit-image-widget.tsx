"use client"

import { useState } from "react";
import { SHOP } from "../configuration/wwurm";

export default function EditImageWidget({ thumbnails, images }: {
    thumbnails?: Array<string>;
    images?: Array<string>;
}) {

    const [selected, setSelected] = useState(0);
    const handleSelect = (index: number) => setSelected(index);

    return (
    <div className="edit-image-widget">
        <ul className="edit-image-widget-small-list" role="list">
        {
            thumbnails && thumbnails.map((src, index) => 
            <li key={index} className={`edit-image-widget-small-image-wrap ${(index === selected) ? "thumbnail-selected" : ""}`} >
                <img 
                    src={`/${SHOP}/${'place-holder-small-image.jpg'}`} 
                    onClick={() => handleSelect(index)} 
                    className="edit-image-widget-small-image"
                />
                <img 
                    src={`/${SHOP}/${src}`} 
                    onClick={() => handleSelect(index)} 
                    className="edit-image-widget-small-image"
                />
            </li>)
        } 
        </ul>
        <ul className="edit-image-widget-large-list" role="list">
            <div className="edit-image-btn-wrap">
                <button className="edit-image-remove">-</button>
                <button className="edit-image-add">+</button>
            </div>
        {
            images && images.map((src, index) => 
            <li key={index} className="edit-image-widget-large-image-wrap">
                <img 
                    className = {`edit-image-widget-large-image ${(index === selected) ? "selected" : ""}`} 
                    src={`/${SHOP}/${'place-holder-large-image.jpg'}`} 
                /> 
                 <img 
                    className = {`edit-image-widget-large-image ${(index === selected) ? "selected" : ""}`} 
                    src={`/${SHOP}/${src}`} 
                />
            </li>)
        }
        </ul>
    </div>
    );
  }