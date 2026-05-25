# 🚀 CryptoDash – Real-Time Cryptocurrency Dashboard

CryptoDash is a modern fintech-style cryptocurrency dashboard that displays real-time market data using the CoinGecko API.  
The project demonstrates live API integration, responsive frontend architecture, LocalStorage persistence, interactive charts, and modern JavaScript workflows.



# 🌐 Live Demo
🔗 https://cryptodash-53.netlify.app/


# ✨ Features

## ✅ Core Features (70%)

-  Search cryptocurrencies in real time
-  Live price tracking using CoinGecko API
-  24h price change indicators
-  Market capitalization display
-  Interactive 7-day price history charts
-  Save favorite coins using LocalStorage
-  Fully responsive dashboard design

---

## 🚀 Additional Features (30%)

-  USD → INR currency converter
-  Top Gainers widget
-  Top Losers widget
-  Dark mode toggle
-  Loading spinner while fetching data
-  Mobile hamburger navigation

---

# 🛠️ Tech Stack

## Frontend
- HTML5
- CSS3
- JavaScript (ES6 Modules)

## APIs & Libraries
- CoinGecko API
- Chart.js
- Font Awesome

## Deployment
- Render

---

# 📂 Project Structure

```bash
crypto-dashboard/

│── components/
│    ├── header.html
│    └── footer.html

│── pages/
│    ├── index.html
│    └── about.html

│── css/
│    ├── base.css
│    ├── layout.css
│    ├── components.css
│    └── dashboard.css

│── js/
│    ├── loader.js
│    ├── api.js
│    ├── utils.js
│    └── dashboard.js

│── images/
│    └── logo.png

│── README.md
```

---

# ⚙️ How It Works

## 🔍 Search System
Users can search cryptocurrencies like:

- bitcoin
- ethereum
- solana
- dogecoin

The app fetches live market data directly from the CoinGecko API.

---

## 📊 Chart Rendering

When a coin is searched:

1. Coin data is fetched
2. Historical market prices are requested
3. Chart.js renders a 7-day line graph dynamically

---

# 🔌 API Endpoints Used

## Coin Details
```bash
https://api.coingecko.com/api/v3/coins/{coin}
```

## Market Chart
```bash
https://api.coingecko.com/api/v3/coins/{coin}/market_chart
```

## Market List
```bash
https://api.coingecko.com/api/v3/coins/markets
```

---

# 📱 Responsive Design

CryptoDash is optimized for:

- Desktop
- Tablet
- Mobile devices

Responsive features include:

- Flexible grid layouts
- Mobile navigation menu
- Adaptive typography
- Responsive charts

---

# 🌙 Dark Mode

Dark mode preference is stored using LocalStorage.

```js
localStorage.setItem("theme", "dark");
```

The theme persists across page reloads.

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/crypto-dashboard.git
```

---

## 2️⃣ Open Project

```bash
cd crypto-dashboard
```

---

## 3️⃣ Run Locally

Simply open:

```bash
pages/index.html
```

Or use VS Code Live Server.

---

# 📸 Screens Included

- Dashboard UI
- Search Results
- Live Charts
- Favorites Section
- Dark Mode
- Mobile Layout

---

# 🧠 Learning Outcomes

This project demonstrates:

- API Integration
- Async/Await
- ES6 Modules
- DOM Manipulation
- LocalStorage
- Responsive UI Design
- Dynamic Chart Rendering
- Component-Based Structure

---

# 📈 Future Improvements

- Add stock market support
- Real-time websocket updates
- User authentication
- Portfolio tracking
- Multi-currency support
- Advanced analytics dashboard

---

# 👨‍💻 Author

Developed as a fintech frontend project for demonstrating real-world dashboard development skills using modern JavaScript and APIs.

---

# 📄 License

This project is for educational and portfolio purposes.

---

# ⭐ Acknowledgements

- CoinGecko API
- Chart.js
- Font Awesome
- Render Hosting

```