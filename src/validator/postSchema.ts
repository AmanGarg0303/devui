import vine from "@vinejs/vine";

export const postSchema = vine.object({
  title: vine.string().minLength(5).maxLength(60),
  description: vine.string().minLength(10).maxLength(2000),
  image: vine.string(),
});
