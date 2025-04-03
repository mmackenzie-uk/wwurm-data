"use server"

import { IProduct } from "../ts/type-definitions";
import { openDb } from "../data/db";
import { ICategory } from "../configuration/wwurm";

type IResponse = {
    id: number;
    name: string,
    price: number,
    description: string,
    smallImage: string,
    mediumImage: string,
    largeImage: string,
    availability: number, 
    slug: string,
    categoryId: number
}

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
    // Open database
    const db = await openDb();
    const res = await db.all('SELECT * FROM categories');
    return res as Array<ICategory>;
}

export async function findAll(currentPage = 1, ITEMS_PER_PAGE = 5) {

    const OFFSET = (currentPage - 1) * ITEMS_PER_PAGE;
    // Open database
    const db = await openDb();
    const res = await db.all(`SELECT * FROM products ORDER BY id ASC LIMIT ${ITEMS_PER_PAGE} OFFSET ${OFFSET}`);

    // LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}

    const products: Array<IProduct> = [];

    res.forEach((obj) => {
        const product = toProduct(obj)
        products.push(product);
    });
    return products;
}

export async function findByCategory(slug: string) {
    // Open database
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
    // Open database
    const db = await openDb();
    const res = await db.all(`SELECT * FROM products WHERE slug = "${slug}"`);
    return toProduct(res[0]);
}

export async function getCategory(slug: string) {
    // Open database
    const db = await openDb();
    const res = await db.all(`SELECT * FROM categories WHERE slug = "${slug}"`);

    console.log("res slug ", res, slug)
    return res[0];
}

export async function getCategoryById(id: number) {
    // Open database
    const db = await openDb();
    const res = await db.all(`SELECT * FROM categories WHERE id = ${id}`);
    return res[0];
}

export async function getSimilar(categoryId: number, slug: string) {
     // Open database
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
        editProduct(formData);
    } else {
        createProduct(formData);
    } 
 }

 async function editProduct(formData: FormData) {
    console.log("edit called");
    console.log("formData", formData);

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
    console.log("create called");
    console.log("formData", formData)
 }
