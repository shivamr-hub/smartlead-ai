/* ============================================================
   app.js — SmartLead AI
   Sprint 1/2: Orchestrator & Bootstraper
   
   This file initializes the page components, binds navigation click
   handlers, tracks current wizard state, and renders lead pipeline items.
============================================================ */

// In-memory data states
let currentStepIndex = 0;
const userAnswers = {};
let allLeads = [];
let activeFilter = 'all';

/**
 * Bootstraps the application on page load.
 */
function init() {
  // 1. Load existing lead records from localStorage
  allLeads = loadLeads();

  // 2. Render summary analytics and leads list
  renderInsights(allLeads);
  renderDashboard(allLeads, activeFilter);

  // 3. Render the first step of the wizard
  _displayCurrentStep();

  // 4. Bind event listeners
  _bindEvents();
}

/**
 * Displays current question state and updates live progress meters.
 */
function _displayCurrentStep() {
  const questions = LEAD_CONFIG.questions;
  const currentQuestion = questions[currentStepIndex];

  // Render question UI
  renderStep(
    currentQuestion,
    currentStepIndex,
    questions.length,
    userAnswers,
    (key, val) => _handleAnswerChange(key, val)
  );

  // Recalculate and update completeness confidence
  const completedFieldsCount = Object.keys(userAnswers).filter(k => !isEmpty(userAnswers[k])).length;
  const completenessPercent = Math.round((completedFieldsCount / questions.length) * 100);
  updateCompletenessMeter(completenessPercent);

  // Recalculate and update live quality meter
  const currentScore = LeadEngine.calculateScore(userAnswers);
  updateLiveMeter(currentScore);
}

/**
 * Handles live input changes and answers collection.
 */
function _handleAnswerChange(key, val) {
  userAnswers[key] = val;

  // Re-run meters live updates
  const questions = LEAD_CONFIG.questions;
  const completedFieldsCount = Object.keys(userAnswers).filter(k => !isEmpty(userAnswers[k])).length;
  const completenessPercent = Math.round((completedFieldsCount / questions.length) * 100);
  updateCompletenessMeter(completenessPercent);

  const currentScore = LeadEngine.calculateScore(userAnswers);
  updateLiveMeter(currentScore);
}

/**
 * Transitions to next step or submits the lead.
 */
function _handleNextStep() {
  const questions = LEAD_CONFIG.questions;
  const currentQuestion = questions[currentStepIndex];
  const currentVal = userAnswers[currentQuestion.id] || '';

  // Validation Check: Name & Contact details cannot be empty or invalid
  if (currentQuestion.type === 'text' && isEmpty(currentVal)) {
    showStatusMessage("Please fill in your name before continuing.", "error");
    return;
  }
  if (currentQuestion.type === 'email' && !isValidEmail(currentVal)) {
    showStatusMessage("Please enter a valid email address.", "error");
    return;
  }
  if (currentQuestion.type === 'phone' && !isValidPhone(currentVal)) {
    showStatusMessage("Please enter a valid 10-digit mobile number.", "error");
    return;
  }

  // Submit Lead
  if (currentStepIndex === questions.length - 1) {
    _submitLeadForm();
    return;
  }

  // Advance step
  currentStepIndex++;
  _displayCurrentStep();
}

/**
 * Goes back to the previous step.
 */
function _handlePrevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    _displayCurrentStep();
  }
}

/**
 * Final Submission: scores lead, saves record, resets form, updates board.
 */
function _submitLeadForm() {
  const finalScore = LeadEngine.calculateScore(userAnswers);
  const leadCategory = LeadEngine.classifyLead(finalScore);

  // Create lead record with details
  const newLead = {
    id: generateUUID(),
    createdAt: new Date().toISOString(),
    name: capitalize(userAnswers.name),
    email: userAnswers.email.trim().toLowerCase(),
    phone: userAnswers.phone.trim(),
    answers: { ...userAnswers },
    score: finalScore,
    category: leadCategory,
    source: "Website",
    notes: `Challenge: ${userAnswers.challenge || 'N/A'}`
  };

  // Persist to storage
  saveLead(newLead);

  // Update in-memory list
  allLeads.push(newLead);

  // Render premium Success Card state in the Wizard
  renderSuccess(finalScore, leadCategory, _resetWizard);

  // Reload dashboards
  renderInsights(allLeads);
  renderDashboard(allLeads, activeFilter);
}

/**
 * Resets wizard form to default.
 */
function _resetWizard() {
  currentStepIndex = 0;
  // Clear answers keys
  Object.keys(userAnswers).forEach(key => delete userAnswers[key]);

  _displayCurrentStep();
}

/**
 * Triggers CSV file download.
 */
function _triggerCSVDownload() {
  if (allLeads.length === 0) return;

  // Prepend UTF-8 Byte Order Mark (BOM) to ensure Excel opens file with Jose/Shivam names cleanly
  const csvContent = "\uFEFF" + convertToCSV(allLeads);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `smartlead_export_${new Date().toISOString().slice(0,10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Binds DOM triggers.
 */
function _bindEvents() {
  // Navigation
  document.getElementById('btn-next').addEventListener('click', _handleNextStep);
  document.getElementById('btn-prev').addEventListener('click', _handlePrevStep);

  // Filters pills
  document.querySelectorAll('.filter-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeFilter = pill.dataset.filter;
      renderDashboard(allLeads, activeFilter);
    });
  });

  // CSV Exporter
  DOM.btnExport.addEventListener('click', _triggerCSVDownload);
}

// Bootstrap
document.addEventListener('DOMContentLoaded', init);
