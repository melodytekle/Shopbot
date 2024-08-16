import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../consts.js";
import { SECRET_KEY } from "../utils/constants.js";

export const register = async (req, res) => {
  try {
    const { fName, lName, email, password, role } = req.body;

    if (!fName || !lName || !email || !password || !role) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userId] = await knex("users").insert({
      fName,
      lName,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: userId, email, role }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error during registration." });
  }
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
