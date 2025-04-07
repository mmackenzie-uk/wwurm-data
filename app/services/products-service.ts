import { openDb } from "../data/db";
import { IProduct } from "../domain/product";

/* Singleton  */
let instance: ProductsService;

class ProductsService {
    constructor() {
        /* instantiate as a singleton */
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
    }

    async get(currentPage = 1, ITEMS_PER_PAGE = 5) {
            const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
            const db = await openDb();
            const sql = `SELECT * FROM products ORDER BY id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`;
            const products = await db.all(sql);
            return products as Array<IProduct>;
        }
    async getByCategory(categoryId: number, currentPage = 1, ITEMS_PER_PAGE = 5) {
            const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE categoryId = ${categoryId} 
                ORDER BY id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`
            const products = await db.all(sql);
            return products as Array<IProduct>;
        }
    async getProductBySlug(slug: string) {
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE slug = "${slug}"`;
            const res = await db.all(sql);
            return res[0] as IProduct;
        }
    async findName(name: string) {
            const sql = `SELECT DISTINCT name
                        FROM products
                        WHERE UPPER(name) LIKE UPPER('%${name}%')`;
            const db = await openDb();
            const res = await db.all(sql);
            return res;
        }
    async getSimilar(categoryId: number, id?: number) {
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE categoryId = ${categoryId} AND NOT id = "${id}"`;
            const products = await db.all(sql);
            const arr = [];
            const len = (products.length > 4) ? 4 : products.length;
            for (let i = 0; i < len; i++) {
                arr .push(products[i]);
            }
            return arr as Array<IProduct>;
        }
    async count(ITEMS_PER_PAGE: number) {
            const db = await openDb();
            const sql = `SELECT COUNT(*) FROM products`;
            const res = await db.all(sql);
            const totalPages = Math.ceil(Number( res[0]['COUNT(*)']) / ITEMS_PER_PAGE);
            return totalPages;
        }
    async update(product: IProduct) {
        const db = await openDb();
        const sql =` UPDATE products
            SET price = ${product.price},
            name="${product.name}",
            description="${product.description}",
            smallImage="${product.smallImage}",
            mediumImage="${product.mediumImage}",
            largeImage="${product.largeImage}",
            availability=${product.availability},
            slug="${product.slug}",
            categoryId=${product.categoryId}
            WHERE id = ${product.id}`;
        const res = await db.all(sql);
        return res;
    }
    async create(product: IProduct) {

        const db = await openDb();

        const sql = `INSERT INTO products ( 
            name,smallImage,mediumImage,largeImage,slug,description,availability,price,categoryId
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const params = [
            product.name, 
            product.smallImage, 
            product.mediumImage, 
            product.largeImage, 
            product.slug, 
            product.description, 
            product.availability, 
            product.price, 
            product.categoryId
        ];
        const res = await db.run(sql, ...params);
        return res;
    }
    async delete(id: number) {
        const db = await openDb();
        const sql = `DELETE FROM products WHERE id=${id}`;
        const res = await db.all(sql);
        return res;
    }
}

const productsService = new ProductsService();

export { productsService } ;



