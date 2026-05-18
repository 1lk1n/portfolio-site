import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "name"),
  phone: z
    .string()
    .min(7, "phone")
    .regex(/^[\d\s+\-()]+$/, "phone"),
  email: z.string().email("email"),
  comment: z.string().min(10, "comment"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
