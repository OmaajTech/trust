// import axios from "axios";

// let cachedData = null;
// let lastFetchTime = null;
// const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// async function fetchCoins() {
//   try {
//     const response = await axios.get(
//       "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//       {
//         params: { limit: 120 },
//         headers: { "X-CMC_PRO_API_KEY": process.env.VITE_CMC_API_KEY },
//         // headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY },
//         timeout: 10000,
//       }
//     );

//     cachedData = response.data.data.map((coin) => ({
//       ...coin,
//       logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
//     }));

//     lastFetchTime = Date.now();
//   } catch (err) {
//     console.error("Error fetching from CoinMarketCap:", err.message);
//   }
// }

// export default async function handler(req, res) {
//   const now = Date.now();

//   if (!cachedData || !lastFetchTime || now - lastFetchTime > CACHE_DURATION) {
//     await fetchCoins();
//   }

//   if (cachedData) {
//     res.status(200).json(cachedData);
//   } else {
//     res.status(500).json({ error: "No data available" });
//   }
// }

import axios from "axios";

let cachedData = null;
let lastFetchTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function fetchCoins() {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { limit: 120 },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.VITE_CMC_API_KEY,
        },
        timeout: 10000,
      }
    );

    cachedData = response.data.data.map((coin) => ({
      ...coin,
      logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
    }));

    lastFetchTime = Date.now();
  } catch (err) {
    console.error("Error fetching CoinMarketCap:", err.message);
  }
}

export default async function handler(req, res) {
  const now = Date.now();

  if (!cachedData || now - lastFetchTime > CACHE_DURATION) {
    await fetchCoins();
  }

  if (cachedData) {
    res.status(200).json(cachedData);
  } else {
    res.status(500).json({ error: "Unable to fetch data" });
  }
}
