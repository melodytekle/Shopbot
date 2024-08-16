import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import profileRoutes from "./routes/profile.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/my-profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
