import z from "zod";

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string()
});

export const RegisterFormSchema = UserSchema.pick({ name: true, email: true }).extend({
    password: z.string(),
    password_confirmation: z.string()
});