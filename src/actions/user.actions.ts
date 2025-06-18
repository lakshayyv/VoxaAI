import { MessageType, SigninSchemaType, SignupPayloadType } from "@/lib/types";
import axios, { AxiosError } from "axios";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

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

export const signin = async (payload: SigninSchemaType) => {
  try {
    const response = await signIn("credentials", {
      ...payload,
      redirect: false,
    });
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const googleSignin = async () => {
  try {
    await signIn("google", { callbackUrl: "/dashboard" });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const saveConversation = async (messages: MessageType[]) => {
  try {
    const response = await axios.post("/api/conversation/save", { messages });
    return { data: response.data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteConversation = async (id: string) => {
  try {
    const response = await axios.delete(`/api/conversation/${id}`);
    return { data: response.data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const logout = async () => {
  try {
    await signOut();
    return { data: { message: "Logout successful" } };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
