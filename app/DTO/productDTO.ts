export type IProductDTO = {
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
