import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/natours-test")
  .then(() => console.log("Database connection successful!"))
  .catch((err) => console.log(err.message));
