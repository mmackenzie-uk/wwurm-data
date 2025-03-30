
import { getCategories, getProductPageData } from "@/app/actions";
import EditImageWidget from "@/app/ui-client/edit-image-widget";
import Link from "next/link";

export default async function Product({ params, }: {params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const { product } = await getProductPageData(slug);
    const categories = await getCategories();

    console.log(" categ ", categories)

    return (
        <>
            <div className="product"> 
                <section className="section">
                    <div className="edit-btn-wrap">
                        <Link href="/admin" className="edit-btn-cancel">Cancel</Link>
                        <button className="edit-btn-save">Save</button>
                    </div>    
                </section>
                <section className="section">
                    <div className="edit-product-grid">
                        <EditImageWidget thumbnails={product.smallImage} images={product.largeImage} />
                        <div className="product-details">
                            <label htmlFor="fname" className="edit-form-label">Product Name:</label>
                            <input 
                                type="text" 
                                id="edit-form-name" 
                                name="fname" 
                                defaultValue={product.name} 
                                className="edit-form-name"
                            />
                            <label htmlFor="price" className="edit-form-label">Price:</label><br/>
                            <span className="product-price">$
                                <input 
                                    className="edit-form-price"
                                    type="number" 
                                    id="price" 
                                    defaultValue={product.price.toFixed(2)} 
                                    name="price" 
                                    min="1" 
                                    step=".1"
                                />
                            </span><br/>
                            <label htmlFor="price" className="edit-form-label">Description:</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                className="edit-form-description"
                                defaultValue={product.description}
                            />
                            <label htmlFor="price" className="edit-form-label">Category:</label>
                            <ul className="edit-form-categories" role="list">
                            {
                                categories.map(({ name, id }) => 
                                    <li key={id} className="edit-form-category">
                                        <input 
                                            type="radio" 
                                            id={slug} 
                                            name={slug} 
                                            value={slug} 
                                            defaultChecked={product.categoryId === id}
                                        />
                                        <label className="edit-form-category-label" htmlFor={slug}>{name}</label><br />
                                    </li>)
                            }
                            </ul>   
                            <div className="edit-form-new-category-flex">
                                <input 
                                    type="text" 
                                    id="edit-form-new-category" 
                                    name="new-category" 
                                    defaultValue={"+ new category"} 
                                    className="edit-form-new-category"
                                />
                                <button className="edit-form-new-category-btn">+ Add</button>
                            </div> 
                        </div>
                    </div>
                </section>
            </div>
        </> 
    );
  }