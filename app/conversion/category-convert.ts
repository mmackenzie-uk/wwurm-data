
import { ICategory } from "../domain/category";

export interface ICategoryRequest {
  name: string;
  slug: string;
}

export interface ICategoryResponse {
  id?: number;
  name: string;
  slug: string;
}

export const toCategoryDomain = ({ name, slug} : ICategoryRequest) => {
  const category: ICategory = {
    name,
    slug
  }
  return category;
}

export const fromCategoryDomain = ({id, name, slug} : ICategory) => {
  const categoryResponse: ICategoryResponse = {
    id,
    name,
    slug
  }
  return  categoryResponse;
}

export const fromCategoriesDomain = (categories: Array<ICategory>) => {
  const arr: Array<ICategoryResponse> = [];
  categories.forEach((category) => {
      const response = fromCategoryDomain(category)
      arr.push(response);
  });
  return arr;
}




