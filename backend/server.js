import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sampleRouter from "./routes/sample.js";
import portfolioRouter from "./routes/portfolio.js";
import contactRouter from "./routes/contact.js";
import creativesRouter from "./routes/creatives.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "MERN backend is running" });
});

app.use("/api/portfolio", portfolioRouter);
app.use("/api/contact", contactRouter);
app.use("/api/creatives", creativesRouter);
app.use("/api/sample", sampleRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error", details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

