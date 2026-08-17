/**
 * DEMONSTRATION DATA.
 *
 * This file contains sample data for demonstrating the admin console and
 * customer account interfaces. In production, all data must be fetched from
 * the backend API via the service layer.
 *
 * TODO: Remove this file after backend integration is complete. Update all
 * service modules to fetch real data from the API.
 */

import { PRODUCTS, getProductById } from "./products";

const iso = (s) => new Date(s).toISOString();

export const CURRENT_USER = {
  id: "usr-100",
  name: "Adaeze Okafor",
  email: "adaeze@example.com",
  phone: "+234 801 234 5678",
  role: "customer",
  avatarColor: "#2563eb",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      line1: "14 Admiralty Way",
      city: "Lekki, Lagos",
      state: "Lagos",
      phone: "+234 801 234 5678",
      default: true,
    },
    {
      id: "addr-2",
      label: "Office",
      line1: "3B Adeola Odeku Street",
      city: "Victoria Island",
      state: "Lagos",
      phone: "+234 801 234 5678",
      default: false,
    },
  ],
};

export const ADMIN_USER = {
  id: "usr-admin-01",
  name: "Chidi Nwosu",
  email: "admin@asatech.ng",
  role: "admin",
};

const customerNames = [
  "Adaeze Okafor",
  "Tunde Bakare",
  "Ngozi Eze",
  "Kwame Mensah",
  "Amina Bello",
  "Oluwaseun Adeyemi",
  "Fatima Ibrahim",
  "Chinedu Obi",
  "Zainab Lawal",
  "Emeka Nwankwo",
];

export const CUSTOMERS = customerNames.map((name, i) => ({
  id: `usr-${100 + i}`,
  name,
  email: `${name.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
  phone: `+234 80${String(1000000 + i * 12345).slice(0, 7)}`,
  joined: iso(`2025-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`),
  orders: (i * 3) % 14 + 1,
  totalSpent: 180000 + i * 97500,
  status: i % 7 === 0 ? "flagged" : "active",
}));

const orderSeed = [
  { status: "delivered", pay: "paid", risk: 12, itemIds: ["p-1001", "p-6001"], qty: [1, 2] },
  { status: "shipped", pay: "paid", risk: 18, itemIds: ["p-2001"], qty: [1] },
  { status: "processing", pay: "paid", risk: 24, itemIds: ["p-5003", "p-6002"], qty: [2, 1] },
  { status: "confirmed", pay: "paid", risk: 34, itemIds: ["p-4001"], qty: [1] },
  { status: "pending", pay: "pending", risk: 68, itemIds: ["p-1005"], qty: [1] },
  { status: "cancelled", pay: "refunded", risk: 22, itemIds: ["p-2005"], qty: [1] },
  { status: "delivered", pay: "paid", risk: 9, itemIds: ["p-3001", "p-6003"], qty: [1, 1] },
  { status: "shipped", pay: "paid", risk: 15, itemIds: ["p-5001"], qty: [1] },
  { status: "processing", pay: "paid", risk: 31, itemIds: ["p-7002"], qty: [1] },
  { status: "pending", pay: "pending", risk: 77, itemIds: ["p-2003", "p-2001"], qty: [1, 1] },
  { status: "delivered", pay: "paid", risk: 11, itemIds: ["p-1003"], qty: [1] },
  { status: "cancelled", pay: "failed", risk: 63, itemIds: ["p-4002"], qty: [1] },
];

export const ORDERS = orderSeed.map((seed, i) => {
  // In demo mode the first customer (the signed-in user) owns the even-indexed
  // orders so their account area has a realistic amount of history.
  const custIndex = i % 2 === 0 ? 0 : i % CUSTOMERS.length;
  const items = seed.itemIds.map((id, j) => {
    const p = getProductById(id);
    return {
      productId: p.id,
      name: p.name,
      image: p.images[0],
      price: p.price,
      quantity: seed.qty[j],
    };
  });
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  return {
    id: `ord-${1000 + i}`,
    ref: `AST-${(1000 + i).toString(36).toUpperCase()}${(i + 3).toString(36).toUpperCase()}`,
    customerId: CUSTOMERS[custIndex].id,
    customerName: CUSTOMERS[custIndex].name,
    date: iso(`2026-01-${String((i % 27) + 1).padStart(2, "0")}T${String(9 + (i % 9)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00`),
    items,
    subtotal: total,
    shipping: 2500,
    total: total + 2500,
    paymentStatus: seed.pay,
    orderStatus: seed.status,
    riskScore: seed.risk,
    riskLevel: seed.risk < 30 ? "low" : seed.risk < 60 ? "medium" : "high",
    paymentRef: `PSK-${(100000 + i * 1111).toString(36).toUpperCase()}`,
    shippingAddress: {
      name: CUSTOMERS[i % CUSTOMERS.length].name,
      line1: "14 Admiralty Way",
      city: "Lekki, Lagos",
      state: "Lagos",
      phone: "+234 801 234 5678",
    },
    timeline: [
      { step: "placed", at: iso(`2026-01-${String((i % 27) + 1).padStart(2, "0")}T09:00:00`), done: true },
      { step: "paid", at: seed.pay === "paid" ? iso(`2026-01-${String((i % 27) + 1).padStart(2, "0")}T09:02:00`) : null, done: seed.pay === "paid" },
      { step: "processing", at: seed.status !== "pending" && seed.status !== "cancelled" ? iso(`2026-01-${String((i % 27) + 1).padStart(2, "0")}T14:00:00`) : null, done: ["processing", "confirmed", "shipped", "delivered"].includes(seed.status) },
      { step: "shipped", at: ["shipped", "delivered"].includes(seed.status) ? iso(`2026-01-${String((i % 27) + 2).padStart(2, "0")}T10:00:00`) : null, done: ["shipped", "delivered"].includes(seed.status) },
      { step: "delivered", at: seed.status === "delivered" ? iso(`2026-01-${String((i % 27) + 4).padStart(2, "0")}T16:00:00`) : null, done: seed.status === "delivered" },
    ],
  };
});

const txStatus = ["successful", "successful", "successful", "failed", "pending", "successful", "successful", "failed", "pending", "successful", "successful", "successful", "failed", "successful", "pending"];
export const TRANSACTIONS = ORDERS.map((o, i) => ({
  id: `txn-${2000 + i}`,
  reference: o.paymentRef,
  orderRef: o.ref,
  orderId: o.id,
  customerId: o.customerId,
  customerName: o.customerName,
  date: o.date,
  amount: o.total,
  status: txStatus[i % txStatus.length],
  channel: ["card", "card", "bank", "card", "ussd"][i % 5],
  riskScore: o.riskScore,
  riskLevel: o.riskLevel,
  method: "Paystack",
}));

export const FRAUD_ALERTS = [
  { id: "fa-01", severity: "high", riskScore: 77, txnRef: "PSK-1A2B3C", orderRef: "AST-10A5", customerName: "Oluwaseun Adeyemi", createdAt: iso("2026-02-03T11:20:00"), status: "new", amount: 4250000, factors: ["High-value purchase", "New or unrecognized device", "Multiple purchases in a short period"] },
  { id: "fa-02", severity: "high", riskScore: 68, txnRef: "PSK-9X8Y7Z", orderRef: "AST-11B6", customerName: "Tunde Bakare", createdAt: iso("2026-02-03T10:05:00"), status: "under-review", amount: 1850000, factors: ["High-value purchase", "Unusual purchasing behaviour"] },
  { id: "fa-03", severity: "medium", riskScore: 51, txnRef: "PSK-4G5H6I", orderRef: "AST-12C7", customerName: "Fatima Ibrahim", createdAt: iso("2026-02-02T18:42:00"), status: "under-review", amount: 560000, factors: ["Multiple failed login attempts", "New or unrecognized device"] },
  { id: "fa-04", severity: "medium", riskScore: 44, txnRef: "PSK-7J8K9L", orderRef: "AST-13D8", customerName: "Ngozi Eze", createdAt: iso("2026-02-02T14:30:00"), status: "approved", amount: 740000, factors: ["Multiple purchases in a short period"] },
  { id: "fa-05", severity: "high", riskScore: 63, txnRef: "PSK-3M4N5O", orderRef: "AST-14E9", customerName: "Chinedu Obi", createdAt: iso("2026-02-01T09:15:00"), status: "rejected", amount: 980000, factors: ["Multiple failed login attempts", "Other suspicious activity"] },
  { id: "fa-06", severity: "medium", riskScore: 39, txnRef: "PSK-6P7Q8R", orderRef: "AST-15F1", customerName: "Amina Bello", createdAt: iso("2026-01-31T16:50:00"), status: "resolved", amount: 285000, factors: ["New or unrecognized device"] },
  { id: "fa-07", severity: "high", riskScore: 81, txnRef: "PSK-2S3T4U", orderRef: "AST-16G2", customerName: "Kwame Mensah", createdAt: iso("2026-01-31T08:40:00"), status: "new", amount: 3200000, factors: ["High-value purchase", "Multiple purchases in a short period", "Other suspicious activity"] },
  { id: "fa-08", severity: "medium", riskScore: 47, txnRef: "PSK-5V6W7X", orderRef: "AST-17H3", customerName: "Zainab Lawal", createdAt: iso("2026-01-30T12:10:00"), status: "resolved", amount: 420000, factors: ["Unusual purchasing behaviour"] },
];

export const AUDIT_LOGS = [
  { id: "al-01", timestamp: iso("2026-02-04T09:12:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Order status updated", resource: "AST-10A5", status: "success", detail: "Changed order status from processing to shipped" },
  { id: "al-02", timestamp: iso("2026-02-04T09:05:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Fraud alert reviewed", resource: "FA-01", status: "success", detail: "Alert moved to under review" },
  { id: "al-03", timestamp: iso("2026-02-03T22:18:00"), actor: "System", actorRole: "system", action: "Payment verified", resource: "PSK-1A2B3C", status: "success", detail: "Transaction verified by Paystack" },
  { id: "al-04", timestamp: iso("2026-02-03T21:44:00"), actor: "Adaeze Okafor", actorRole: "customer", action: "Login", resource: "session", status: "success", detail: "Signed in from a new device" },
  { id: "al-05", timestamp: iso("2026-02-03T20:02:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Product updated", resource: "p-1001", status: "success", detail: "Updated stock quantity" },
  { id: "al-06", timestamp: iso("2026-02-03T18:30:00"), actor: "System", actorRole: "system", action: "Risk assessment", resource: "AST-12C7", status: "success", detail: "Risk score computed (medium)" },
  { id: "al-07", timestamp: iso("2026-02-03T16:11:00"), actor: "Tunde Bakare", actorRole: "customer", action: "Login failed", resource: "session", status: "failed", detail: "3 consecutive failed attempts" },
  { id: "al-08", timestamp: iso("2026-02-03T15:47:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Product created", resource: "p-7003", status: "success", detail: "Added new product to catalogue" },
  { id: "al-09", timestamp: iso("2026-02-03T13:22:00"), actor: "System", actorRole: "system", action: "Refund processed", resource: "AST-13D8", status: "success", detail: "Refund initiated for cancelled order" },
  { id: "al-10", timestamp: iso("2026-02-03T11:05:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Inventory adjusted", resource: "p-2005", status: "success", detail: "Marked as out of stock" },
  { id: "al-11", timestamp: iso("2026-02-02T19:58:00"), actor: "Ngozi Eze", actorRole: "customer", action: "Order placed", resource: "AST-14E9", status: "success", detail: "Checkout completed" },
  { id: "al-12", timestamp: iso("2026-02-02T17:40:00"), actor: "System", actorRole: "system", action: "Fraud alert raised", resource: "FA-07", status: "success", detail: "High-risk transaction flagged" },
  { id: "al-13", timestamp: iso("2026-02-02T12:15:00"), actor: "Chidi Nwosu", actorRole: "admin", action: "Customer viewed", resource: "usr-104", status: "success", detail: "Opened customer profile" },
  { id: "al-14", timestamp: iso("2026-02-02T10:30:00"), actor: "System", actorRole: "system", action: "Report generated", resource: "reports", status: "success", detail: "Weekly sales summary exported" },
  { id: "al-15", timestamp: iso("2026-02-01T23:12:00"), actor: "Adaeze Okafor", actorRole: "customer", action: "Password changed", resource: "account", status: "success", detail: "Security setting updated" },
];

export const CUSTOMER_NOTIFICATIONS = [
  { id: "n-01", title: "Order shipped", body: "Your order AST-10A5 has been shipped and is on its way.", type: "order", read: false, at: iso("2026-02-04T09:12:00") },
  { id: "n-02", title: "Payment confirmed", body: "Payment for order AST-10A5 was verified successfully.", type: "payment", read: false, at: iso("2026-02-03T22:18:00") },
  { id: "n-03", title: "Price drop", body: "Aura ANC Over-Ear is now on sale at a new lower price.", type: "promo", read: true, at: iso("2026-02-02T10:00:00") },
  { id: "n-04", title: "New login", body: "A new sign-in was detected on a Windows device in Lagos.", type: "security", read: true, at: iso("2026-02-01T08:30:00") },
  { id: "n-05", title: "Order delivered", body: "Your order AST-08C2 was delivered. Enjoy your new gadget!", type: "order", read: true, at: iso("2026-01-29T16:00:00") },
  { id: "n-06", title: "Cart reminder", body: "You left items in your cart. Complete your order before they sell out.", type: "promo", read: true, at: iso("2026-01-28T12:00:00") },
];

export const SESSIONS = [
  { id: "s-01", device: "Chrome on Windows", location: "Lagos, NG", ip: "102.89.xx.xx", current: true, lastActive: iso("2026-02-04T10:00:00") },
  { id: "s-02", device: "Safari on iPhone", location: "Lagos, NG", ip: "197.210.xx.xx", current: false, lastActive: iso("2026-02-03T18:22:00") },
  { id: "s-03", device: "Chrome on Android", location: "Abuja, NG", ip: "105.112.xx.xx", current: false, lastActive: iso("2026-01-30T09:15:00") },
];

export const PAYMENT_METHODS = [
  { id: "pm-01", type: "card", brand: "Visa", last4: "4242", expiry: "09/27", holder: "Adaeze Okafor", default: true },
  { id: "pm-02", type: "card", brand: "Mastercard", last4: "8210", expiry: "02/26", holder: "Adaeze Okafor", default: false },
];

export const LOGIN_ACTIVITY = [
  { id: "la-01", at: iso("2026-02-04T09:12:00"), device: "Chrome on Windows", location: "Lagos, NG", status: "success" },
  { id: "la-02", at: iso("2026-02-03T18:22:00"), device: "Safari on iPhone", location: "Lagos, NG", status: "success" },
  { id: "la-03", at: iso("2026-02-03T16:11:00"), device: "Unknown device", location: "Unknown", status: "failed" },
  { id: "la-04", at: iso("2026-01-30T09:15:00"), device: "Chrome on Android", location: "Abuja, NG", status: "success" },
];

/** Analytics series for admin dashboard charts (illustrative). */
export const ANALYTICS = {
  revenueSeries: [
    { label: "Aug", value: 12.4 },
    { label: "Sep", value: 14.1 },
    { label: "Oct", value: 13.6 },
    { label: "Nov", value: 16.8 },
    { label: "Dec", value: 19.2 },
    { label: "Jan", value: 21.5 },
  ],
  transactionsSeries: [
    { label: "Aug", value: 210 },
    { label: "Sep", value: 246 },
    { label: "Oct", value: 232 },
    { label: "Nov", value: 288 },
    { label: "Dec", value: 342 },
    { label: "Jan", value: 371 },
  ],
  riskDistribution: [
    { label: "Low", value: 78, color: "#10b981" },
    { label: "Medium", value: 16, color: "#f59e0b" },
    { label: "High", value: 6, color: "#ef4444" },
  ],
  categorySales: [
    { label: "Smartphones", value: 42 },
    { label: "Laptops", value: 26 },
    { label: "Audio", value: 14 },
    { label: "Wearables", value: 9 },
    { label: "Other", value: 9 },
  ],
};

export function getOrderByRef(ref) {
  return ORDERS.find((o) => o.ref === ref) || ORDERS.find((o) => o.id === ref) || null;
}

export function getTransactionByRef(ref) {
  return TRANSACTIONS.find((t) => t.reference === ref) || null;
}

export function getFraudAlertById(id) {
  return FRAUD_ALERTS.find((a) => a.id === id) || null;
}

export function getCustomerById(id) {
  return CUSTOMERS.find((c) => c.id === id) || null;
}

export function getProductByName(name) {
  return PRODUCTS.find((p) => p.name === name) || null;
}
