import { object, string } from "yup";

export const productSchema = object({
  name: string().required().min(3),
});
