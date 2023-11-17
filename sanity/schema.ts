import { type SchemaTypeDefinition } from "sanity";
import category from "./schemas/category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category],
};
