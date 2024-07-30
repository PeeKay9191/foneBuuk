import { z } from "zod";

export const formSchema = z.object({
  full_name: z
    .string()
    .min(3, {
      message: "Full name must be at least 3 characters.",
    })
    .max(50),
  email: z
    .string()
    .min(3, {
      message: "Email is required",
    })
    .email({
      message: "Enter a valid email.",
    }),
  phone_number: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .max(15),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
});
