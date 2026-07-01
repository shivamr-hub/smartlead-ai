/* ============================================================
   ui.js — SmartLead AI
   Sprint 1: UI & Presentation Driver
   
   This file manages DOM updates, wizard transitions, live meter
   animations, and rendering list items / summary cards.
============================================================ */

// Cache DOM references
const DOM = {
  qualityBadge   : document.getElementById('quality-badge'),
  qualityFill    : document.getElementById('quality-fill'),
  qualityValue   : document.getElementById('quality-value'),
  confidenceFill : document.getElementById('confidence-fill'),
  confidenceValue: document.getElementById('confidence-value'),
  stepIntro      : document.getElementById('step-intro'),
  stepIndicator  : document.getElementById('step-indicator'),
  stepContent    : document.getElementById('step-content'),
  btnPrev        : document.getElementById('btn-prev'),
  btnNext        : document.getElementById('btn-next'),
  leadsList      : document.getElementById('leads-list'),
  emptyState     : document.getElementById('dashboard-empty-state'),
  totalLeads     : document.getElementById('insight-total'),
  hotLeads       : document.getElementById('insight-hot'),
  avgScore       : document.getElementById('insight-avg'),
  convReady      : document.getElementById('insight-ready'),
  btnExport      : document.getElementById('btn-export')
};

/**
 * Renders a questionnaire step in the wizard card.
 * 
 * @param {Object} question - Question schema from lead-config.js
 * @param {number} index    - Current question index (0-based)
 * @param {number} total    - Total number of questions
 * @param {Object} answers  - Currently selected answers object
 * @param {Function} onSelect - Callback when an option is selected/input changes
 */
function renderStep(question, index, total, answers, onSelect) {
  // Update step indicators
  DOM.stepIndicator.textContent = `Question ${index + 1} of ${total}`;
  DOM.stepIndicator.style.display = 'inline';
  DOM.stepIntro.textContent = index === 0 ? "Let's start with your details." : "Tell us about your project.";

  // Set navigation buttons state
  DOM.btnPrev.disabled = index === 0;
  DOM.btnPrev.style.display = 'inline-flex';
  DOM.btnNext.style.display = 'inline-flex';
  DOM.btnNext.textContent = index === total - 1 ? "Calculate Lead Score ✓" : "Continue →";

  // Clear previous step content
  DOM.stepContent.innerHTML = '';

  const currentValue = answers[question.id] || '';

  // Generate input HTML depending on question type
  let html = `<h2 class="question-label animate-fade">${question.label}</h2>`;

  if (question.type === 'text' || question.type === 'email' || question.type === 'phone') {
    const inputType = question.type === 'phone' ? 'tel' : question.type;
    html += `
      <div class="input-wrapper animate-fade">
        <input 
          type="${inputType}" 
          id="wizard-input" 
          value="${currentValue}" 
          placeholder="${question.placeholder || ''}" 
          class="form-input" 
          autocomplete="off"
        />
      </div>
    `;
    DOM.stepContent.innerHTML = html;

    // Attach input event
    const inputEl = document.getElementById('wizard-input');
    inputEl.focus();
    inputEl.addEventListener('input', (e) => onSelect(question.id, e.target.value));
  } 
  
  else if (question.type === 'select') {
    html += `<div class="select-wrapper animate-fade">`;
    question.options.forEach(opt => {
      const isSelected = currentValue === opt.value;
      html += `
        <button class="option-btn ${isSelected ? 'selected' : ''}" data-value="${opt.value}">
          <span class="option-bullet"></span>
          <span>${opt.label}</span>
        </button>
      `;
    });
    html += `</div>`;
    DOM.stepContent.innerHTML = html;

    // Attach click events to options
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle selected styling visually
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        onSelect(question.id, btn.dataset.value);
      });
    });
  }
}

/**
 * Updates the Live Lead Quality Meter & Badge.
 * 
 * @param {number} score - Current quality score (0-100)
 */
function updateLiveMeter(score) {
  DOM.qualityValue.textContent = `${score}%`;
  DOM.qualityFill.style.width = `${score}%`;

  // Update classes and labels based on score
  DOM.qualityBadge.className = 'metric-badge';
  DOM.qualityFill.className = 'meter-bar-fill';

  if (score >= LEAD_CONFIG.thresholds.hot) {
    DOM.qualityBadge.classList.add('status-hot');
    DOM.qualityBadge.textContent = '🟢 HOT';
    DOM.qualityFill.classList.add('progress-hot');
  } else if (score >= LEAD_CONFIG.thresholds.warm) {
    DOM.qualityBadge.classList.add('status-warm');
    DOM.qualityBadge.textContent = '🔵 WARM';
    DOM.qualityFill.classList.add('progress-warm');
  } else {
    DOM.qualityBadge.classList.add('status-cold');
    DOM.qualityBadge.textContent = '⚪ COLD';
    DOM.qualityFill.classList.add('progress-cold');
  }
}

/**
 * Updates the completeness meter.
 * 
 * @param {number} percentage - Percentage of fields completed (0-100)
 */
function updateCompletenessMeter(percentage) {
  DOM.confidenceValue.textContent = `${percentage}%`;
  DOM.confidenceFill.style.width = `${percentage}%`;
}

/**
 * Renders the leads dashboard records.
 * 
 * @param {Array} leads - Leads list
 * @param {string} filter - 'all' | 'hot' | 'warm' | 'cold'
 */
function renderDashboard(leads, filter = 'all') {
  // Apply filtering
  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return lead.category.toLowerCase() === filter;
  });

  // Toggle empty state vs list
  if (filteredLeads.length === 0) {
    DOM.emptyState.classList.remove('hide');
    DOM.leadsList.classList.add('hide');
    return;
  }

  DOM.emptyState.classList.add('hide');
  DOM.leadsList.classList.remove('hide');

  DOM.leadsList.innerHTML = '';

  // Render items
  filteredLeads.forEach(lead => {
    let dot = '⚪';
    if (lead.category === 'HOT') dot = '🟢';
    else if (lead.category === 'WARM') dot = '🔵';

    const dateStr = new Date(lead.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });

    const html = `
      <div class="lead-item animate-fade" id="lead-${lead.id}">
        <div class="lead-item-left">
          <span class="lead-status-dot">${dot}</span>
          <div class="lead-info">
            <span class="lead-name">${lead.name}</span>
            <span class="lead-meta">${lead.email} | ${lead.phone}</span>
          </div>
        </div>
        <div class="lead-item-right">
          <span class="lead-score">${lead.score}%</span>
          <span class="lead-date">${dateStr}</span>
        </div>
      </div>
    `;
    DOM.leadsList.insertAdjacentHTML('beforeend', html);
  });
}

/**
 * Renders summary analytical cards.
 */
function renderInsights(leads) {
  const total = leads.length;
  DOM.totalLeads.textContent = total;

  if (total === 0) {
    DOM.hotLeads.textContent = 0;
    DOM.avgScore.textContent = '0%';
    DOM.convReady.textContent = '0%';
    DOM.btnExport.disabled = true;
    return;
  }

  DOM.btnExport.disabled = false;

  const hotCount = leads.filter(l => l.category === 'HOT').length;
  const avg = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / total);
  
  // Ready conversion percentage: score >= 60
  const readyCount = leads.filter(l => l.score >= 60).length;
  const readyPercent = Math.round((readyCount / total) * 100);

  DOM.hotLeads.textContent = hotCount;
  DOM.avgScore.textContent = `${avg}%`;
  DOM.convReady.textContent = `${readyPercent}%`;
}

/**
 * Temporarily shows a validation or action message inside the wizard card.
 * 
 * @param {string} text - The message body
 * @param {string} type - 'error' | 'success' | 'info'
 */
function showStatusMessage(text, type = 'info') {
  const existing = document.getElementById('status-msg');
  if (existing) existing.remove();

  const html = `
    <div class="status-message status-${type} animate-fade" id="status-msg" style="margin-top: var(--space-md);">
      ${text}
    </div>
  `;

  DOM.stepContent.insertAdjacentHTML('beforeend', html);

  // Auto-clear message after 3.5 seconds
  setTimeout(() => {
    const el = document.getElementById('status-msg');
    if (el) el.remove();
  }, 3500);
}

/**
 * Renders the premium final success screen state inside the wizard panel.
 * 
 * @param {number} score - The final calculated lead score
 * @param {string} category - 'HOT' | 'WARM' | 'COLD'
 * @param {Function} onReset - Callback function when 'Start New Qualification' is clicked
 */
function renderSuccess(score, category, onReset) {
  // Hide default step indicator texts and prev/next wizard navigation
  DOM.stepIndicator.style.display = 'none';
  DOM.stepIntro.textContent = "Lead Qualification Completed";
  DOM.btnPrev.style.display = 'none';
  DOM.btnNext.style.display = 'none';

  let badgeColor = 'status-cold';
  let badgeIcon = '⚪';

  if (category === 'HOT') {
    badgeColor = 'status-hot';
    badgeIcon = '🟢';
  } else if (category === 'WARM') {
    badgeColor = 'status-warm';
    badgeIcon = '🔵';
  }

  // Inject success message layout card
  DOM.stepContent.innerHTML = `
    <div class="success-screen animate-fade" style="text-align: center; padding: var(--space-md) 0;">
      <div style="font-size: var(--text-3xl); margin-bottom: var(--space-sm);">🎉</div>
      <h2 class="question-label" style="margin-bottom: var(--space-xs);">Lead Successfully Qualified</h2>
      <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-md);">
        The lead has been added to your dashboard and is ready for follow-up.
      </p>

      <div style="background: rgba(15, 23, 42, 0.4); border: 1px solid var(--border); border-radius: var(--radius-md); padding: var(--space-md); margin-bottom: var(--space-lg); display: inline-block; min-width: 200px;">
        <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-xs);">LEAD SCORE</div>
        <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); margin-bottom: var(--space-xs);">${score}%</div>
        <span class="metric-badge ${badgeColor}" style="font-size: var(--text-xs);">${badgeIcon} ${category}</span>
      </div>

      <div>
        <button class="btn btn-primary" id="btn-reset-wizard">Start New Qualification</button>
      </div>
    </div>
  `;

  // Bind the reset action to wizard button
  document.getElementById('btn-reset-wizard').addEventListener('click', onReset);
}


