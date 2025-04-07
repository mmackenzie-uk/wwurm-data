import { IProduct } from "../domain/product";

export type IProductResponse = {
  id?: number;
  name: string;
  price: number; 
  description: string;
  smallImage: Array<string>; 
  mediumImage: Array<string>;
  largeImage: Array<string>; 
  availability: number; 
  slug: string;
  categoryId: number;
}

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
  const productResponse: IProductResponse = {
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
  return  productResponse;
}

export const fromProductsDomain = (products: Array<IProduct>) => {
  const arr: Array<IProductResponse> = [];
  products.forEach((product) => {
      const response = fromProductDomain(product)
      arr.push(response);
  });
  return arr;
}




