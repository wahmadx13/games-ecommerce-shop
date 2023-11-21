import { type SchemaTypeDefinition } from "sanity";
import categorySchema from "./schemas/category";
import gameSchema from "./schemas/game";
import orderSchema from "./schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categorySchema, gameSchema, orderSchema],
};
