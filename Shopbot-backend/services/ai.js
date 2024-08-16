import axios from "axios";
import { AI_API_BASE_URL, AI_API_KEY } from "../utils/constants.js";

const aiClient = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${AI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const getAIResponse = async (userMessage) => {
  try {
    const response = await aiClient.post("/v1/generate", {
      prompt: userMessage,
      max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error communicating with AI service:", error);
    throw new Error("AI service failed");
  }
};
