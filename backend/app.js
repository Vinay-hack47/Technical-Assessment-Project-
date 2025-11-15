import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import path from "path";
import userRouter from "./router/user.route.js";
import ocrRoutes from "./router/ocrRoutes.js";
import ocrAnalyzeRoutes from "./router/ocrAnalyzeRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://technical-assessment-project-8fje.vercel.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/ocr", ocrRoutes);
app.use("/api/v1/ocr-analyzer", ocrAnalyzeRoutes);

export default function handler(req, res) {
  return app(req, res);
}
