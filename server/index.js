import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(
  cors({
    origin: [process.env.CORS, "http://localhost:5173"],
    credentials: true,
  })
);

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(cookieParser());
app.use("/", userRouter);
app.use("/", cartRouter);

app.listen(PORT, () => {
  connectDB();

  console.log(`Server running on port ${PORT}`);
});
