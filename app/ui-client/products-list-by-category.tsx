"use client";
import { useState } from "react";
import { findAll, findByCategory } from "../actions/get-actions";
import Card from "../ui/card";
import { IProductResponse } from "../conversion/product-convert";

const ITEMS_PER_PAGE = 10;

export default function ProductsList({ 
    inititalProducts,
    categoryId,
    hasMore
}: { 
    inititalProducts: Array<IProductResponse>,
    categoryId?: number,
    hasMore: boolean
}) {

  const [page, setPage] = useState(2);
  const [productsResponse, setProductsResponse] = useState<IProductResponse[]>(inititalProducts);
  const [hasMoreData, setHasMoreData] = useState(hasMore);

  const loadMore = async () => {
    if (hasMoreData) {

      let apiPosts: string | any[] | ConcatArray<IProductResponse>;
      if (categoryId) {
        apiPosts = await findByCategory(categoryId, page, ITEMS_PER_PAGE);
      } else {
        apiPosts = await findAll(page, ITEMS_PER_PAGE);
      }

      if (!apiPosts.length) {
        setHasMoreData(false);
      }
      setProductsResponse((prevPosts) => prevPosts.concat(apiPosts));
      setPage((page) => page + 1);
    }
  };

  return (
    <>
        <section className="section">
            <div className="grid-products">
            {productsResponse.map((productResponse, index) => 
                <Card productResponse={productResponse} key={index} />)
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
