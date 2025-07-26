import express from "express";
import path from "path";
import stocksRouter from "./routes/stocks.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Setting EJS template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static file
app.use(express.static(path.join(__dirname, "public")));

app.use("/", stocksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
