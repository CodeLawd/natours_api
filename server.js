import dotenv from "dotenv";
import express from "express";
import tourRouter from "./routes/tourRouter.js";
import userRouter from "./routes/userRouter.js";
dotenv.config({ path: "./config.env" });

import "./db/config.js";

const app = express();

app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.listen(3000, () =>
  console.log("Server started at port http://localhost:3000")
);
