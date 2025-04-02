import Carousel from "./ui-client/carousel";
import { findAll } from "./actions/database";
import { openDb } from "./data/db";
import ProductsList from "./ui-client/products-list";

export default async function Home() {

  const db = await openDb();
  const c = await db.all('SELECT * FROM categories');
  const p = await db.all('SELECT * FROM products');

  const products = await findAll(1, 10);  
  return (
    <>
      <Carousel />
      <ProductsList inititalProducts={products} hasMore={true}/>
    </>
  );
}
