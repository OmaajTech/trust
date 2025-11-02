const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: FRONTEND_ORIGIN }));

let cachedData = null; // store last CoinMarketCap response
let lastFetchTime = null; // store timestamp of last fetch
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Function to fetch data from CoinMarketCap and add logos
async function fetchCoins() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { limit: 120 },
        headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
        timeout: 10000,
      }
    );

    // Add logos here before saving
    cachedData = response.data.data.map((coin) => ({
      ...coin,
      logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
    }));

    lastFetchTime = Date.now();
    console.log(
      "Coins (with logos) updated at",
      new Date().toLocaleTimeString()
    );
  } catch (err) {
    console.error(" Error fetching from CoinMarketCap:", err.message);
  }
}

// API endpoint
app.get("/api/coins", async (req, res) => {
  const now = Date.now();

  if (!cachedData || !lastFetchTime || now - lastFetchTime > CACHE_DURATION) {
    await fetchCoins();
  }

  if (cachedData) {
    res.json(cachedData);
  } else {
    res.status(500).json({ error: "No data available" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Proxy running at http://localhost:${PORT}`);
  // Fetch immediately at startup
  fetchCoins();
  // Refresh every 10 minutes automatically
  setInterval(fetchCoins, CACHE_DURATION);
});
