import { IProduct } from "../domain/product";
import { IFormDTO } from "../DTO/formDTO";


const createSlug = (name: string | undefined) => {
    if (!name) return;
    let slug = name.replaceAll(" ", "-")
    return slug.toLowerCase();
  }

export const toFormDTO = (product?: IProduct) => {

  let formDTO: IFormDTO = {
      name: "Product Name",
      description: "description",
      price: 1,
      categoryId: -1,
      smallImage: "",
      availability: 1
  }
  if (product) {
    formDTO.id = product.id;
    formDTO.name = product.name;
    formDTO.description = product.description;
    formDTO.price = product.price / 10;
    formDTO.categoryId = product.categoryId;
    formDTO.smallImage = product.smallImage;
    formDTO.availability = product.availability;
  }
  return formDTO;
}

export const fromFormData = (request : FormData) => {
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
