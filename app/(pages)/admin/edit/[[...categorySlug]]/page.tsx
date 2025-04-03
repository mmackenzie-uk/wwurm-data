
import { handleProduct, getCategories, getProductPageData } from "@/app/actions/database";
import getPhotos from "@/app/actions/s3-bucket";
import { S3_ALBUM_NAME } from "@/app/configuration/wwurm";
import Link from "next/link";

export default async function Product({ params, }: {params: Promise<{ categorySlug: string }>}) {
    const { categorySlug } = await params;
    let product;
    let checked = false;
    if (categorySlug) {
        checked = true;
        const response = await getProductPageData(categorySlug);
        product = response.product;
    }
    const categories = await getCategories();
    const { photos, bucketUrl} = await getPhotos();

    const name = checked ? product!.name : "Product Name";
    const description = checked ? product!.description : "description";
    const price = checked ? product!.price : 1;
    const categoryId = checked ? product!.categoryId : -1;
    const images = checked ? product?.largeImage : [];

    console.log("prod ", product)

    const albumName = S3_ALBUM_NAME;
    const albumPhotosKey = encodeURIComponent(albumName) + "/";

    const handleProductWithId = handleProduct.bind(null, product!.id);

    return (
        <form className="product" action={handleProductWithId}>       
            <input 
                type="checkbox" 
                name={"edit"} 
                defaultChecked={checked} 
                hidden
            />     
            <section className="section">
                <div className="edit-product-header">
                    <h2 className="edit-product-title">{checked ? "Edit" : "Create"} Product</h2>
                    <div className="edit-btn-wrap">
                        <Link href="/admin" className="edit-btn-cancel">Cancel</Link>
                        <button className="edit-btn-save" type="submit">Save</button>
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
                                    const photoKey = photo.Key;
                                    const photoUrl = bucketUrl + encodeURIComponent(photoKey!);  
                                    const name = photoKey!.replace(albumPhotosKey, "");                      
                                    return (
                                        <li key={photoKey} className="bucket-image-widget-li">
                                            <div className="bucket-image-widget-img-wrap">
                                                <span className="bucket-image-widget-name">{name}</span>
                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        id={photoKey} 
                                                        value={name} 
                                                        name={"image"} 
                                                        defaultChecked={images.includes(name)}
                                                    />
                                                    <img 
                                                        src={photoUrl} 
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
                        <label htmlFor="name" className="edit-form-label">Product Name:</label>
                        <input 
                            type="text" 
                            id="edit-form-name" 
                            name="name" 
                            defaultValue={name} 
                            className="edit-form-name"
                        />
                        <label htmlFor="price" className="edit-form-label">Price:</label><br/>
                        <span className="product-price">$
                            <input 
                                className="edit-form-price"
                                type="number" 
                                id="price" 
                                defaultValue={price.toFixed(2)} 
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
                            defaultValue={description}
                        />
                        <label htmlFor="price" className="edit-form-label">Category:</label>
                        <ul className="edit-form-categories" role="list">
                            {
                                categories.map(({ name, id, slug }, index) => 
                                    <li key={id} className="edit-form-category">
                                        <input 
                                            type="radio" 
                                            id={slug} 
                                            name="categoryId" 
                                            value={id} 
                                            defaultChecked={id === categoryId}
                                        />
                                        <label className="edit-form-category-label" htmlFor={slug}>{name}</label><br />
                                    </li>)
                            }
                        </ul>   
                        {/* <div className="edit-form-new-category-flex">
                            <input 
                                type="text" 
                                id="edit-form-new-category" 
                                name="new-category" 
                                defaultValue={"+ new category"} 
                                className="edit-form-new-category"
                            />
                            <button className="edit-form-new-category-btn">+ Add</button>
                        </div>  */}
                    </div>
                </div>
            </section>
        </form>

    );
  }

  