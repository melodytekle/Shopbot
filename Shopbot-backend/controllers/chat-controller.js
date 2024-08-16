import { getAIResponse } from "../services/ai.js";

export const chat = async (req, res) => {
  try {
    const { userMessage } = req.body;
    const aiResponse = await getAIResponse(userMessage);
    res.json({ aiResponse });
  } catch (error) {
    res.status(500).json({ error: "Failed to get AI response" });
  }
};
