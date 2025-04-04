import { deleteProduct, findAll, getCount } from "@/app/actions/database"
import { IMAGE_PREFIX } from "@/app/configuration/s3-configuration";
import { BinIcon, AddIcon, AddIconEncl, EditIcon } from "@/app/icons-svg";

import Pagination from "@/app/ui-client/pagination";
import Link from "next/link";



const ITEMS_PER_PAGE = 5;

export default async function Page(props: { searchParams?: Promise<{ page?: string; }>; }) {

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const count = await getCount(ITEMS_PER_PAGE);  
    
    const products = await findAll(currentPage);

    return (
        <div className="admin">
            <div className="create-wrap">
                <h2 className="admin-list-title">Products List</h2>
                <div className="admin-list-nav">
                    <Pagination count={count} />
                    <Link
                        href={`/admin/edit/`}
                        className="create-btn-wrap"
                    >
                        <i className="create-btn-icon"><AddIcon /></i>
                        <div className="create-btn-txt">Item</div>
                    </Link>
                </div>     
            </div>
            <ul className="admin-list" role="list">
                <li 
                    className="admin-list-item" 
                    style={{borderBottom: "1px solid #f1f1f1", marginBottom: "0px"}}
                >
                    <span>ID</span>
                    <span>Image</span>
                    <span>Name</span>
                    <span>Slug</span>
                    <span>Price</span>
                    <span>Qty</span>
                </li>
            {
                products.map(({ name, id, price, availability, slug, smallImage }) => {
                    const src = IMAGE_PREFIX + encodeURIComponent(smallImage!.split(',')[0]); 
                    const deleteProductWithId = deleteProduct.bind(null, id);
                    return (
                        <li key={id} className="admin-list-item">
                            <span>{id}</span>
                            <div className="admin-list-img-wrap">
                                <img src={src} className="admin-list-img"/>
                            </div>
                            <span>{name}</span>
                            <span>{slug}</span>
                            <span>{price}</span>
                            <span>{availability}</span>
                            <div className="admin-btn-wrap">
                                <Link
                                    href={`/admin/edit/${slug}`}
                                    className="edit-btn"
                                >
                                    <i className="admin-btn-icon"><EditIcon /></i>
                                </Link>
                                <form action={deleteProductWithId}>
                                    <button type="submit" className="delete-btn">
                                        <i className="admin-btn-icon"><BinIcon /></i>
                                    </button>
                                </form>           
                            </div>                  
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
