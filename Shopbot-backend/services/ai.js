import { OpenAI } from "openai";
import { AI_API_KEY, AI_API_BASE_URL } from "../utils/constants.js";
import knex from "../config/knex.js";

const openai = new OpenAI({
  apiKey: AI_API_KEY,
  baseURL: AI_API_BASE_URL,
});

const getOrderDetails = async (trackingNumber) => {
  const order = await knex("orders")
    .where({ tracking_number: trackingNumber })
    .first();
  if (!order) return null;

  return `Order ${trackingNumber} is currently ${
    order.status
  }. The items in the order are: ${order.items
    .map((item) => `${item.quantity} x ${item.name}`)
    .join(", ")}.`;
};

export const getAIResponse = async (userMessage) => {
  try {
    const trackingNumberMatch = userMessage.match(/\b\d{9}\b/);
    let orderDetails = "";

    if (trackingNumberMatch) {
      const trackingNumber = trackingNumberMatch[0];
      orderDetails = await getOrderDetails(trackingNumber);

      if (orderDetails) {
        userMessage = `${userMessage}. Here are the details: ${orderDetails}`;
      } else {
        userMessage = `${userMessage}. Unfortunately, I couldn't find an order with tracking number ${trackingNumber}.`;
      }
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant named ShopBot who can provide information about orders based on tracking numbers as well as answer shoppers questions that have to do with shopping.",
        },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    return chatCompletion.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "Error communicating with AI service:",
      error.response?.data || error.message
    );
    throw new Error("AI service failed");
  }
};
