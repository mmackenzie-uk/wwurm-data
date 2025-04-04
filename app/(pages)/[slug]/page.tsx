
import { findByCategory, getCategory } from "@/app/actions/database";
import CategoryProductsList from "@/app/ui-client/category-products-list";

export default async function CategoryPage({ params, }: {params: Promise<{ slug: string }>}) {
    const { slug } = await params;
    const category = await getCategory(slug);
    const products = await findByCategory(category.id, 1, 10);  

    return (
        <>
            <div className="category-header">
                <section className="section">
                    <h1 className="category-name">{category.name}</h1>
                </section>
            </div>
            <CategoryProductsList inititalProducts={products} hasMore={true} categoryId={category.id}/>
        </>
    );
}
