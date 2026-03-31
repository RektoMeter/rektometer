# RektoMeter 📊

> Your airdrop journal — powered by Pyth Price Feeds

RektoMeter is a smart airdrop portfolio tracker built for crypto airdrop hunters who want to know their **real P&L** — not just what they earned, but what they actually spent to get there.

---

## 🔴 Live Demo

👉 https://rektometer.click/

---

## 🧠 The Problem

Most airdrop hunters know what they earned  but not what they spent.

Gas fees, bridge costs, and swap fees quietly eat into profits.
---

## ✨ Features

### 📁 Multi-Project Tracking
- Create a project for each airdrop you're farming
- Categorize by type: L1, L2, DeFi, NFT, GameFi, Other
- Collapse/expand projects for a clean overview

### 👛 Multi-Wallet Support
- Add unlimited wallets per project
- Paste your wallet address | RektoMeter **auto-detects EVM vs SVM**
  - EVM: starts with `0x...`
  - SVM: Solana-style base58 address
- Track performance independently per wallet

### 📈 Live Holdings via Pyth Price Feeds
- Search from **500+ crypto assets** powered by Pyth Network
- Enter your quantity and buy price
- **Unrealized P&L updates in real-time** using Pyth Hermes API
- Prices refresh every 15 seconds — institutional grade data

### 💸 Expense Logging
- Log every gas fee, bridge cost, and swap fee
- Add date + note for each entry
- All expenses are totaled automatically

### 💰 Income Tracking
- Record profits from trading, WL sales, or any other gains
- Date + note per entry

### 🪂 Airdrop Value Input
- Once you receive and sell your airdrop, input the USD value
- Net P&L = Airdrop + Income − Expenses

### 🏷️ Strategy Labels (Multi-select)
| Label | Description |
|-------|-------------|
| **Retro** | Retroactive farming | no guaranteed reward |
| **Invest** | Capital deployed | has unrealized value |
| **Yapping** | Discord roles, social tasks | zero capital |
| **Testnet** | Testnet activity | minimal cost |

### 📊 P&L Breakdown Per Wallet
Each wallet shows a full breakdown:
- Unrealized P&L (from live Pyth prices)
- Expenses total
- Income total
- Airdrop value
- **Net P&L**

### 💾 Persistent Storage
- All data saved to `localStorage` — no account needed
- Data persists across sessions

---

## 🔧 How Pyth Is Used

RektoMeter integrates **Pyth Network Price Feeds** via the [Hermes REST API](https://hermes.pyth.network):

```
GET https://hermes.pyth.network/v2/updates/price/latest?ids[]=<feed_id>
```

**Two endpoints used:**

| Endpoint | Purpose |
|----------|---------|
| `/v2/price_feeds?asset_type=crypto` | Fetch all available crypto feeds (500+) |
| `/v2/updates/price/latest` | Get real-time prices for portfolio assets |

**Price calculation:**
```js
price = parseFloat(data.price) * Math.pow(10, data.expo)
```

Prices update every **15 seconds** to keep unrealized P&L accurate.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS + inline styles |
| Data | Pyth Network Hermes API |
| Storage | localStorage |
| Deploy | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/RektoMeter/rektometer.git
cd rektometer

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Guide

New to RektoMeter? Check out the built-in **Guide** page (click "Learn More" on the landing page) which covers:

- The real ROI formula for airdrop hunting
- Step-by-step walkthrough of every feature
- How to classify your airdrop strategy using labels
- How Pyth Price Feeds power the live data

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| Balya Aulia Assiddiqi | Engineering & Product — frontend development, Pyth integration, architecture | [@stircrazy](https://github.com/stircrazy) |
| Rani | Product & Design — UX research, feature definition, UI direction, content strategy & documentation | [@Ranimth07](https://github.com/Ranimth07) |

---

## 📄 License

Licensed under the [Apache License 2.0](./LICENSE).

---

## 🔗 Links

- 🌐 Live App: https://rektometer.click/
- 📝 Dev.to Article: *(coming soon)*
- 🏆 Hackathon: [Pyth Community Hackathon 2026](https://dev-forum.pyth.network/c/pyth-hackathon/14)

---
