import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
dotenv.config();

const app: Express = express();
const port: number = 3000;

app.use(express.json()); // Middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
