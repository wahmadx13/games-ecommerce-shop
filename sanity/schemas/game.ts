// Schema for Game

const gameSchema = {
  title: "Game",
  name: "game",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      validation: (rule: any) => rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      option: { source: "name" },
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            { name: "file", type: "file", title: "File" },
          ],
          validation: (rule: any) => rule.required(),
        },
      ],
    },
    {
      name: "price",
      type: "number",
      validation: (rule: any) => rule.required().positive(),
    },
    {
      name: "isFeatured",
      type: "boolean",
      validation: (rule: any) => rule.required(),
    },
    {
      name: "isTrending",
      type: "boolean",
      validation: (rule: any) => rule.required(),
    },
    {
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule: any) => rule.required(),
    },
    {
      name: "quantity",
      type: "number",
      validation: (rule: any) => rule.required().integer().min(0),
    },
    {
      name: "description",
      type: "text",
      validation: (rule: any) => [
        rule.required().min(20),
        rule.custom((text: string) => {
          const wordCount = text?.trim().split(/\s+/).length;
          if (wordCount < 20) {
            return `Description must have a minimum of 20 words. ${wordCount}/20`;
          }
          return true;
        }),
      ],
    },
  ],
};

export default gameSchema;
