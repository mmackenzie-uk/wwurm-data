import { IProduct } from '../ts/type-definitions';
import Card from './card';

export default function Products({ products } : {
    products: Array<IProduct>;
}) {
    return (
        <section className="section">
            <div className="grid-products">
                {products.map((product, index) => 
                    <Card product={product} key={index} />)
                }
            </div>
        </section>
    );
  }