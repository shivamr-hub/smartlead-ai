/* ============================================================
   lead-engine.js — SmartLead AI
   Sprint 1/2: Scorer & Engine
   
   This class drives lead scoring logic and classifies leads.
============================================================ */

class LeadEngine {

  /**
   * Calculates lead score based on current questions answers.
   * 
   * Criteria:
   * - Budget (max 40)
   * - Timeline (max 30)
   * - Business Challenge Need (max 20)
   * - Contact Details Completed (max 10)
   * 
   * @param {Object} answers - Current user options selected
   * @returns {number} - 0 to 100 calculated score
   */
  static calculateScore(answers) {
    let score = 0;

    // 1. Budget Scorer
    const budgetVal = answers.budget;
    if (budgetVal) {
      score += LEAD_CONFIG.scoring.budget[budgetVal] || 0;
    }

    // 2. Timeline Scorer
    const timelineVal = answers.timeline;
    if (timelineVal) {
      score += LEAD_CONFIG.scoring.timeline[timelineVal] || 0;
    }

    // 3. Challenge Scorer
    const challengeVal = answers.challenge;
    if (challengeVal) {
      score += LEAD_CONFIG.scoring.challenge[challengeVal] || 0;
    }

    // 4. Contact Completion (10 points if both email and phone provided)
    if (answers.email && answers.phone) {
      score += LEAD_CONFIG.scoring.contactComplete;
    }

    return score;
  }

  /**
   * Classifies lead based on thresholds.
   * 
   * @param {number} score 
   * @returns {string} - 'HOT' | 'WARM' | 'COLD'
   */
  static classifyLead(score) {
    if (score >= LEAD_CONFIG.thresholds.hot) return 'HOT';
    if (score >= LEAD_CONFIG.thresholds.warm) return 'WARM';
    return 'COLD';
  }

}
