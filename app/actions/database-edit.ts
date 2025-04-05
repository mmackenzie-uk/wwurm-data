"use server"

import { openDb } from "../data/db";
import { revalidatePath } from "next/cache";
import { fromFormData } from "../domain";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { IProduct, IFormState } from "../ts/type-definitions";
import { findName } from "./database-get";

/* validation - server side */
const FormSchema = z.object({
    id: z.number(),
    name: z.string().trim().min(1, { message: "The product must be givven a name." }),
    categoryId: z.coerce.number()
        .gt(0, { message: 'Please select a category for the product.' }),
  });  
const ValidateProduct = FormSchema.omit({ id: true });

export async function handleProduct(prevState: IFormState, formData: FormData) {

    const product = fromFormData(formData);

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
    
    // Update database 
    if (formData.get("id")) {
       await editProduct(product);
    } else {
       // check for existing product
        const res = await findName(product.name);
        if (res.length) {
            return {
                errors: { name: [ 'existing name'] },        
                message: 'Failed to Edit Product.',
            };
        }  
        await createProduct(product);
    } 

    revalidatePath('/admin');
    redirect('/admin');
 }

 async function editProduct(product: IProduct) {
    
    const db = await openDb();
    const sql =` UPDATE products
        SET price = ${product.price},
        name="${product.name}",
        description="${product.description}",
        smallImage="${product.smallImage}",
        mediumImage="${product.mediumImage}",
        largeImage="${product.largeImage}",
        availability=${product.availability},
        slug="${product.slug}",
        categoryId=${product.categoryId}
        WHERE id = ${product.id}`;

    const res = await db.all(sql);
    return res;
 }

 async function createProduct(product: IProduct) {

    const db = await openDb();

    const sql = `INSERT INTO products ( 
        name,smallImage,mediumImage,largeImage,slug,description,availability,price,categoryId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
        product.name, 
        product.smallImage, 
        product.mediumImage, 
        product.largeImage, 
        product.slug, 
        product.description, 
        product.availability, 
        product.price, 
        product.categoryId
    ];

    const res = await db.run(sql, ...params);

    return res;
 }

export async function deleteProduct(id: number) {
    const db = await openDb();
    await db.all(`DELETE FROM products WHERE id=${id}`);
    revalidatePath('/admin');
 }

