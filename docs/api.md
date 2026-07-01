# SmartLead AI — API Reference

> Pre-implementation API specification for all SmartLead AI modules.

---

## `utils.js` — Helper Functions

---

### `generateUUID()`
Generates a random RFC4122 version 4 compliant UUID. Used to uniquely identify leads.

| | Type | Description |
|---|---|---|
| **Returns** | `string` | Unique 36-character string |

```javascript
generateUUID() // → "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
```

---

### `convertToCSV(leads)`
Converts lead records into a formatted CSV string.

| | Type | Description |
|---|---|---|
| **Param** | `Array<Object>` | Array of qualified leads |
| **Returns** | `string` | CSV formatted string |

```javascript
convertToCSV(leads)
// → "ID,Date,Name,Email,Phone,Challenge,Budget,Timeline,Score,Category,Source,Notes\n..."
```

---

## `storage.js` — Storage Layer

---

### `saveLead(lead)`
Saves a qualified lead object to localStorage. Appends to existing list.

| | Type | Description |
|---|---|---|
| **Param** | `Object` | Lead object with UUID and scoring data |

```javascript
saveLead({
  id: "uuid-12345",
  createdAt: "2025-07-01T10:00:00Z",
  name: "John Doe",
  email: "john@doe.com",
  phone: "9876543210",
  answers: { challenge: "leads", budget: "high", timeline: "now" },
  score: 90,
  category: "HOT",
  source: "Website"
});
```

---

### `loadLeads()`
Retrieves all leads from localStorage.

| | Type | Description |
|---|---|---|
| **Returns** | `Array<Object>` | Lead entries |

---

### `deleteLead(id)`
Deletes a single lead by its UUID.

| | Type | Description |
|---|---|---|
| **Param** | `string` | The UUID of the target lead |

---

## `lead-engine.js` — Business Logic

---

### `LeadEngine.calculateScore(answers)`
Calculates the lead quality score using weighted metrics.

| | Type | Description |
|---|---|---|
| **Param** | `Object` | Answers collected so far |
| **Returns** | `number` | Score between 0 and 100 |

```javascript
LeadEngine.calculateScore({ challenge: "leads", budget: "medium", timeline: "soon" })
// → 60 (20 + 25 + 15 + 0 for missing contact)
```

---

### `LeadEngine.classifyLead(score)`
Classifies a score into Hot, Warm, or Cold status based on threshold constants.

| | Type | Description |
|---|---|---|
| **Param** | `number` | Quality score |
| **Returns** | `string` | "HOT" \| "WARM" \| "COLD" |

---

## `ui.js` — Presentation Layer

---

### `renderStep(question, stepIndex, totalSteps)`
Renders a single step question in the wizard container.

---

### `updateProgress(percentage)`
Updates the step progress bar visually.

---

### `updateLiveMeter(score, category)`
Updates the real-time quality meter percentage and badge status.

---

### `renderDashboard(leads, filterCategory)`
Renders color-coded lists of leads on the Admin panel based on the active filter tag (`ALL`, `HOT`, `WARM`, `COLD`).

---

### `renderInsights(leads)`
Recalculates dashboard summary cards:
- Total Leads count
- Hot Leads count
- Average Score percentage
- Conversion Readiness rate
