import { object, string } from "yup";

export const listSchema = object({
  id_status: string().required().min(2),
  isFirstList: string().optional().min(4),
});
