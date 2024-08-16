import { getAIResponse } from "../services/ai.js";

export const chat = async (req, res) => {
  try {
    const { userMessage } = req.body;

    // Ensure the userMessage is provided
    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required" });
    }

    // Get the AI response
    const aiResponse = await getAIResponse(userMessage);

    // Return the AI response
    res.json({ aiResponse });
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};
