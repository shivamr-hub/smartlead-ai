/* ============================================================
   lead-config.js — SmartLead AI
   Sprint 0: Configuration Data Model
   
   THIS FILE SEPARATES DATA FROM ENGINE LOGIC.
   To customize this lead qualification flow for any client:
   1. Update business details
   2. Edit the questions array (order, types, labels)
   3. Update the scoring weight thresholds
============================================================ */

const LEAD_CONFIG = {

  business: {
    name: "Shivam AI Studio",
    industry: "AI Automation & Web Development",
    currency: "INR"
  },

  /* ── Qualification Questions ───────────────────────────────
     - id: unique identifier matching scoring keys
     - type: "text" | "select" | "email" | "phone"
     - label: what user reads
     - options: choice lists for "select" type
  ──────────────────────────────────────────────────────────── */
  questions: [
    {
      id: "name",
      type: "text",
      label: "What's your name?",
      placeholder: "e.g. Priyan Sharma"
    },
    {
      id: "challenge",
      type: "select",
      label: "What is your biggest business challenge right now?",
      options: [
        { label: "Too many repetitive customer support messages", value: "support" },
        { label: "Need a way to capture more website leads", value: "leads" },
        { label: "Need a modern business website", value: "website" },
        { label: "Want to automate manual office tasks", value: "automation" },
        { label: "Other / General inquiry", value: "other" }
      ]
    },
    {
      id: "budget",
      type: "select",
      label: "What is your estimated project budget?",
      options: [
        { label: "Under ₹10,000", value: "low" },
        { label: "₹10,000 – ₹50,000", value: "medium" },
        { label: "Above ₹50,000", value: "high" }
      ]
    },
    {
      id: "timeline",
      type: "select",
      label: "When are you looking to start?",
      options: [
        { label: "Immediately (< 1 month)", value: "now" },
        { label: "Within 1 to 3 months", value: "soon" },
        { label: "Just researching for now", value: "later" }
      ]
    },
    {
      id: "email",
      type: "email",
      label: "What's your work email address?",
      placeholder: "e.g. you@company.com"
    },
    {
      id: "phone",
      type: "phone",
      label: "And your phone number?",
      placeholder: "e.g. 63555 79882"
    }
  ],

  /* ── Weighted Scoring System ────────────────────────────────
     Modify these weights to align with what a client considers 
     a "Hot" lead. Max score total is 100 points.
  ──────────────────────────────────────────────────────────── */
  scoring: {
    // 1. Budget Weight (Max 40 points)
    budget: {
      high: 40,   // Above 50k
      medium: 25, // 10k - 50k
      low: 10     // Under 10k
    },

    // 2. Timeline Weight (Max 30 points)
    timeline: {
      now: 30,    // Immediate
      soon: 15,   // 1-3 months
      later: 5    // Researching
    },

    // 3. Challenge/Need Fit (Max 20 points)
    challenge: {
      automation: 20, // Prime automation target
      leads: 20,      // Prime lead-gen target
      support: 20,    // Prime bot target
      website: 15,    // Good web client
      other: 10       // General match
    },

    // 4. Contact Information Completion (Max 10 points)
    contactComplete: 10
  },

  /* ── Classification Boundaries ──────────────────────────── */
  thresholds: {
    hot: 70,  // 70 - 100 -> Hot Lead
    warm: 40  // 40 - 69  -> Warm Lead
              // 0 - 39   -> Cold Lead
  }

};
