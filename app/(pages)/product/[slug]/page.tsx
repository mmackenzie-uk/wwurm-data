import { BtnNext, BtnPrev } from "@/app/ui/btns";
import Card from "@/app/ui/card";
import Link from "next/link";

import { ICON_LIST} from "@/app/configuration/wwurm";
import { getProductPageData } from "@/app/actions/database";
import CartAddWidget from "@/app/ui-client/cart-add-widget";
import ImageWidget from "@/app/ui-client/image-widget";

export default async function Product({ params, }: {params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const { product, similar, categorySlug} = await getProductPageData(slug);

    type IBreadCrumb = { name: string; url: string; }

    const breadCrumbs: Array<IBreadCrumb> = [
        { name: "Shop", url: "/"},
        { name: categorySlug, url: `/${categorySlug}`}, 
        { name: product.name, url: product.name}
    ]
    const len = breadCrumbs.length;

    return (
        <>
            <div className="product"> 
                <section className="section">
                    <div className="product-nav">
                        <nav>
                            <ul className="breadcrumb-list" role="list">
                            {
                               breadCrumbs.map(({ name, url}, idx) => 
                                    <li key={name}>
                                        {
                                            (idx != len - 1) ?
                                            <Link href={url}>{name} /</Link>
                                            : 
                                            <span>{url}</span>
                                        }
                                    </li>)
                            }
                            </ul>
                        </nav>
                        <nav>
                            <ul className="nav-btns" role="list">
                                <li key="btn-prev"><BtnPrev /></li>
                                <li key="btn-next"><BtnNext /></li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section className="section">
                    <div className="product-grid">
                        <ImageWidget smallImage={product.smallImage} largeImage={product.largeImage} />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">$ {product.price.toFixed(2)}</p>
                            <p className="product-description">{product.description}</p>
                            <div className="product-availability">
                                {(product.availability > 0) ? "In Stock" : "Out of Stock"}
                            </div>
                            <CartAddWidget product={product}/>
                            <ul className="product-icon" role="list">     
                            {
                                ICON_LIST.map(({ icon }, idx) => <li key={idx}><a href="" ><i className={icon}></i></a></li>)
                            }
                            </ul>
                        
                        </div>
                    </div>
                </section>
            </div>
               
            <div className="similar-products">
                <section className="section">
                    { similar && <h2 className="title-similar-products">Similar Products</h2> }
                    <div className="grid-products-similar">
                    {
                        similar && similar.map((product, index) => 
                                    <Card product={product} key={index} />)
                    }
                    </div>
                </section>
            </div>  
        </> 
    );
  }