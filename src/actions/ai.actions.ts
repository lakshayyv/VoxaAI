import axios from "axios";

export const fetchResult = async (transcript: string) => {
  try {
    const response = await axios.post("/api/ai/result", { transcript });
    return { data: response.data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
