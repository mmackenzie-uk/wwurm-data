import { openDb } from "../data/db";
import { IProduct } from "../domain/product";

const ProductsService = {
    get: async function (currentPage = 1, ITEMS_PER_PAGE = 5) {
            const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
            const db = await openDb();
            const sql = `SELECT * FROM products ORDER BY id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`;
            const products = await db.all(sql);
            return products as Array<IProduct>;
        },
    getByCategory: async function (categoryId: number, currentPage = 1, ITEMS_PER_PAGE = 5) {
            const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE categoryId = ${categoryId} 
                ORDER BY id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`
            const products = await db.all(sql);
            return products as Array<IProduct>;
        },
    getProductBySlug: async function (slug: string) {
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE slug = "${slug}"`;
            const res = await db.all(sql);
            return res[0] as IProduct;
        },
    findName: async function (name: string) {
            const sql = `SELECT DISTINCT name
                        FROM products
                        WHERE UPPER(name) LIKE UPPER('%${name}%')`;
            const db = await openDb();
            const res = await db.all(sql);
            return res;
        },
    getSimilar: async function (categoryId: number, id?: number) {
            const db = await openDb();
            const sql = `SELECT * FROM products WHERE categoryId = ${categoryId} AND NOT id = "${id}"`;
            const products = await db.all(sql);
            const arr = [];
            const len = (products.length > 4) ? 4 : products.length;
            for (let i = 0; i < len; i++) {
                arr .push(products[i]);
            }
            return arr as Array<IProduct>;
        },
    count: async function (ITEMS_PER_PAGE: number) {
            const db = await openDb();
            const sql = `SELECT COUNT(*) FROM products`;
            const res = await db.all(sql);
            const totalPages = Math.ceil(Number( res[0]['COUNT(*)']) / ITEMS_PER_PAGE);
            return totalPages;
        },
    update: async function (product: IProduct) {
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
    },
    create: async function(product: IProduct) {

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
    },
    delete: async function (id: number) {
        const db = await openDb();
        const sql = `DELETE FROM products WHERE id=${id}`;
        const res = await db.all(sql);
        return res;
    }
}

export default ProductsService;


