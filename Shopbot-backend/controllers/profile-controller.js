import jwt from "jsonwebtoken";
import knex from "../config/knex.js";
import { SECRET_KEY } from "../utils/constants.js";

export const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized. Please login." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await knex("users").where({ id: decoded.id }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const orders = await knex("orders")
      .where({ user_id: user.id })
      .select("tracking_number", "status", "estimated_delivery", "items");

    const formattedOrders = orders.map((order) => ({
      trackingNumber: order.tracking_number,
      status: order.status,
      estimatedDelivery: new Date(order.estimated_delivery).toDateString(),
      items:
        typeof order.items === "string" ? JSON.parse(order.items) : order.items,
    }));

    res.json({
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      role: user.role,
      orders: formattedOrders.length > 0 ? formattedOrders : null,
    });
  } catch (error) {
    console.error("Error during profile retrieval:", error.message);
    res.status(500).json({ error: "Server error during profile retrieval." });
  }
};
