import { IProduct } from "../domain/product";

export type IFormParams = {
  id?: number,
  name: string,
  description: string,
  price: number,
  categoryId: number,
  smallImage: string,
  availability: number
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
            price: product.price / 10,
            categoryId: product.categoryId,
            smallImage: product.smallImage,
            availability: product.availability
        }
        return formData;
    } else {
        return defaultFormData;
    }
}

export const fromFormParams = (request : FormData) => {
  const name = request.get("name") as string;
  const product: IProduct = {
    price: Number(request.get("price")) * 100,
    name: name,
    id: request.get("id") ? Number(request.get("id")) : undefined,
    description: request.get("description") as string,
    categoryId: Number(request.get("categoryId")),
    smallImage: request.getAll("image").toString(),
    mediumImage: request.getAll("image").toString(),
    largeImage: request.getAll("image").toString(),
    slug: createSlug(name) as string,
    availability: Number(request.get("availability"))
  }
  return product;
}