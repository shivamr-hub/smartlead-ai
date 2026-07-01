# 🟢 SmartLead AI

<div align="center">

**Turn Website Visitors into Qualified Sales Leads.**  
Interactive qualification wizard. Live quality scoring. Exportable CRM dashboard.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Launch-10B981?style=for-the-badge)](https://shivamr-hub.github.io/smartlead-ai/)
[![Studio](https://img.shields.io/badge/Ecosystem-Shivam%20AI%20Studio-2563EB?style=for-the-badge)](#shivam-ai-studio)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Product Overview

SmartLead AI is the second product in the **Shivam AI Studio** business suite.  
It solves a critical sales problem: **website visitors leave without being qualified, leaving sales teams chasing cold leads.**

By replacing standard static contact forms with an interactive, step-by-step qualification wizard, it calculates lead scores (Hot/Warm/Cold) in real-time, displays them in an admin dashboard, and enables clean CSV exports.

---

## ✨ Features

- 🎯 **Step-by-Step Wizard** — High-converting mobile-friendly questionnaire flows
- 🎛️ **Live Lead Quality Meter** — Visual score indicator updating in real-time as users fill data
- 📈 **Weighted Scoring Engine** — Ranks budget (40%), timeline (30%), challenge (20%), and details (10%)
- 🖥️ **Admin Dashboard** — View captured records with color-coded qualification badges
- 🔍 **Interactive Filters** — Filter by `All`, `Hot`, `Warm`, and `Cold`
- 📊 **Business Insights Card** — Summary analytics (Total leads, Hot count, Average score, Conversion readiness)
- 💾 **Ecosystem Persistence** — Scoped localStorage saves lead history with unique UUIDs
- 📥 **Clean CSV Export** — Download records with detailed qualification fields

---

## 🏗️ Architecture

Following the **Shivam AI Studio** ecosystem standard:

```
smartlead-ai/
│
├── index.html              ← Presentation structure (wizard card + dashboard)
├── css/
│   └── style.css           ← Core style tokens & layouts (glassmorphism UI)
├── data/
│   └── lead-config.js      ← 🔧 Single client configuration file
├── js/
│   ├── utils.js            ← Pure helpers (UUID, validator, CSV converter)
│   ├── storage.js          ← Scoped localStorage layer
│   ├── lead-engine.js      ← Lead scorer & wizard state machine
│   ├── ui.js               ← Live meter, step transitions, lists, summary cards
│   └── app.js              ← Application bootstraper & event loop
└── README.md
```

---

## ⚙️ Installation & Customization

```bash
# Clone the repository
git clone https://github.com/shivamr-hub/smartlead-ai.git
cd smartlead-ai

# Open with Live Server in VS Code
```

### Customizing for a Client

Open `data/lead-config.js` to change:
- Questionnaire steps
- Estimated project budgets
- Timelines
- Scoring weights (e.g. prioritize timeline over budget)

No logic files (`lead-engine.js`, `ui.js`) need modification to deploy for a new industry.

---

## 💼 Shivam AI Studio Ecosystem

SmartLead AI is designed to integrate seamlessly with other tools in the suite:

1. [SmartSupport AI](https://github.com/shivamr-hub/ai-faq-chatbot) — Answer customer FAQs 24/7.
2. **SmartLead AI** [This Repo] — Qualify and score sales pipelines.

---

## 📄 License

MIT License. Free for custom deployment and client work.

---

## 👤 Author

**Shivam** — Shivam AI Studio  
*Building professional AI and automation suites for small businesses.*
