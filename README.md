<div align="center">

# 🏁 F1 Fantasy

### Lights out. Build your team.

A fantasy Formula One web app for the **2026 season**: pick five drivers, back two constructors, and stay under a **$100M** budget.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

*CSC457 – Mobile App Development · Project 1*

</div>

---

## 🏎️ About the project

**F1 Fantasy** is a full-stack web application made of two parts:

| Part | Tech | Role |
| --- | --- | --- |
| **Backend** | Node.js + Express | A bare-bones Web API that performs CRUD operations on an in-memory dataset of fantasy teams |
| **Frontend** | React SPA (Vite) | A single-page app with multiple views that talks to the API to display and manage teams |

### The rules of the game

| | Rule |
| :---: | --- |
| 🧑‍✈️ | Pick **5 drivers** from the 2026 grid |
| 🏭 | Back **2 constructors** |
| 💰 | Stay under the **$100M** budget, where every pick has a price |

---

## ✨ Features so far

- **Start-lights intro**: five red lights switch on one by one, shrinking as they go, then go out after a random delay (just like a real race start) to reveal the headline. Click the lights to replay.
- **Live 2026 grid ticker**: an endless strip of all 22 drivers with their photo, number, team and price, coloured in each team's livery and loaded live from the API. Hover to pause.
- **Featured team card**: a compact view of a fantasy team pulled from the backend, showing its drivers, constructors and a budget bar. Arrows cycle through every saved team.
- **Graceful offline mode**: if the API isn't running, the page quietly falls back to example data instead of breaking.
- **Responsive navigation**: a glassy sticky navbar with an animated active-link underline that collapses into a burger menu on small screens.
- **Single-page routing** with React Router, so switching views never reloads the page.

---

## 🧱 Tech stack

**Frontend**: React 19 · Vite 8 · React Router 7 · Redux Toolkit · plain CSS (Saira font)
**Backend**: Node.js · Express 5 · CORS

---

## 🗂️ Project structure

```
F1_Fantasy/
├── backend/
│   ├── backend.js        # Express server + CRUD routes
│   ├── data.js           # 2026 drivers & constructors (prices, colours, photos)
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── public/           # favicon
    └── src/
        ├── main.jsx      # app entry + BrowserRouter
        ├── App.jsx       # layout + routes
        ├── index.css     # global styles
        ├── assets/       # logo
        ├── components/   # Navbar, Footer (shared on every page)
        └── pages/        # Home (more views coming)
```

---

## 🔌 API reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
| :---: | --- | --- |
| `GET` | `/teams` | Get all fantasy teams |
| `GET` | `/teams/:id` | Get one team by id |
| `POST` | `/teams` | Create a new team |
| `PUT` | `/teams/:id` | Update an existing team |
| `DELETE` | `/teams/:id` | Delete a team |
| `GET` | `/drivers` | The 22 drivers of the 2026 grid *(read-only)* |
| `GET` | `/constructors` | The 11 constructors *(read-only)* |

### The `Team` entity

| Property | Type | Example |
| --- | --- | --- |
| `id` | number | `1` |
| `teamName` | string | `"Amanda Racing"` |
| `manager` | object | `{ "name": "Amanda", "country": "Lebanon" }` |
| `driverIds` | array of numbers | `[2, 9, 12, 14, 22]` |
| `constructorIds` | array of numbers | `[6, 11]` |
| `remainingBudget` | number | `7` |
| `isFinalized` | boolean | `true` |

<details>
<summary><b>Example: create a team</b></summary>

```http
POST /teams
Content-Type: application/json

{
  "teamName": "Pit Stop Pros",
  "manager": { "name": "Guest", "country": "Italy" },
  "driverIds": [7, 8, 11, 17, 10],
  "constructorIds": [9, 8],
  "remainingBudget": 3,
  "isFinalized": false
}
```

Returns `201 Created` with the new team (and its new `id`), or `400` if required fields are missing.

</details>

---

## 🚦 Getting started

You need **Node.js** installed. The backend and the frontend run at the same time, in **two terminals**.

**1. Start the backend**

```bash
cd backend
npm install
node backend.js
```

The API runs on **http://localhost:3000**.

**2. Start the frontend** (in a second terminal)

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open the link Vite prints (usually **http://localhost:5173**).

> 💡 `--legacy-peer-deps` avoids a known npm bug with the ESLint packages in this template.

---

## 🗺️ Roadmap

- [x] Backend Web API (Express, CRUD over in-memory data)
- [x] Navbar & footer
- [x] Home view
- [ ] About Us view
- [ ] Contact Us view (form with event handling and input validation)
- [ ] Display all teams
- [ ] Display a single team
- [ ] Build (submit) a new team
- [ ] Update an existing team
- [ ] Delete a team
- [ ] Centralised state with Redux Toolkit

---

## 👩‍💻 Team

Designed and built by **Roya** and **Amanda** ([@amandaelkik](https://github.com/amandaelkik)).

---

<div align="center">

<sub>An unofficial student project made for learning purposes. Not affiliated with Formula 1 or the FIA. Driver photos are loaded from the OpenF1 API.</sub>

</div>
