import { IProduct } from "../domain/product";
import { IProductDTO } from "../DTO/productDTO";

export const fromProductDomain = ({
  id,  
  name,
  price,
  description,
  smallImage,
  mediumImage,
  largeImage,
  availability,
  slug,
  categoryId} : IProduct) => {
  const productDTO: IProductDTO = {
    id,
    name,
    price: price / 100,
    description,
    smallImage: smallImage.replaceAll("\"", "").split(','),
    mediumImage: mediumImage.replaceAll("\"", "").split(','),
    largeImage: largeImage.replaceAll("\"", "").split(','),
    availability,
    slug,
    categoryId
  }
  return  productDTO;
}

export const fromProductsDomain = (products: Array<IProduct>) => {
  const arr: Array<IProductDTO> = [];
  products.forEach((product) => {
      const response = fromProductDomain(product)
      arr.push(response);
  });
  return arr;
}




