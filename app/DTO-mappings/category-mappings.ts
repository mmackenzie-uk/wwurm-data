
import { ICategory } from "../domain/category";
import { ICategoryDTO } from "../DTO/categoryDTO";



export const toCategoryDomain = ({ name, slug} : ICategoryDTO) => {
  const category: ICategory = {
    name,
    slug
  }
  return category;
}

export const fromCategoryDomain = ({id, name, slug} : ICategory) => {
  const categoryDTO: ICategoryDTO = {
    id,
    name,
    slug
  }
  return  categoryDTO;
}

export const fromCategoriesDomain = (categories: Array<ICategory>) => {
  const arr: Array<ICategoryDTO> = [];
  categories.forEach((category) => {
      const response = fromCategoryDomain(category)
      arr.push(response);
  });
  return arr;
}




