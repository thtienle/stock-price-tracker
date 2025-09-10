import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = "d23f07hr01qgiro3epigd23f07hr01qgiro3epj0";
const symbols = ["AAPL", "MSFT", "GOOGL"];

router.get("/", async (req, res) => {
  try {
    const stockPromises = symbols.map(async (symbol) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      return {
        symbol,
        price: data.c,
        change: data.d,
        changePercent: data.dp,
      };
    });

    const stocks = await Promise.all(stockPromises);
    res.render("index", { stocks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching stock prices");
  }
});

router.get("/search/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
