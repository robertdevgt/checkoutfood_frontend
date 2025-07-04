import z from "zod";

export const UserSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string()
});

export const RegisterFormSchema = UserSchema.pick({ name: true, email: true, role:true }).extend({
    password: z.string(),
    password_confirmation: z.string(),
    phone: z.string()
});