import { z } from "zod";
import { SigninSchema, SignupSchema } from "./schema";

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type SignupPayloadType = {
  name: string;
  email: string;
  password: string;
  provider: string;
};

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export type MessageType = {
  role: string;
  text: string;
};
