import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import menuItems from "./routes/menu-items.js";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // Middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/post", menuItems);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
