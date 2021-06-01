import { object, string } from "yup";

export const sessionSchema = object({
  password: string().required().min(4),
  email: string().required().email(),
});
