import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", userRouter);
app.use("/", cartRouter);

app.listen(PORT, () => {
  connectDB();

  console.log(`Server running on port ${PORT}`);
  
});
