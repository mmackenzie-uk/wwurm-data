
import { getCategories } from "@/app/actions/database";
import getPhotos from "@/app/actions/s3-bucket";
import Link from "next/link";

export default async function CreateProductPage() {
    const categories = await getCategories();
    const { photos, bucketUrl} = await getPhotos();

    return (
        <div className="product"> 
            <section className="section">
                <div className="edit-product-header">
                    <h2 className="edit-product-title">Create Product</h2>
                    <div className="edit-btn-wrap">
                        <Link href="/admin" className="edit-btn-cancel">Cancel</Link>
                        <button className="edit-btn-save">Save</button>
                    </div>   
                </div> 
            </section>
            <section className="section">
                <div className="edit-product-grid">
                    <div>
                        <div className="edit-product-image-header">
                            <h2 className="edit-product-image-header-title">Images:</h2>
                            <div>({photos?.length})</div>
                        </div>

                        <div className="bucket-image-widget-container">
                            <ul className="bucket-image-widget-list" role="list">
                            {
                                photos && photos.map((photo) => {   
                                const slug =  photo.Key;                           
                                return (
                                    <li key={slug} className="bucket-image-widget-li">
                                        <div className="bucket-image-widget-img-wrap">
                                            <label>
                                                <input type="checkbox" />
                                                <img 
                                                    src={bucketUrl + encodeURIComponent(slug!)} 
                                                    className="bucket-image-widget-img"
                                                />
                                            </label>
                                        </div>
                                    </li>);
                                }
                                )
                            }
                            </ul>
                        </div>
                    </div>
                    
                    <div className="edit-product-details">
                        <label htmlFor="fname" className="edit-form-label">Product Name:</label>
                        <input 
                            type="text" 
                            id="edit-form-name" 
                            name="fname" 
                            defaultValue={"Product Name"} 
                            className="edit-form-name"
                        />
                        <label htmlFor="price" className="edit-form-label">Price:</label><br/>
                        <span className="product-price">$
                            <input 
                                className="edit-form-price"
                                type="number" 
                                id="price" 
                                defaultValue={1.00} 
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
                            defaultValue={"description"}
                        />
                        <label htmlFor="price" className="edit-form-label">Category:</label>
                        <ul className="edit-form-categories" role="list">
                            {
                                categories.map(({ name, id, slug }, index) => 
                                    <li key={id} className="edit-form-category">
                                        <input 
                                            type="radio" 
                                            id={slug} 
                                            name="category" 
                                            value={slug} 
                                            defaultChecked={index === 0}
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

    );
  }