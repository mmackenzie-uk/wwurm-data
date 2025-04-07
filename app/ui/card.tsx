import Link from "next/link";
import BtnBuy from "../ui-client/btn-buy";
import { BtnLike } from "./btns";
import { IMAGE_PREFIX } from "../configuration/s3-configuration";
import { IProductResponse } from "../conversion/product-convert";

export default function Card({ productResponse, index }: {
    productResponse: IProductResponse;
    index?: string | number | undefined;
}) {
    const { name, mediumImage, slug } = productResponse;
    const src = IMAGE_PREFIX + encodeURIComponent(mediumImage[0]); 
    return (
        <div key={index} className="card">                   
            <Link href={`/product/${slug}`} className="card-img-wrap">
                <img className="card-img" src={src} />
            </Link>            
            <div className="card-caption">
                <ul className="card-detail-list">
                    <li key="card-link"><Link href="" className="card-link">{name}</Link></li>
                    <li key="btn-buy"><BtnBuy productResponse={productResponse}/></li>                                    
                </ul>
                <div className="card-like">
                    <BtnLike />
                </div>
            </div>
        </div>
    );
}