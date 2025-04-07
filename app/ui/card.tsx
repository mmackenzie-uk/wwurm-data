import Link from "next/link";

import BtnBuy from "../ui-client/btn-buy";
import { BtnLike } from "./btns";
import { IMAGE_PREFIX } from "../configuration/s3-configuration";
import { IProductDTO } from "../DTO/productDTO";

export default function Card({ productDTO }: {
    productDTO: IProductDTO;
}) {
    const { name, mediumImage, slug } = productDTO;
    const src = IMAGE_PREFIX + encodeURIComponent(mediumImage[0]); 
    return (
        <div className="card">                   
            <Link href={`/product/${slug}`} className="card-img-wrap">
                <img className="card-img" src={src} alt="card image" />
            </Link>            
            <div className="card-caption">
                <ul className="card-detail-list">
                    <li key="card-link"><Link href="" className="card-link">{name}</Link></li>
                    <li key="btn-buy"><BtnBuy productDTO={productDTO}/></li>                                    
                </ul>
                <div className="card-like">
                    <BtnLike />
                </div>
            </div>
        </div>
    );
}