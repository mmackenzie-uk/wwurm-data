"use server"

import { openDb } from "../data/db";

import { fromCategoriesDomain, fromCategoryDomain } from "../conversion/category-convert";

import { fromProductDomain, fromProductsDomain } from "../conversion/product-convert";
import { categoriesService } from "../services/categories-service";
import { productsService } from "../services/products-service";

export async function getCategories() {
    const categories = await categoriesService.get();
    const categoriesResponse = fromCategoriesDomain(categories)
    return categoriesResponse;
}

export async function findAll(currentPage: number, ITEMS_PER_PAGE: number) {
    const products = await productsService.get(currentPage, ITEMS_PER_PAGE);
    const productsResponse = fromProductsDomain(products);
    return productsResponse;
}

export async function findByCategory(categoryId: number, currentPage: number, ITEMS_PER_PAGE: number) {
   const products = await productsService.getByCategory(categoryId, currentPage, ITEMS_PER_PAGE)
   const productsResponse = fromProductsDomain(products);
   return productsResponse;
}

export async function getProduct(slug: string) {
    const product = await productsService.getProductBySlug(slug);
    const productResponse = fromProductDomain(product);
    return productResponse;
}

export async function getCategory(slug: string) {
   const category = await categoriesService.getBySlug(slug);
   const categoryResponse = fromCategoryDomain(category);
   return categoryResponse;
}

export async function getCategoryById(id: number) {
    const db = await openDb();
    const res = await db.all(`SELECT * FROM categories WHERE id = ${id}`);
    return res[0];
}

export async function getSimilar(categoryId: number, id: number) {
    const products = await productsService.getSimilar(categoryId, id);
    const productsResponse = fromProductsDomain(products);
    return productsResponse;
}

export async function getProductPageData(slug : string) {
    const product = await productsService.getProductBySlug(slug);
    const category = await categoriesService.getById(product.categoryId);
    const products = await productsService.getSimilar(category.id, product.id);

    return { 
        productResponse: fromProductDomain(product),
        productsResponse: fromProductsDomain(products),
        categoryResponse: fromCategoryDomain(category)
    }
}

export async function getCount(ITEMS_PER_PAGE: number) {
    const count = productsService.count(ITEMS_PER_PAGE)
    return count;
}
