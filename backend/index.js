import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import path from "path";
import userRouter from "./router/user.route.js";
import ocrRoutes from "./router/ocrRoutes.js";
import ocrAnalyzeRoutes from "./router/ocrAnalyzeRoutes.js"


dotenv.config();
const app = express();
const PORT = 3000; 
connectDB();

const __dirname = path.resolve();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ocr", ocrRoutes);
app.use('/api/v1/ocr-analyzer', ocrAnalyzeRoutes);

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});