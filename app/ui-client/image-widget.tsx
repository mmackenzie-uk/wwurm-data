"use client"

import { useState } from "react";
import { AWS_BUCKET_NAME, S3_ALBUM_NAME, SHOP } from "../configuration/wwurm";

const href = `https://${AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/`;
const prefix = href + S3_ALBUM_NAME + "/";

export default function ImageWidget({ largeImage, smallImage }: {
    largeImage?:string;
    smallImage?: string;
}) {
    const [selected, setSelected] = useState(0);
    const handleSelect = (index: number) => setSelected(index);
    const thumbs = smallImage!.split(',');
    const images = largeImage!.split(',');
    return (
    <div className="product-images">
        <ul className="thumbnail-list" role="list">
        {
            thumbs.map((thumb, index) => {
                const src = prefix + encodeURIComponent(thumb); 
                return ( 
                <li key={index} className={`thumbnail ${(index === selected) ? "thumbnail-selected" : ""}`} >
                    <img src={src} onClick={() => handleSelect(index)} className="thumbnail-img"/>
                </li>)
            })    
        } 
        </ul>
        <ul className="images-list" role="list">
        {
            images.map((image, index) => {
                const src = prefix + encodeURIComponent(image);  
                return (
                <li key={index} className="product-image-wrap">
                    <img 
                        className = {`product-image ${(index === selected) ? "selected" : ""}`} 
                        src={src} 
                    />
                </li>)
            })           
        }
        </ul>
    </div>
    );
  }