import type { userAddressSchema } from "@/schemas/userSchemas";
import type { z } from "zod";

export type userAddress = z.infer<typeof userAddressSchema>;
export type userAddressForm = Omit<userAddress, '_id'>;