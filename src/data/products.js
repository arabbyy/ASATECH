/**
 * PRODUCT CATALOGUE DATA.
 *
 * This file contains the ASATECH product catalogue. In production, this data
 * should be loaded from the backend API via `catalogService`. The static data
 * here serves as a fallback for development and demonstration purposes.
 *
 * TODO: Replace with backend API integration by updating `catalogService.js`
 * to fetch from the live API endpoint.
 */

const IMG = {
  phone1: "/images/phone-1.jpg",
  phone2: "/images/phone-2.jpg",
  laptop1: "/images/laptop-1.jpg",
  laptop2: "/images/laptop-2.jpg",
  tablet: "/images/tablet-1.jpg",
  watch: "/images/watch-1.jpg",
  headphone: "/images/headphone-1.jpg",
  earbud: "/images/earbud-1.jpg",
  charger: "/images/charger-1.jpg",
  hero: "/images/hero.jpg",
  // Stock imagery used for additional catalogue variety.
  hpWhite: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  hpCase: "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  hpLifestyle: "https://images.pexels.com/photos/3756945/pexels-photo-3756945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  hpWhite2: "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  camInstant: "https://images.pexels.com/photos/16045125/pexels-photo-16045125.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  camPro: "https://images.pexels.com/photos/33037170/pexels-photo-33037170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  camRig: "https://images.pexels.com/photos/8981846/pexels-photo-8981846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  usb: "https://images.pexels.com/photos/18641665/pexels-photo-18641665.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  console: "https://images.pexels.com/photos/14005916/pexels-photo-14005916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  tabPhone: "https://images.pexels.com/photos/8622842/pexels-photo-8622842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  phoneMacro: "https://images.pexels.com/photos/10883732/pexels-photo-10883732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

const spec = (obj) => Object.entries(obj).map(([label, value]) => ({ label, value }));

export const PRODUCTS = [
  // ─── Smartphones ────────────────────────────────────────────────
  {
    id: "p-1001",
    slug: "aurora-x1-pro",
    name: "Aurora X1 Pro 5G",
    category: "smartphones",
    price: 1250000,
    previousPrice: 1400000,
    stock: 18,
    rating: 4.8,
    ratingCount: 214,
    badge: "Best Seller",
    featured: true,
    images: [IMG.phone1, IMG.phoneMacro],
    short: "Flagship 5G smartphone with a pro-grade camera system and all-day battery.",
    description:
      "The Aurora X1 Pro pairs a vivid high-refresh display with a versatile triple-camera system and fast charging. A refined, durable build makes it our flagship daily driver.",
    specs: spec({
      Display: '6.7" AMOLED, 120Hz',
      Chipset: "Octa-core flagship processor",
      Storage: "256 GB",
      Memory: "12 GB RAM",
      Battery: "5,000 mAh, 80W fast charge",
      Camera: "50 MP triple rear, 32 MP front",
    }),
  },
  {
    id: "p-1002",
    slug: "aurora-x1",
    name: "Aurora X1",
    category: "smartphones",
    price: 899000,
    previousPrice: null,
    stock: 34,
    rating: 4.6,
    ratingCount: 187,
    badge: null,
    featured: false,
    images: [IMG.phone2, IMG.phoneMacro],
    short: "Balanced everyday flagship with dependable performance and a clean design.",
    description:
      "The Aurora X1 delivers smooth day-to-day performance, a bright display and solid cameras in a sleek, pocketable frame.",
    specs: spec({
      Display: '6.5" AMOLED, 120Hz',
      Chipset: "Octa-core processor",
      Storage: "256 GB",
      Memory: "8 GB RAM",
      Battery: "4,800 mAh, 65W fast charge",
      Camera: "50 MP dual rear, 16 MP front",
    }),
  },
  {
    id: "p-1003",
    slug: "nexus-n5",
    name: "Nexus N5",
    category: "smartphones",
    price: 620000,
    previousPrice: 680000,
    stock: 27,
    rating: 4.5,
    ratingCount: 143,
    badge: "Deal",
    featured: true,
    images: [IMG.phone2, IMG.phone1],
    short: "Reliable mid-range phone with long battery life and a sharp display.",
    description:
      "The Nexus N5 is a dependable mid-range handset focused on battery life and a crisp display — a great value for everyday use.",
    specs: spec({
      Display: '6.6" LCD, 90Hz',
      Chipset: "Octa-core processor",
      Storage: "128 GB",
      Memory: "8 GB RAM",
      Battery: "5,200 mAh, 33W charge",
      Camera: "64 MP dual rear, 13 MP front",
    }),
  },
  {
    id: "p-1004",
    slug: "pulse-lite",
    name: "Pulse Lite",
    category: "smartphones",
    price: 245000,
    previousPrice: null,
    stock: 52,
    rating: 4.3,
    ratingCount: 96,
    badge: null,
    featured: false,
    images: [IMG.phone2],
    short: "Affordable smartphone that covers the essentials without compromise.",
    description:
      "Pulse Lite keeps the essentials — a bright display, dual cameras and a long-lasting battery — in an affordable, lightweight package.",
    specs: spec({
      Display: '6.4" LCD',
      Chipset: "Octa-core processor",
      Storage: "64 GB",
      Memory: "4 GB RAM",
      Battery: "5,000 mAh",
      Camera: "50 MP dual rear, 8 MP front",
    }),
  },
  {
    id: "p-1005",
    slug: "edge-fold",
    name: "Edge Fold",
    category: "smartphones",
    price: 1850000,
    previousPrice: null,
    stock: 8,
    rating: 4.7,
    ratingCount: 54,
    badge: "New",
    featured: false,
    images: [IMG.phone1, IMG.phoneMacro],
    short: "Foldable flagship that unfolds into a tablet-sized canvas.",
    description:
      "The Edge Fold unfolds a large inner display into a compact form factor, with a hinge engineered for everyday durability.",
    specs: spec({
      Display: '7.6" foldable AMOLED',
      Cover: '6.3" AMOLED',
      Storage: "512 GB",
      Memory: "12 GB RAM",
      Battery: "4,400 mAh",
      Camera: "50 MP triple rear",
    }),
  },

  // ─── Laptops ────────────────────────────────────────────────────
  {
    id: "p-2001",
    slug: "vertex-ultra-14",
    name: "Vertex Ultra 14",
    category: "laptops",
    price: 2150000,
    previousPrice: 2350000,
    stock: 12,
    rating: 4.8,
    ratingCount: 121,
    badge: "Best Seller",
    featured: true,
    images: [IMG.laptop1, IMG.hero],
    short: "Thin, light and powerful ultrabook for demanding workflows.",
    description:
      "The Vertex Ultra 14 combines a high-resolution display with a lightweight aluminium chassis, tuned for creators and professionals on the move.",
    specs: spec({
      Display: '14" 2.8K, 90Hz',
      Processor: "Latest-gen high-performance CPU",
      Memory: "16 GB RAM",
      Storage: "1 TB SSD",
      Battery: "Up to 14 hours",
      Weight: "1.29 kg",
    }),
  },
  {
    id: "p-2002",
    slug: "vertex-air-13",
    name: "Vertex Air 13",
    category: "laptops",
    price: 1480000,
    previousPrice: null,
    stock: 9,
    rating: 4.7,
    ratingCount: 88,
    badge: null,
    featured: true,
    images: [IMG.laptop2, IMG.laptop1],
    short: "Featherweight laptop with all-day battery for portability.",
    description:
      "Vertex Air 13 is engineered for portability — a silent, fanless design with exceptional battery life in a premium metal body.",
    specs: spec({
      Display: '13.3" QHD',
      Processor: "Efficient multi-core CPU",
      Memory: "16 GB RAM",
      Storage: "512 GB SSD",
      Battery: "Up to 16 hours",
      Weight: "1.12 kg",
    }),
  },
  {
    id: "p-2003",
    slug: "vertex-pro-16",
    name: "Vertex Pro 16",
    category: "laptops",
    price: 3200000,
    previousPrice: null,
    stock: 6,
    rating: 4.9,
    ratingCount: 67,
    badge: "New",
    featured: false,
    images: [IMG.laptop1, IMG.hero],
    short: "Workstation-class performance for heavy compute and creative work.",
    description:
      "The Vertex Pro 16 brings desktop-class performance to a portable workstation, with a colour-accurate display for professional creative work.",
    specs: spec({
      Display: '16" 3.2K, 120Hz',
      Processor: "High-performance H-series CPU",
      Memory: "32 GB RAM",
      Storage: "1 TB SSD",
      Graphics: "Dedicated GPU",
      Battery: "Up to 10 hours",
    }),
  },
  {
    id: "p-2004",
    slug: "bytebook-15",
    name: "ByteBook 15",
    category: "laptops",
    price: 780000,
    previousPrice: 890000,
    stock: 41,
    rating: 4.4,
    ratingCount: 152,
    badge: "Deal",
    featured: false,
    images: [IMG.laptop2],
    short: "Practical everyday laptop for study, work and entertainment.",
    description:
      "ByteBook 15 offers a comfortable large display and dependable performance for everyday tasks, at an accessible price.",
    specs: spec({
      Display: '15.6" FHD',
      Processor: "Mid-range CPU",
      Memory: "8 GB RAM",
      Storage: "512 GB SSD",
      Battery: "Up to 8 hours",
      Weight: "1.72 kg",
    }),
  },
  {
    id: "p-2005",
    slug: "bytebook-13",
    name: "ByteBook 13",
    category: "laptops",
    price: 540000,
    previousPrice: null,
    stock: 0,
    rating: 4.2,
    ratingCount: 74,
    badge: null,
    featured: false,
    images: [IMG.laptop2, IMG.laptop1],
    short: "Compact and affordable laptop for students and light workloads.",
    description:
      "ByteBook 13 keeps things compact and affordable, ideal for notes, browsing and light productivity on the go.",
    specs: spec({
      Display: '13.3" FHD',
      Processor: "Entry multi-core CPU",
      Memory: "8 GB RAM",
      Storage: "256 GB SSD",
      Battery: "Up to 9 hours",
      Weight: "1.35 kg",
    }),
  },

  // ─── Tablets ────────────────────────────────────────────────────
  {
    id: "p-3001",
    slug: "slate-tab-11",
    name: "Slate Tab 11",
    category: "tablets",
    price: 720000,
    previousPrice: null,
    stock: 22,
    rating: 4.6,
    ratingCount: 93,
    badge: null,
    featured: true,
    images: [IMG.tablet, IMG.tabPhone],
    short: "Versatile 11-inch tablet for productivity and media.",
    description:
      "Slate Tab 11 pairs a vivid 11-inch display with stylus support, making it equally suited to sketching, reading and light productivity.",
    specs: spec({
      Display: '11" 2K, 120Hz',
      Storage: "128 GB",
      Memory: "8 GB RAM",
      Battery: "8,600 mAh",
      Stylus: "Supported",
    }),
  },
  {
    id: "p-3002",
    slug: "slate-tab-mini",
    name: "Slate Tab Mini",
    category: "tablets",
    price: 340000,
    previousPrice: 380000,
    stock: 30,
    rating: 4.4,
    ratingCount: 61,
    badge: "Deal",
    featured: false,
    images: [IMG.tabPhone, IMG.tablet],
    short: "Compact tablet that's easy to carry anywhere.",
    description:
      "Slate Tab Mini is a pocket-friendly tablet for reading, streaming and casual browsing, with a bright and colourful display.",
    specs: spec({
      Display: '8.3" 2K',
      Storage: "64 GB",
      Memory: "4 GB RAM",
      Battery: "5,100 mAh",
    }),
  },
  {
    id: "p-3003",
    slug: "slate-tab-pro-12",
    name: "Slate Tab Pro 12",
    category: "tablets",
    price: 1050000,
    previousPrice: null,
    stock: 11,
    rating: 4.7,
    ratingCount: 48,
    badge: "New",
    featured: false,
    images: [IMG.tablet],
    short: "Larger pro tablet for serious productivity and creative work.",
    description:
      "Slate Tab Pro 12 delivers a spacious 12-inch canvas with high refresh and stylus support for demanding creative and productivity tasks.",
    specs: spec({
      Display: '12.4" 2.8K, 120Hz',
      Storage: "256 GB",
      Memory: "12 GB RAM",
      Battery: "10,000 mAh",
      Stylus: "Supported",
    }),
  },

  // ─── Smartwatches ───────────────────────────────────────────────
  {
    id: "p-4001",
    slug: "pulse-watch-s2",
    name: "Pulse Watch S2",
    category: "smartwatches",
    price: 285000,
    previousPrice: 320000,
    stock: 38,
    rating: 4.5,
    ratingCount: 110,
    badge: "Deal",
    featured: true,
    images: [IMG.watch],
    short: "Everyday smartwatch with health tracking and notifications.",
    description:
      "The Pulse Watch S2 tracks activity, heart rate and sleep while keeping notifications at a glance, in a comfortable everyday design.",
    specs: spec({
      Display: '1.43" AMOLED',
      Battery: "Up to 7 days",
      Water: "5 ATM",
      Sensors: "Heart rate, SpO2, GPS",
    }),
  },
  {
    id: "p-4002",
    slug: "pulse-watch-ultra",
    name: "Pulse Watch Ultra",
    category: "smartwatches",
    price: 560000,
    previousPrice: null,
    stock: 14,
    rating: 4.6,
    ratingCount: 59,
    badge: "New",
    featured: false,
    images: [IMG.watch],
    short: "Rugged premium smartwatch built for the outdoors.",
    description:
      "Pulse Watch Ultra is a rugged, titanium-cased smartwatch with advanced GPS and extended battery life for outdoor and endurance use.",
    specs: spec({
      Display: '1.92" AMOLED',
      Battery: "Up to 14 days",
      Water: "10 ATM",
      Case: "Titanium",
    }),
  },
  {
    id: "p-4003",
    slug: "pulse-watch-sport",
    name: "Pulse Watch Sport",
    category: "smartwatches",
    price: 145000,
    previousPrice: null,
    stock: 46,
    rating: 4.3,
    ratingCount: 84,
    badge: null,
    featured: false,
    images: [IMG.watch],
    short: "Lightweight fitness-focused smartwatch at an accessible price.",
    description:
      "Pulse Watch Sport focuses on the essentials — step, heart-rate and workout tracking — in a light, budget-friendly design.",
    specs: spec({
      Display: '1.3" AMOLED',
      Battery: "Up to 10 days",
      Water: "5 ATM",
      Sensors: "Heart rate, accelerometer",
    }),
  },

  // ─── Headphones ─────────────────────────────────────────────────
  {
    id: "p-5001",
    slug: "aura-anc-over-ear",
    name: "Aura ANC Over-Ear",
    category: "headphones",
    price: 215000,
    previousPrice: 260000,
    stock: 25,
    rating: 4.7,
    ratingCount: 168,
    badge: "Best Seller",
    featured: true,
    images: [IMG.headphone, IMG.hpWhite],
    short: "Premium over-ear headphones with adaptive noise cancelling.",
    description:
      "Aura ANC combines rich, balanced sound with adaptive noise cancellation and plush comfort for long listening sessions.",
    specs: spec({
      Driver: "40 mm dynamic",
      Battery: "Up to 40 hours",
      ANC: "Adaptive hybrid",
      Weight: "254 g",
    }),
  },
  {
    id: "p-5002",
    slug: "aura-studio",
    name: "Aura Studio",
    category: "headphones",
    price: 130000,
    previousPrice: null,
    stock: 33,
    rating: 4.5,
    ratingCount: 102,
    badge: null,
    featured: false,
    images: [IMG.hpWhite, IMG.hpWhite2],
    short: "Studio-tuned headphones for clean, detailed sound.",
    description:
      "Aura Studio is tuned for accurate, detailed audio, with a comfortable fit and long battery life for everyday listening.",
    specs: spec({
      Driver: "40 mm dynamic",
      Battery: "Up to 35 hours",
      ANC: "No",
      Weight: "238 g",
    }),
  },
  {
    id: "p-5003",
    slug: "aura-buds-pro",
    name: "Aura Buds Pro",
    category: "headphones",
    price: 95000,
    previousPrice: 110000,
    stock: 60,
    rating: 4.6,
    ratingCount: 134,
    badge: "Deal",
    featured: true,
    images: [IMG.earbud, IMG.hpCase],
    short: "True wireless earbuds with active noise cancellation.",
    description:
      "Aura Buds Pro deliver punchy sound with active noise cancellation and a pocketable charging case for all-day use.",
    specs: spec({
      Driver: "11 mm dynamic",
      Battery: "Up to 6h + 24h case",
      ANC: "Yes",
      Water: "IPX4",
    }),
  },
  {
    id: "p-5004",
    slug: "aura-buds-lite",
    name: "Aura Buds Lite",
    category: "headphones",
    price: 48000,
    previousPrice: null,
    stock: 0,
    rating: 4.2,
    ratingCount: 77,
    badge: null,
    featured: false,
    images: [IMG.hpCase, IMG.earbud],
    short: "Affordable wireless earbuds for everyday listening.",
    description:
      "Aura Buds Lite keep things simple and affordable — clear sound, a comfortable fit and a compact charging case.",
    specs: spec({
      Driver: "10 mm dynamic",
      Battery: "Up to 5h + 20h case",
      ANC: "No",
      Water: "IPX4",
    }),
  },

  // ─── Chargers ───────────────────────────────────────────────────
  {
    id: "p-6001",
    slug: "volt-gan-65w",
    name: "Volt GaN 65W",
    category: "chargers",
    price: 32000,
    previousPrice: 40000,
    stock: 120,
    rating: 4.7,
    ratingCount: 210,
    badge: "Deal",
    featured: true,
    images: [IMG.charger, IMG.usb],
    short: "Compact 65W GaN charger for phones, tablets and laptops.",
    description:
      "The Volt GaN 65W delivers fast charging in a compact body, capable of powering phones, tablets and many USB-C laptops.",
    specs: spec({
      Output: "65 W max",
      Ports: "2x USB-C, 1x USB-A",
      Technology: "GaN",
      Input: "100–240V",
    }),
  },
  {
    id: "p-6002",
    slug: "volt-wireless-pad",
    name: "Volt Wireless Pad",
    category: "chargers",
    price: 28000,
    previousPrice: null,
    stock: 85,
    rating: 4.5,
    ratingCount: 92,
    badge: null,
    featured: false,
    images: [IMG.charger],
    short: "Slim 15W wireless charging pad for Qi-compatible devices.",
    description:
      "Volt Wireless Pad offers convenient 15W wireless charging in a slim, low-profile design that fits any desk or nightstand.",
    specs: spec({
      Output: "15 W max",
      Standard: "Qi",
      Cable: "USB-C (included)",
    }),
  },
  {
    id: "p-6003",
    slug: "volt-powerbank-20k",
    name: "Volt PowerBank 20K",
    category: "chargers",
    price: 55000,
    previousPrice: null,
    stock: 40,
    rating: 4.6,
    ratingCount: 118,
    badge: null,
    featured: false,
    images: [IMG.charger, IMG.usb],
    short: "20,000 mAh fast-charging power bank for on-the-go power.",
    description:
      "Volt PowerBank 20K keeps your devices charged on the go, with fast charging across two USB-C ports and a compact body.",
    specs: spec({
      Capacity: "20,000 mAh",
      Output: "65 W max",
      Ports: "2x USB-C, 1x USB-A",
      Weight: "410 g",
    }),
  },

  // ─── Other Devices ──────────────────────────────────────────────
  {
    id: "p-7001",
    slug: "snapcam-instant",
    name: "SnapCam Instant",
    category: "other",
    price: 78000,
    previousPrice: null,
    stock: 20,
    rating: 4.4,
    ratingCount: 66,
    badge: null,
    featured: false,
    images: [IMG.camInstant],
    short: "Instant camera for capturing and printing memories on the spot.",
    description:
      "SnapCam Instant prints your photos moments after you take them — a fun, tactile way to capture and share memories.",
    specs: spec({
      Print: "Instant film",
      Resolution: "5 MP",
      Flash: "Built-in",
    }),
  },
  {
    id: "p-7002",
    slug: "voyager-console",
    name: "Voyager Handheld",
    category: "other",
    price: 420000,
    previousPrice: null,
    stock: 16,
    rating: 4.5,
    ratingCount: 71,
    badge: "New",
    featured: true,
    images: [IMG.console],
    short: "Portable handheld console for gaming on the go.",
    description:
      "The Voyager Handheld brings a vivid display and comfortable controls together in a portable console built for gaming anywhere.",
    specs: spec({
      Display: '7" 1080p',
      Storage: "512 GB",
      Battery: "Up to 6 hours",
    }),
  },
  {
    id: "p-7003",
    slug: "photopro-x",
    name: "PhotoPro X",
    category: "other",
    price: 980000,
    previousPrice: null,
    stock: 5,
    rating: 4.7,
    ratingCount: 39,
    badge: null,
    featured: false,
    images: [IMG.camPro, IMG.camRig],
    short: "Mirrorless camera for enthusiasts and content creators.",
    description:
      "PhotoPro X is a compact mirrorless camera with a large sensor and interchangeable lens support, built for photography enthusiasts.",
    specs: spec({
      Sensor: "Large-format CMOS",
      Video: "4K",
      Lens: "Interchangeable mount",
    }),
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const sameCat = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCat, ...others].slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.short.toLowerCase().includes(q)
  );
}

export const CATEGORY_HERO = {
  smartphones: IMG.phone1,
  laptops: IMG.laptop1,
  tablets: IMG.tablet,
  smartwatches: IMG.watch,
  headphones: IMG.headphone,
  chargers: IMG.charger,
  other: IMG.console,
};
