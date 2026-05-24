const API_URL = "https://api.coingecko.com/api/v3";

// Fetch coin details

export async function fetchCoin(coin = "bitcoin") {

  const response = await fetch(
    `${API_URL}/coins/${coin}`
  );

  if (!response.ok) {

    throw new Error("Coin not found");

  }

  return response.json();

}

// Fetch chart history

export async function fetchHistory(coin = "bitcoin") {

  const response = await fetch(
    `${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch chart data"
    );

  }

  return response.json();

}

// Fetch top gainers and losers

export async function fetchMarkets() {

  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch market data"
    );

  }

  return response.json();

}