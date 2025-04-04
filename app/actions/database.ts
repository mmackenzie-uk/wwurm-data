"use server"

import { ICategory, IProduct, IResponse } from "../ts/type-definitions";
import { openDb } from "../data/db";
import { revalidatePath } from "next/cache";
import { createSlug } from "../data/data-conversion";
import { redirect } from "next/navigation";

const toProduct = (res: IResponse) => {
    return {
        id: res.id,
        name: res.name,
        price: res.price / 100,
        description: res.description,
        smallImage: res.smallImage.replaceAll("\"", ""), 
        mediumImage: res.mediumImage.replaceAll("\"", ""),
        largeImage: res.largeImage.replaceAll("\"", ""),
        availability: res.availability, 
        slug: res.slug,
        categoryId: res.categoryId
    }
}

export async function getCategories() {
    const db = await openDb();
    const res = await db.all('SELECT * FROM categories');
    return res as Array<ICategory>;
}

export async function findAll(currentPage = 1, ITEMS_PER_PAGE = 5) {

    const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
    const db = await openDb();
    const res = await db.all(`SELECT * FROM products ORDER BY id DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`);

    const products: Array<IProduct> = [];

    res.forEach((obj) => {
        const product = toProduct(obj)
        products.push(product);
    });
    return products;
}

export async function findByCategory(slug: string) {
    const db = await openDb();
    const category = await getCategory(slug);
    
    const categoryId = category.id;
    const res = await db.all(`SELECT * FROM products WHERE categoryId = ${categoryId}`);
    const products: Array<IProduct> = [];
    res.forEach((obj) => {
        const product = toProduct(obj)
        products.push(product);
    });
    return products;
}

export async function getProduct(slug: string) {
    const db = await openDb();
    const res = await db.all(`SELECT * FROM products WHERE slug = "${slug}"`);
    return toProduct(res[0]);
}

export async function getCategory(slug: string) {
    const db = await openDb();
    const res = await db.all(`SELECT * FROM categories WHERE slug = "${slug}"`);
    return res[0];
}

export async function getCategoryById(id: number) {
    const db = await openDb();
    const res = await db.all(`SELECT * FROM categories WHERE id = ${id}`);
    return res[0];
}

export async function getSimilar(categoryId: number, slug: string) {
     const db = await openDb();
     const res = await db.all(`SELECT * FROM products WHERE categoryId = ${categoryId} AND NOT slug = "${slug}"`);
     const products: Array<IProduct> = [];
     res.forEach((obj) => {
        const product = toProduct(obj)
        products.push(product);
    });
    return products;
}

export async function getProductPageData(slug : string) {
    const product = await getProduct(slug);
    const category = await getCategoryById(product.categoryId) as ICategory;
    const categorySlug =  category.slug;
    const arr = await getSimilar(product.categoryId, slug);
    if (arr) {
        let similar: Array<IProduct> = [];
        let limit = (arr.length < 4)? arr.length : 4;
        for (let i = 0; i < limit; i++) {
            similar.push(arr[i])
        }
        return { product, similar, categorySlug}
    } 
    return { product, categorySlug }
}

export async function getCount(ITEMS_PER_PAGE: number) {
    const db = await openDb();
    const res = await db.all(`SELECT COUNT(*) FROM products`);
    const totalPages = Math.ceil(Number( res[0]['COUNT(*)']) / ITEMS_PER_PAGE);
    return totalPages;
}

 export async function handleProduct(formData: FormData) {
    
    if (formData.get("id")) {
        await editProduct(formData);
    } else {
        await createProduct(formData);
    } 
    revalidatePath('/admin');
    redirect('/admin');
 }

 async function editProduct(formData: FormData) {
 
    const price = Number(formData.get("price")) * 100;
    const name = formData.get("name");
    const id = Number(formData.get("id"));
    const description = formData.get("description");
    const categoryId = Number(formData.get("categoryId"));
    const image = formData.getAll("image").toString();

    const db = await openDb();
    const sql =` UPDATE products
        SET price = ${price},
        name="${name}",
        description="${description}",
        smallImage="${image}",
        mediumImage="${image}",
        largeImage="${image}",
        categoryId=${categoryId}
        WHERE id = ${id}`;

    const res = await db.all(sql);
    return res;
 }

 async function createProduct(formData: FormData) {
    const price = Number(formData.get("price")) * 100;
    const name = formData.get("name")?.toString();
    const description = formData.get("description");
    const categoryId = Number(formData.get("categoryId"));
    const image = formData.getAll("image").toString();
    const slug = createSlug(name);
    const availability = 10;
    const smallImage = image;
    const mediumImage = image;
    const largeImage = image;

    const db = await openDb();

    const sql = `INSERT INTO products ( 
        name,smallImage,mediumImage,largeImage,slug,description,availability,price,categoryId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        name, smallImage, mediumImage, largeImage, slug, description, availability, price, categoryId
    ];

    const res = await db.run(sql, ...params);

    return res;
 }

export async function deleteProduct(id: number) {
    const db = await openDb();
    const res = await db.all(`DELETE FROM products WHERE id=${id}`);
    revalidatePath('/admin');
 }

