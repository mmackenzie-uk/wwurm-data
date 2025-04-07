"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormState, ValidateProduct } from "../validation/validate";
import { productsService } from "../services/products-service";
import { fromFormData, toFormDTO } from "../DTO-mappings/form-data-mappings";

export async function handleProduct(prevState: IFormState, request: FormData) {

    const product = fromFormData(request);

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

export async function getFormData(slug: string) {
    const product = await productsService.getProductBySlug(slug);
    const formDTO = toFormDTO(product);
    return formDTO;
}
