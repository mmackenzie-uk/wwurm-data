"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import ProductsService from "../services/products-service";
import { fromFormParams, toFormParams } from "../conversion/form-data-convert";
import { IFormState, ValidateProduct } from "../validation/validate";


export async function handleProduct(prevState: IFormState, formParams: FormData) {

    const product = fromFormParams(formParams);

    // Validate form fields using Zod
    const validatedFields = ValidateProduct.safeParse({
        name: product.name,
        categoryId: product.categoryId,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to Edit Product.',
        };
    }
    
    if (product.id) {
       await ProductsService.update(product);
    } else {
       // check for existing product
        const res = await ProductsService.findName(product.name);
        if (res.length) {
            return {
                errors: { name: ['existing name'] },        
                message: 'Failed to Edit Product.',
            };
        }  
        await ProductsService.create(product);
    } 

    revalidatePath('/admin');
    redirect('/admin');
}


export async function getFormParams(slug: string) {
    const product = await ProductsService.getProductBySlug(slug);
    const formParams = toFormParams(product);
    return formParams;
}
