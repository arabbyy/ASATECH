/**
 * Admin service for operational data.
 *
 * Handles admin-only operations: customers, audit logs, analytics, product management.
 */
import { client } from "./client";
import { isApiConfigured } from "./config";
import { CUSTOMERS, AUDIT_LOGS, ANALYTICS, getCustomerById } from "../data/mock";

/**
 * List customers.
 * @param {object} params - { search, status }
 * @returns {Promise<Array>}
 */
export async function listCustomers(params = {}) {
  if (isApiConfigured()) {
    const res = await client.get("/admin/customers", params);
    return Array.isArray(res) ? res : res?.data ?? [];
  }
  return CUSTOMERS;
}

/**
 * Get customer details.
 * @param {string} id - Customer ID
 * @returns {Promise<object|null>}
 */
export async function getCustomer(id) {
  if (isApiConfigured()) {
    return client.get(`/admin/customers/${id}`);
  }
  return getCustomerById(id) || null;
}

/**
 * List audit logs.
 * @param {object} params - { action, actor, search }
 * @returns {Promise<Array>}
 */
export async function listAuditLogs(params = {}) {
  if (isApiConfigured()) {
    const res = await client.get("/admin/audit-logs", params);
    return Array.isArray(res) ? res : res?.data ?? [];
  }
  return AUDIT_LOGS;
}

/**
 * Get dashboard analytics.
 * @returns {Promise<object>}
 */
export async function getAnalytics() {
  if (isApiConfigured()) {
    return client.get("/admin/analytics");
  }
  return ANALYTICS;
}

/**
 * Create a product.
 * @param {object} product - Product data
 * @returns {Promise<object>}
 */
export async function createProduct(product) {
  return client.post("/admin/products", product);
}

/**
 * Update a product.
 * @param {string} id - Product ID
 * @param {object} patch - Fields to update
 * @returns {Promise<object>}
 */
export async function updateProduct(id, patch) {
  return client.patch(`/admin/products/${id}`, patch);
}

/**
 * Delete a product.
 * @param {string} id - Product ID
 * @returns {Promise<{ok: boolean}>}
 */
export async function deleteProduct(id) {
  return client.delete(`/admin/products/${id}`);
}

/**
 * Adjust product stock.
 * @param {string} id - Product ID
 * @param {number} quantity - New stock quantity
 * @returns {Promise<object>}
 */
export async function adjustStock(id, quantity) {
  return updateProduct(id, { stock: Math.max(0, quantity) });
}