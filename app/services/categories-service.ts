import { ICategory } from "../domain/category";
import { openDb } from "../data/db";

/* Singleton  */
let instance: CategoriesService;

class CategoriesService {
    constructor() {
        /* instantiate as a singleton */
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        
        instance = this; 
    }

    async get() {
        const db = await openDb();
        const sql = 'SELECT * FROM categories';
        const res = await db.all(sql);
        return res as Array<ICategory>;
    }
    async getById(id: number) {
            const db = await openDb();
            const sql = `SELECT * FROM categories WHERE id = ${id}`;
            const res = await db.all(sql);
            return res[0];
        }
    async getBySlug(slug: string) {
        const db = await openDb();
        const sql = `SELECT * FROM categories WHERE slug = "${slug}"`
        const res = await db.all(sql);
        return res[0] as ICategory;
    }
    async create(Category: ICategory) {
        const db = await openDb();
        const sql = `INSERT INTO categories (name, slug) VALUES (?, ?)`;
        const res = await db.run(sql, Category.name, Category.slug );
        return res;
    }
}

const categoriesService = new CategoriesService();

export { categoriesService } ;



