import type { RegisterFormSchema } from "schemas/authSchemas";
import type { z } from "zod";

export type RegisterForm = z.infer<typeof RegisterFormSchema>;
export type LoginForm = Pick<RegisterForm, 'email' | 'password'>;