import { z } from "zod";

const PostCategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
});

type PostCategory = z.infer<typeof PostCategorySchema>;

export { PostCategorySchema, type PostCategory };
