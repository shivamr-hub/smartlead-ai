# SmartLead AI — Technical Architecture

> Outline of the application lifecycle, scoring mechanism, and file relationships.

---

## Folder Map

```
smartlead-ai/
│
├── index.html              ← UI structures (Wizard page + Hidden dashboard)
├── css/
│   └── style.css           ← CSS variables design tokens & transitions
├── data/
│   └── lead-config.js      ← Configuration variables (editable client config)
├── js/
│   ├── utils.js            ← Base helpers & CSV compiler
│   ├── storage.js          ← Scope-isolated storage functions
│   ├── lead-engine.js      ← Lead scoring & progression engine
│   ├── ui.js               ← Render steps, progress, meter, dashboard, cards
│   └── app.js              ← Bootstrap, events bindings, submit pipelines
```

---

## Lead Scoring Data Flow

```
User selects Option
  ↓
ui.js captures input selection event
  ↓
app.js calls LeadEngine.calculateScore(currentAnswers)
  ↓
lead-engine.js reads weights from data/lead-config.js
  ↓
lead-engine.js sums points:
  - Budget points (0 - 40)
  - Timeline points (0 - 30)
  - Challenge points (0 - 20)
  - Contact Details completion points (0 - 10)
  ↓
ui.js receives score (0 - 100)
  ↓
ui.js updates Lead Quality Meter and Badge color in real-time
```

---

## State Flow: Wizard Questionnaire

```
IDLE / WELCOME
  ↓
Step 1: Name Input (text)
  ↓
Step 2: Business Challenge (select option)
  ↓
Step 3: Budget Range (select option)
  ↓
Step 4: Timeline Urgency (select option)
  ↓
Step 5: Email Address (email input)
  ↓
Step 6: Phone Number (phone input)
  ↓
COMPLETE
  - Calculate final score
  - Classify lead category (Hot / Warm / Cold)
  - Save lead to storage with UUID, timestamp, and source
  - Show success prompt
```

---

## Dependency Order

```
1. utils.js       (no dependencies)
2. storage.js     (no dependencies)
3. lead-config.js (no dependencies)
4. ui.js          (uses utils.js, lead-config.js)
5. lead-engine.js (uses lead-config.js, utils.js)
6. app.js         (uses everything above)
```
