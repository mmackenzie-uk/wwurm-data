"use client"

import { handleProduct } from "@/app/actions/form-actions";
import { ALBUM_PHOTO_KEY, HREF } from "@/app/configuration/s3-configuration";
import Link from "next/link";
import { _Object } from "@aws-sdk/client-s3";
import { useActionState } from "react";

import { IFormState } from "../validation/validate";
import { ICategoryDTO } from "../DTO/categoryDTO";
import { IFormDTO } from "../DTO/formDTO";

export default function Form({ formDTO, edit, photos, categoriesResponse }: {
    formDTO: IFormDTO, 
    categoriesResponse: Array<ICategoryDTO>,
    photos: _Object[],
    edit: boolean
}) {

    const initialState: IFormState = { message: null, errors: {} };
    const [state, formAction] = useActionState(handleProduct, initialState);
   
    return (
        <form className="product" action={formAction}>          
            <input 
                type="text" 
                name="id" 
                defaultValue={formDTO?.id || ""} 
                hidden
            />
            <section className="section">
                <div className="edit-product-header">
                    <h2 className="edit-product-title">{edit ? "Edit" : "Create"} Product</h2>
                    <div className="edit-btn-wrap">
                        <Link href="/admin" className="edit-btn-cancel">Cancel</Link>
                        <button className="edit-btn-save" type="submit">Save</button>
                    </div>   
                </div> 
            </section>
            { 
             state && state.message ? 
                <section className="section">
                    <div className="error-msg-wrap" >
                        <p className="error-msg">
                            {state.message} 
                            {state.errors?.categoryId ? " Please choose a category" : ""} 
                            {state.errors?.name ? " A product with that name already exists" : ""} 
                        </p>
                        <button className="error-msg-btn">x</button>
                    </div>
                </section> 
                : null
            }
            
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
                                photos.map((photo) => {   
                                    const photoKey = photo.Key;                         
                                    const photoUrl = HREF + encodeURIComponent(photoKey!);  
                                    const name = photoKey!.replace(ALBUM_PHOTO_KEY, "");     
                                    let title = name.replaceAll("-", " ");                
                                    title = title.replaceAll(".jpg", "");                
                                    return (
                                        <li key={photoKey} className="bucket-image-widget-li">
                                            <div className="bucket-image-widget-img-wrap">
                                                <span className="bucket-image-widget-name">{title}</span>
                                                <label>
                                                    <input 
                                                        type="checkbox" 
                                                        id={photoKey} 
                                                        value={name} 
                                                        name={"image"} 
                                                        defaultChecked={formDTO.smallImage!.includes(name)}
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
                            defaultValue={formDTO.name} 
                            className="edit-form-name"
                        />
                        <label htmlFor="price" className="edit-form-label">Price:</label><br/>
                        <span className="product-price">$
                            <input 
                                className="edit-form-price"
                                type="number" 
                                id="price" 
                                defaultValue={formDTO.price.toFixed(2)} 
                                name="price" 
                                min="1" 
                                step=".1"
                            />
                        </span><br/>
                        <label htmlFor="availability" className="edit-form-label">Quantity:</label><br/>
                        <input 
                            id="availability"
                            name="availability"
                            type="number" 
                            className="edit-form-availability" 
                            defaultValue={formDTO.availability}
                        /> 
                        <br/>
                        <label htmlFor="description" className="edit-form-label">Description:</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            className="edit-form-description"
                            defaultValue={formDTO.description}
                        />
                        <label htmlFor="price" className="edit-form-label">Category:</label>
                        <ul className="edit-form-categories" role="list">
                            {
                                categoriesResponse.map(({ name, id, slug }, index) => 
                                    <li key={id} className="edit-form-category">
                                        <input 
                                            type="radio" 
                                            id={slug} 
                                            name="categoryId" 
                                            value={id} 
                                            defaultChecked={id === formDTO.categoryId}
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

  