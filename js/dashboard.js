import { fetchCoin, fetchHistory, fetchMarkets } from "./api.js";
import { saveFavorite, loadFavorites, convertUsdToInr, removeFavorite  } from "./utils.js";

const search     = document.getElementById("search");
const searchBtn  = document.getElementById("searchBtn");
const results    = document.getElementById("results");
const favList    = document.getElementById("favList");
const loading    = document.getElementById("loading");
const gainersList = document.getElementById("gainers");
const losersList  = document.getElementById("losers");
const usdInput   = document.getElementById("usdInput");
const convertBtn = document.getElementById("convertBtn");
const inrResult  = document.getElementById("inrResult");

let chart;

// Search coin
// Replace the existing search.addEventListener block with this:

async function handleSearch() {
  const coin = search.value.trim().toLowerCase();
  if (!coin) return;
  showLoading(true);
  try {
    const data = await fetchCoin(coin);
    renderResult(data);
    await renderChart(coin);
  } catch (error) {
    results.innerHTML = `<p class="error">⚠ Coin not found or network error. Try: bitcoin, ethereum, solana</p>`;
  } finally {
    showLoading(false);
  }
}

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

searchBtn.addEventListener("click", handleSearch);

// Render searched coin
function renderResult(data) {
  const change = data.market_data.price_change_percentage_24h.toFixed(2);
  const isPositive = change >= 0;
  results.innerHTML = `
    <div class="card">
      <img src="${data.image.small}" alt="${data.name}">
      <div class="card-meta">
        <h2>${data.name} <span class="symbol-tag">${data.symbol.toUpperCase()}</span></h2>
        <div class="card-stats">
          <span class="price">$${data.market_data.current_price.usd.toLocaleString()}</span>
          <span class="change ${isPositive ? 'positive' : 'negative'}">${isPositive ? '▲' : '▼'} ${Math.abs(change)}% (24h)</span>
          <span>Market Cap: $${data.market_data.market_cap.usd.toLocaleString()}</span>
        </div>
      </div>
      <button id="favBtn">★ Add to Favorites</button>
    </div>`;
  document.getElementById("favBtn").addEventListener("click", () => {
    saveFavorite(data.id);
    renderFavorites();
  });
}

// Render chart
async function renderChart(coin) {
  const history = await fetchHistory(coin);
  const ctx = document.getElementById("priceChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.prices.map(item => new Date(item[0]).toLocaleDateString()),
      datasets: [{
        label: `${coin.charAt(0).toUpperCase() + coin.slice(1)} Price (USD)`,
        data: history.prices.map(item => item[1]),
        borderColor: "#4d8bff",
        backgroundColor: "rgba(77,139,255,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { family: "'Space Mono', monospace", size: 11 } } } },
      scales: {
        x: { grid: { color: "rgba(128,128,128,0.1)" }, ticks: { font: { size: 10 } } },
        y: { grid: { color: "rgba(128,128,128,0.1)" }, ticks: { font: { size: 10 } } }
      }
    }
  });
  document.querySelector(".chart-section").style.display = "block"; // ← add this
}

// Render favorites
function renderFavorites() {
  const favorites = loadFavorites();
  favList.innerHTML = favorites.length === 0
    ? `<li class="empty">No favorites yet — search a coin and add it.</li>`
    : favorites.map(coin => `
        <li>
          <span>${coin}</span>
          <button class="fav-remove" data-coin="${coin}" title="Remove">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>`).join("");

  favList.querySelectorAll(".fav-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFavorite(btn.dataset.coin);
      renderFavorites();
    });
  });
}

// Loading spinner
function showLoading(show) {
  loading.classList.toggle("hidden", !show);
}

// Currency converter
convertBtn.addEventListener("click", () => {
  const usd = Number(usdInput.value);
  if (!usd) { inrResult.textContent = "Enter a valid USD amount"; return; }
  inrResult.textContent = `₹${convertUsdToInr(usd).toLocaleString()}`;
});

// Top gainers and losers
async function renderMarketWidgets() {
  try {
    const markets = await fetchMarkets();
    const sorted = [...markets].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    const gainers = sorted.slice(0, 5);
    const losers  = sorted.slice(-5).reverse();
    gainersList.innerHTML = gainers.map(item => `
      <li>
        <span class="coin-name">${item.name}</span>
        <span class="coin-change gain">+${(item.price_change_percentage_24h ?? 0).toFixed(2)}%</span>
      </li>`).join("");

    losersList.innerHTML = losers.map(item => `
      <li>
        <span class="coin-name">${item.name}</span>
        <span class="coin-change loss">${(item.price_change_percentage_24h ?? 0).toFixed(2)}%</span>
      </li>`).join("");
  } catch {
    gainersList.innerHTML = `<li>Error loading data</li>`;
    losersList.innerHTML  = `<li>Error loading data</li>`;
  }
}

renderFavorites();
renderMarketWidgets();