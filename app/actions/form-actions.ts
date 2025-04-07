"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromFormParams, toFormParams } from "../DTO-mappings/form-data-mappings";
import { IFormState, ValidateProduct } from "../validation/validate";
import { productsService } from "../services/products-service";

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
       await productsService.update(product);
    } else {
       // check for existing product
        const res = await productsService.findName(product.name);
        if (res.length) {
            return {
                errors: { name: ['existing name'] },        
                message: 'Failed to Edit Product.',
            };
        }  
        await productsService.create(product);
    } 

    revalidatePath('/admin');
    redirect('/admin');
}

export async function getFormParams(slug: string) {
    const product = await productsService.getProductBySlug(slug);
    const formParams = toFormParams(product);
    return formParams;
}
