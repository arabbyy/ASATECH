
/**
 * Fraud alert service.
 *
 * Fetches fraud alerts from the backend API.
 * Risk scores are computed server-side; frontend displays only.
 */
import { client } from "./client";
import { isApiConfigured } from "./config";
import { FRAUD_ALERTS, getFraudAlertById } from "../data/mock";

/**
 * List fraud alerts with optional filtering.
 * @param {object} params - { status, severity, search }
 * @returns {Promise<Array>}
 */
export async function listFraudAlerts(params = {}) {
  if (isApiConfigured()) {
    const res = await client.get("/fraud/alerts", params);
    return Array.isArray(res) ? res : res?.data ?? [];
  }
  return FRAUD_ALERTS;
}

/**
 * Get fraud alert details.
 * @param {string} id - Alert ID
 * @returns {Promise<object|null>}
 */
export async function getFraudAlert(id) {
  if (isApiConfigured()) {
    return client.get(`/fraud/alerts/${id}`);
  }
  return getFraudAlertById(id) || null;
}

/**
 * Update fraud alert status.
 * @param {string} id - Alert ID
 * @param {object} patch - { status }
 * @returns {Promise<object>}
 */
export async function updateFraudAlert(id, patch) {
  if (isApiConfigured()) {
    return client.patch(`/fraud/alerts/${id}`, patch);
  }
  return { id, ...patch };
}