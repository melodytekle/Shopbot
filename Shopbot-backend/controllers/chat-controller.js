import { getAIResponse } from "../services/ai.js";

export const chat = async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required" });
    }

    const aiResponse = await getAIResponse(userMessage);
    res.json({ aiResponse });
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
