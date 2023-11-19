import axios from "axios";
import sanityClient from "./sanity";
import { Category } from "@/types/category";
import { Game, GameSubset } from "@/types/game";

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

export const getCategoriesGames = async (slug: string): Promise<Game[]> => {
  const query = `*[_type == "game" && category->slug.current == "${slug}"] {
    name,
    price,
    images,
    isFeatured,
    isTrending,
    slug,
    quantity,
    description,
    category->{
      name,
      subtitle
    }
  }`;
  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type == "category" && slug.current == "${slug}"][0]`;
  const category: Category = await sanityClient.fetch({ query });

  return category;
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

export const getRecentGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] | order(_createdAt desc)[0...4] {
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

export const getGame = async (slug: string): Promise<Game> => {
  const query = `*[_type == "game" && slug.current == "${slug}"][0]{
    _id,
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
  const game: Game = await sanityClient.fetch({ query });

  return game;
};

export const updateGameQuantity = async (games: GameSubset[]) => {
  const mutation = {
    mutations: games.map(({ _id, maxQuantity, quantity }) => {
      return {
        patch: {
          id: _id,
          set: {
            quantity: maxQuantity - quantity,
          },
        },
      };
    }),
  };

  const response = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.NEXT_SANITY_TOKEN}` } },
  );

  return response.data;
};
