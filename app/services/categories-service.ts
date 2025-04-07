import { ICategory } from "../domain/category";
import { openDb } from "../data/db";

const CategoriesService = {
    get: async function () {
            const db = await openDb();
            const sql = 'SELECT * FROM categories';
            const res = await db.all(sql);
            return res as Array<ICategory>;
        },
    getById: async function (id: number) {
            const db = await openDb();
            const sql = `SELECT * FROM categories WHERE id = ${id}`;
            const res = await db.all(sql);
            return res[0];
        },
    getBySlug: async function (slug: string) {
            const db = await openDb();
            const sql = `SELECT * FROM categories WHERE slug = "${slug}"`
            const res = await db.all(sql);
            return res[0] as ICategory;
        },
    create: async function (Category: ICategory) {
            const db = await openDb();
            const sql = `INSERT INTO categories (name, slug) VALUES (?, ?)`;
            const res = await db.run(sql, Category.name, Category.slug );
            return res;
        }
}

export default CategoriesService;

