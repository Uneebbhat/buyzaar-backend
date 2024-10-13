import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect";
import signupRoute from "./routes/User.routes";
import uploadProductRoute from "./routes/UploadProduct.routes";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

// Database connection
dbConnect();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", signupRoute, uploadProductRoute);
app.use(errorHandler);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World! + TypeScript" });
});

// Vercel's serverless function export
export default app;
