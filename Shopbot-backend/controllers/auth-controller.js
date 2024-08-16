import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../consts.js";
import { SECRET_KEY } from "../utils/constants.js";

export const register = async (req, res) => {
  // Registration logic here
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Please enter the required fields");
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
};
