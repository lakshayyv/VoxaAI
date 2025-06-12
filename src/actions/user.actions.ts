import { SignupPayloadType } from "@/lib/types";
import axios, { AxiosError } from "axios";

export const signup = async (payload: SignupPayloadType) => {
  try {
    const response = await axios.post("/api/auth/signup", payload);
    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.error.code === "P2002") {
        return { error: "User already exist" };
      }
      return { error: error.response?.data.message };
    }
    return { error: "Something went wrong" };
  }
};
