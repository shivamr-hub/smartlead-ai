/* ============================================================
   utils.js — SmartLead AI
   Sprint 1/2: Helper Functions
============================================================ */

/**
 * Capitalizes first letter of string.
 */
function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Normalizes input string.
 */
function normalizeText(text) {
  return text.toLowerCase().trim();
}

/**
 * Checks if a string is empty.
 */
function isEmpty(text) {
  return !text || text.trim().length === 0;
}

/**
 * Generates a random RFC4122 v4 UUID.
 * Used for identifying lead records.
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Validates email layout.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validates 10-digit phone.
 */
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Converts lead objects list to download-ready CSV format.
 */
function convertToCSV(leads) {
  const headers = ["ID", "Date", "Name", "Email", "Phone", "Challenge", "Budget", "Timeline", "Score", "Category", "Source", "Notes"];
  
  const rows = leads.map(lead => [
    lead.id,
    lead.createdAt,
    `"${lead.name.replace(/"/g, '""')}"`,
    lead.email,
    lead.phone,
    lead.answers.challenge || 'N/A',
    lead.answers.budget || 'N/A',
    lead.answers.timeline || 'N/A',
    lead.score,
    lead.category,
    lead.source || 'Website',
    `"${(lead.notes || '').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
