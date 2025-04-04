import Products from "@/app/ui/products";
import LoadMore from "@/app/ui/load";
import { findByCategory, getCategory } from "@/app/actions/database";

export default async function CategoryPage({ params, }: {params: Promise<{ category: string }>}) {
    const { category } = await params;
    const res = await getCategory(category)
    const products = await findByCategory(category);

    return (
        <>
            <div className="category-header">
                <section className="section">
                    <h1 className="category-name">{res.name}</h1>
                </section>
            </div>
            <Products products={products}/>
            <LoadMore />
        </>
    );
}
