/**
 * Order and transaction service.
 *
 * Fetches order and transaction data from the backend API.
 */
import { client } from "./client";
import { isApiConfigured } from "./config";
import { ORDERS, TRANSACTIONS, getOrderByRef, getTransactionByRef } from "../data/mock";

/**
 * List orders with optional filtering.
 * @param {object} params - { customerId, status, search }
 * @returns {Promise<Array>}
 */
export async function listOrders(params = {}) {
  if (isApiConfigured()) {
    return client.get("/orders", params);
  }
  // Fallback to static data
  let list = ORDERS;
  if (params.customerId) list = list.filter((o) => o.customerId === params.customerId);
  return list;
}

/**
 * Get order details by reference or ID.
 * @param {string} refOrId - Order reference or ID
 * @returns {Promise<object|null>}
 */
export async function getOrder(refOrId) {
  if (isApiConfigured()) {
    return client.get(`/orders/${refOrId}`);
  }
  return getOrderByRef(refOrId) || null;
}

/**
 * List transactions with optional filtering.
 * @param {object} params - { customerId, status, search }
 * @returns {Promise<Array>}
 */
export async function listTransactions(params = {}) {
  if (isApiConfigured()) {
    return client.get("/transactions", params);
  }
  let list = TRANSACTIONS;
  if (params.customerId) list = list.filter((t) => t.customerId === params.customerId);
  return list;
}

/**
 * Get transaction details by reference.
 * @param {string} ref - Transaction reference
 * @returns {Promise<object|null>}
 */
export async function getTransaction(ref) {
  if (isApiConfigured()) {
    return client.get(`/transactions/${ref}`);
  }
  return getTransactionByRef(ref) || null;
}
