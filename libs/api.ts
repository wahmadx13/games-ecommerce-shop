import sanityClient from "./sanity";
import { Category } from "@/types/category";
import { Game } from "@/types/game";

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

export const getGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category_ref][0] {
            name,
            slug {
                current
            }
        },
        slug,
        quantity,
        description
    }`;
  const games: Game[] = await sanityClient.fetch({ query });
  return games;
};
