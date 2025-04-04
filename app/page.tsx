import Carousel from "./ui-client/carousel";
import { findAll } from "./actions/database";
import ProductsList from "./ui-client/products-list";

export default async function Home() {
  const products = await findAll(1, 10);  
  return (
    <>
      <Carousel />
      <ProductsList inititalProducts={products} hasMore={true}/>
    </>
  );
}
