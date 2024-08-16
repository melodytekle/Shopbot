import jwt from "jsonwebtoken";
import knex from "../knexfile.js";
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

    res.json({
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during profile retrieval:", error);
    res.status(500).json({ error: "Server error during profile retrieval." });
  }
};
