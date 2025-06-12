import { z } from "zod";
import { SignupSchema } from "./schema";

export type SignupSchemaType = z.infer<typeof SignupSchema>;
export type SignupPayloadType = {
  name: string;
  email: string;
  password: string;
  provider: string;
};
