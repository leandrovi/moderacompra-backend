import { number, object, string } from "yup";

export const productQuantitySchema = object({
  list_id: string().required(),
  product_id: string().required(),
  initial_quantity: number().required(),
  final_quantity: number().optional(),
  suggestion_quantity: number().optional(),
  unity: string().required(),
});
