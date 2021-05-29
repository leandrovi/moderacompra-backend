import { array, number, object, string } from "yup";

export const userSchema = object({
  name: string().required().min(2),
  password: string().required().min(4),
  email: string().optional().email(),
});
