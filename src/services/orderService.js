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
    const res = await client.get("/orders", params);
    return Array.isArray(res) ? res : res?.data ?? [];
  }
  // existing mock fallback...
  let list = ORDERS;
  if (params.customerId) list = list.filter((o) => o.customerId === params.customerId);
  return list;
}

export async function listTransactions(params = {}) {
  if (isApiConfigured()) {
    const res = await client.get("/transactions", params);
    return Array.isArray(res) ? res : res?.data ?? [];
  }
  // existing mock fallback...
  let list = TRANSACTIONS;
  if (params.customerId) list = list.filter((t) => t.customerId === params.customerId);
  return list;
}

export async function getOrder(refOrId) {
  if (isApiConfigured()) {
    return client.get(`/orders/${refOrId}`);
  }
  return getOrderByRef(refOrId) || null;
}

export async function getTransaction(ref) {
  if (isApiConfigured()) {
    return client.get(`/transactions/${ref}`);
  }
  return getTransactionByRef(ref) || null;
}