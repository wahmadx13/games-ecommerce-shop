// Schema for Category

const categorySchema = {
  title: "Category",
  name: "category",
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
      validation: (rule: any) => rule.required(),
    },
    { name: "image", type: "url", validation: (rule: any) => rule.required() },
    {
      name: "subtitle",
      type: "string",
      validation: (rule: any) => rule.required(),
    },
  ],
};

export default categorySchema;
