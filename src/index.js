import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js"; // ✅ Import properly

dotenv.config();

const app = express();

connectDB(); // ✅ Now it will work

app.listen(8000, () => {
  console.log("Server running on port 5000");
});
