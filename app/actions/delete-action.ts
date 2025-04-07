"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { productsService } from "../services/products-service";

export async function deleteProduct(id: number) {
    productsService.delete(id);
    revalidatePath('/admin');
    redirect('/admin');
}