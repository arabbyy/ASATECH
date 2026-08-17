/**
 * Product catalogue service.
 *
 * Fetches product data from the backend API.
 * Falls back to static data if API is not configured (development only).
 */
import { client } from "./client";
import { isApiConfigured } from "./config";
import { PRODUCTS, getRelatedProducts, getFeaturedProducts } from "../data/products";

/**
 * List products with optional filtering and pagination.
 * @param {object} params - { search, category, minPrice, maxPrice, inStock, sort, page, limit }
 * @returns {Promise<Array>}
 */
export async function listProducts(params = {}) {
  if (isApiConfigured()) {
    return client.get("/products", params);
  }
  // Fallback to static data for development
  let list = PRODUCTS;
  if (params.category && params.category !== "all") {
    list = list.filter((p) => p.category === params.category);
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  return list;
}

/**
 * Get product details by slug or ID.
 * @param {string} slugOrId - Product slug or ID
 * @returns {Promise<object|null>}
 */
export async function getProduct(slugOrId) {
  if (isApiConfigured()) {
    return client.get(`/products/${slugOrId}`);
  }
  // Fallback to static data
  return PRODUCTS.find((p) => p.id === slugOrId || p.slug === slugOrId) || null;
}

/**
 * Get related products.
 * @param {string} slugOrId - Product slug or ID
 * @param {number} limit - Number of related products
 * @returns {Promise<Array>}
 */
export async function getRelated(slugOrId, limit = 4) {
  const product = await getProduct(slugOrId);
  if (!product) return [];
  return getRelatedProducts(product, limit);
}

/**
 * Get featured products.
 * @param {number} limit - Number of products
 * @returns {Promise<Array>}
 */
export async function getFeatured(limit = 8) {
  if (isApiConfigured()) {
    return client.get("/products/featured");
  }
  return getFeaturedProducts(limit);
}
