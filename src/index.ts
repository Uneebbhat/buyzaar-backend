import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World! + TypeScript" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
