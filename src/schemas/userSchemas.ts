import { z } from "zod";

export const userAddressSchema = z.object({
    _id: z.string(),
    label: z.string(),
    formatted_address: z.string(),
    street: z.string().optional(),
    number: z.string().optional(),
    zone: z.string().optional(),
    city: z.string().optional(),
    department: z.string().optional(),
    latitude: z.number(),
    longitude: z.number(),
    notes: z.string().optional()
});

export const userAddressesSchema = z.array(userAddressSchema);