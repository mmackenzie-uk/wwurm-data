"use server"

import { revalidatePath } from "next/cache";
import ProductsService from "../services/products-service";
import { redirect } from "next/navigation";

export async function deleteProduct(id: number) {
    ProductsService.delete(id);
    revalidatePath('/admin');
    redirect('/admin');
}