"use client";
import { useState } from "react";
import { IProduct } from "../ts/type-definitions";
import { findAll } from "../actions/database";
import Card from "../ui/card";

const ITEMS_PER_PAGE = 10;

export default function ProductsList({ 
    inititalProducts,
    hasMore
}: { 
    inititalProducts: IProduct[],
    hasMore: boolean
}) {

  const [page, setPage] = useState(2);
  const [products, setProducts] = useState<IProduct[]>(inititalProducts);
  const [hasMoreData, setHasMoreData] = useState(hasMore);

  const loadMore = async () => {
    if (hasMoreData) {

      const apiPosts = await findAll(page, ITEMS_PER_PAGE);

      console.log("page ", page)
      console.log("data ", apiPosts)

      if (!apiPosts.length) {
        setHasMoreData(false);
      }
      setProducts((prevPosts) => prevPosts.concat(apiPosts));
      setPage((page) => page + 1);
    }
  };

  return (
    <>
        <section className="section">
            <div className="grid-products">
            {products.map((product, index) => 
                <Card product={product} key={index} />)
            }
            </div>
        </section>
        <section className="section">
        {
            hasMoreData ?
                <button onClick={loadMore} className="products-list-btn">
                    Mehr laden
                </button>
            :
                <div className="products-list-notify">
                    <span>Alle Produkte wurden geladen.</span>
                </div>
        }
        </section>
    </>
  );
}
