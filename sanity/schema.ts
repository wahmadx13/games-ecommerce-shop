import { type SchemaTypeDefinition } from "sanity";
import categorySchema from "./schemas/category";
import gameSchema from "./schemas/game";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categorySchema, gameSchema],
};
