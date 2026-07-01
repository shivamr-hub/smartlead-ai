/* ============================================================
   storage.js — SmartLead AI
   Sprint 0: Setup / Skeletons
============================================================ */

const STORAGE_KEYS = {
  LEADS: 'smartlead_leads',
  THEME: 'smartlead_theme'
};

/**
 * Saves a single lead record to localStorage.
 */
function saveLead(lead) {
  try {
    const leads = loadLeads();
    leads.push(lead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch (error) {
    console.warn('[Storage] Error saving lead:', error.message);
  }
}

/**
 * Loads all lead records.
 */
function loadLeads() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn('[Storage] Error loading leads:', error.message);
    return [];
  }
}

/**
 * Deletes a lead record by UUID.
 */
function deleteLead(id) {
  try {
    const leads = loadLeads().filter(lead => lead.id !== id);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch (error) {
    console.warn('[Storage] Error deleting lead:', error.message);
  }
}

/**
 * Clears all leads.
 */
function clearLeads() {
  localStorage.removeItem(STORAGE_KEYS.LEADS);
}
