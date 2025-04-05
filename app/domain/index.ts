import { IProduct, ICartItem, IFormParams, IResponse } from "../ts/type-definitions";

export const toCartItem = (product: IProduct, qty = 1) => {
    const cartItem : ICartItem = {
        id: product.id,
        name: product.name,
        smallImage: product.smallImage,
        price: product.price,
        slug: product.slug,
        qty: qty
    }
    return cartItem;
}

const createSlug = (name: string | undefined) => {
    if (!name) return;
    let slug = name.replaceAll(" ", "-")
    return slug.toLowerCase();
}

export const toFormParams = (product?: IProduct) => {

    const defaultFormData : IFormParams =
    {
        name: "Product Name",
        description: "description",
        price: 1,
        categoryId: -1,
        smallImage: "",
        availability: 1
    }

    if (product) {
        let formData: IFormParams = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            smallImage: product.smallImage,
            availability: product.availability
        }
        return formData;
    } else {
        return defaultFormData;
    }
}

export const toProduct = (response: IResponse) => {
    const product : IProduct = {
        id: response.id,
        name: response.name,
        price: response.price / 100,
        description: response.description,
        smallImage: response.smallImage.replaceAll("\"", ""), 
        mediumImage: response.mediumImage.replaceAll("\"", ""),
        largeImage: response.largeImage.replaceAll("\"", ""),
        availability: response.availability, 
        slug: response.slug,
        categoryId: response.categoryId
    }
    return product;
}


export const fromFormData = (formData: FormData) => {
    const name = formData.get("name") as string;
    const product : IProduct = {
        price: Number(formData.get("price")) * 100,
        name: name,
        id: Number(formData.get("id")),
        description: formData.get("description") as string,
        categoryId: Number(formData.get("categoryId")),
        smallImage: formData.getAll("image").toString(),
        mediumImage: formData.getAll("image").toString(),
        largeImage: formData.getAll("image").toString(),
        slug: createSlug(name) as string,
        availability: Number(formData.get("availability"))
    }
    return product;
}
