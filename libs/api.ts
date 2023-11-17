import sanityClient from "./sanity";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] {
        _id,
        name,
        slug {current},
        image,
        subtitle
    }`;
  const categories: Category[] = await sanityClient.fetch({ query });

  return categories;
};
