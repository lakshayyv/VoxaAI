import { z } from "zod";

export const SignupSchema = z.object({
  firstname: z.string().min(1, "This field required"),
  lastname: z.string().min(1, "This field required"),
  email: z
    .string()
    .min(1, "This field required")
    .email("Enter e valid email address"),
  password: z.string().min(8, "Password must contain more than 7 characters"),
});

export const SigninSchema = SignupSchema.omit({
  firstname: true,
  lastname: true,
});
