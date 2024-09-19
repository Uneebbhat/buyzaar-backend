import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/constants";
import dbConnect from "./config/dbConnect";

const app: Application = express();
const port = PORT || 8080;

dbConnect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World! + TypeScript" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
