import jwt from "jsonwebtoken";
import { users } from "../consts.js";
import { SECRET_KEY } from "../utils/constants.js";

export const getProfile = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Please login");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find((user) => user.email === decoded.email);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(401).send("Invalid auth token");
  }
};
