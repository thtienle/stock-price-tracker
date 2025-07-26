import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = "NGOH5C8Z3YBWKDJ9";
const symbols = ["AAPL", "MSFT", "GOOGL"];

router.get("/", async (req, res) => {
  try {
    const stockPromises = symbols.map(async (symbol) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const response = await axios.get(url);
      const data = response.data["Global Quote"];
      return {
        symbol: data["01. symbol"],
        price: data["05. price"],
      };
    });

    const stocks = await Promise.all(stockPromises);
    res.render("index", { stocks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching stock prices");
  }
});

export default router;
