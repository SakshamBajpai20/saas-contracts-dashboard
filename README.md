# 📊 SaaS Contracts Dashboard

A modern **React + Tailwind** single-page application (SPA) that simulates a **SaaS contracts management dashboard**.  
This project was built as part of a UI/UX developer assignment.

---

## ✨ Features

- 🔑 **Login Page**
  - Mock authentication (any username, password = `test123`)
  - Stores mock JWT in localStorage

- 📑 **Contracts Dashboard**
  - Sidebar navigation (Contracts, Insights, Reports, Settings)
  - Contracts table with:
    - Search by contract name or parties
    - Filters (Status, Risk)
    - Pagination (10 rows per page)
    - Loading / Empty / Error states

- 📄 **Contract Detail Page**
  - Shows metadata (title, parties, dates, status, risk)
  - Clauses section (summary + confidence score)
  - AI Insights (risks & recommendations with severity)
  - Evidence panel (snippets + relevance scores)

- 📂 **Upload Modal**
  - Drag & drop or browse to upload files
  - Simulated uploads with random success/error
  - Retry failed uploads

---

## 🛠 Tech Stack

-
- Deployment: [Vercel][(https://vercel.com) ](https://saas-contracts-dashboard-rstt-lmn2gin27.vercel.app) 

---
saas-contracts-dashboard/
├─ public/
│ └─ contracts.json # mock API data
├─ src/
│ ├─ components/ # reusable UI components
│ ├─ context/ # AuthContext (login state)
│ ├─ pages/ # Login, Dashboard, ContractDetail
│ ├─ App.jsx # routes & layout
│ ├─ main.jsx # app entry
│ └─ index.css # Tailwind styles
├─ package.json
├─ tailwind.config.js
└─ README.md



