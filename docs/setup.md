# SmartLead AI — Setup Guide

> Setup instructions for running and customizing SmartLead AI.

---

## Requirements

| Requirement | Detail |
|---|---|
| **Browser** | Any modern browser |
| **Editor** | VS Code recommended |
| **VS Code Extension** | Live Server (for auto-reload & localStorage support) |
| **Dependencies** | None (pure client-side HTML/CSS/JS) |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/shivamr-hub/smartlead-ai.git

# Enter project directory
cd smartlead-ai

# Open in VS Code
code .
```

---

## Running Locally

1. Open VS Code
2. Right-click `index.html`
3. Click **"Open with Live Server"**
4. The dashboard and wizard will load at `http://127.0.0.1:5500`

---

## Customizing Lead Scoring & Questions

All lead criteria live in `data/lead-config.js`. 

To configure scoring:
- Open `data/lead-config.js`
- Edit the `scoring` block:
  ```javascript
  scoring: {
    budget: {
      high: 40,
      medium: 25,
      low: 10
    },
    // timeline, challenge, contact weights...
  }
  ```
- Edit thresholds:
  ```javascript
  thresholds: {
    hot: 70,   // leads scoring 70+ categorized as Hot
    warm: 40   // leads scoring 40-69 categorized as Warm
  }
  ```
- Edit question texts and dropdown choices inside the `questions` array.

---

## Deployment

### GitHub Pages
1. Push to your GitHub repository
2. Go to **Settings → Pages**
3. Set Source to `Deploy from branch`, select `main`, folder `/ (root)`
4. Click **Save**

### Netlify
- Drag and drop the `smartlead-ai/` folder onto the Netlify dashboard for instant hosting.
