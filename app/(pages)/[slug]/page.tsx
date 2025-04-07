
import { findByCategory, getCategory } from "@/app/actions/get-actions";
import ProductsListByCategory from "@/app/ui-client/products-list-by-category";

export default async function CategoryPage({ params, }: {params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const categoryResponse = await getCategory(slug);
    let productsResponse;
    if (categoryResponse.id) {
        productsResponse = await findByCategory(categoryResponse.id, 1, 10);  
    }
    return (
        <>
            <div className="category-header">
                <section className="section">
                    <h1 className="category-name">{categoryResponse.name}</h1>
                </section>
            </div>
            {
                productsResponse &&
                <ProductsListByCategory inititalProducts={productsResponse} hasMore={true} categoryId={categoryResponse.id}/>
            }
        </>
    );
}
