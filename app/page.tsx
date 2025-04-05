import Carousel from "./ui-client/carousel";
import { findAll } from "./actions/database-get";
import ProductsListByCategory from "./ui-client/products-list-by-category";

export default async function Home() {
  const products = await findAll(1, 10);  
  return (
    <>
      <Carousel />
      <ProductsListByCategory inititalProducts={products} hasMore={true} />
      
    </>
  );
}
