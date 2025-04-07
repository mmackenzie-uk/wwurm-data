import { z } from 'zod';

export type IFormState = {
    errors?: {
        categoryId?: string[];
        name?: string[];
    };
    message?: string | null;
};

/* validation - server side */
const FormSchema = z.object({
    id: z.number(),
    name: z.string().trim().min(1, { message: "The product must be givven a name." }),
    categoryId: z.coerce.number()
        .gt(0, { message: 'Please select a category for the product.' }),
  });  
export const ValidateProduct = FormSchema.omit({ id: true });

