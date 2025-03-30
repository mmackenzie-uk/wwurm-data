import Link from "next/link";
import BtnBuy from "../ui-client/btn-buy";
import { BtnLike } from "./btns";
import { IProduct } from "../ts/type-definitions";

type ICard = {
    product: IProduct;
    index?: string | number | undefined;
}

export default function Card({ product, index }: ICard ) {
    const { name, mediumImage, slug } = product;
    const _card = mediumImage && mediumImage[0];
    return (
        <div key={index} className="card">                   
            <Link href={`/product/${slug}`} className="card-img-wrap">
                <img className="card-img" src={`/products-nm/${_card}`} />
            </Link>            
            <div className="card-caption">
                <ul className="card-detail-list">
                    <li key="card-link"><Link href="" className="card-link">{name}</Link></li>
                    <li key="btn-buy"><BtnBuy product={product}/></li>                                    
                </ul>
                <div className="card-like">
                    <BtnLike />
                </div>
            </div>
        </div>
    );
  }