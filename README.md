# ASATECH — Premium Gadget E-Commerce Platform

A production-grade, frontend-only e-commerce application for premium electronics and gadgets. Built with React, Vite, Tailwind CSS, and Material UI.

## Features

### Customer Experience

- **Storefront**: Modern homepage with hero, categories, featured products, and deals
- **Product Catalog**: Search, filtering (category, price, availability), sorting, pagination
- **Product Details**: Image gallery, specifications, related products, wishlist
- **Shopping Cart**: Persistent cart with quantity controls and free shipping threshold
- **Checkout**: Multi-step checkout (review → delivery → payment → confirmation)
- **User Account**: Orders, transactions, profile, wishlist, payment methods, notifications, security settings

### Admin Console

- **Dashboard**: Revenue, transactions, risk metrics with SVG charts
- **Product Management**: Create, edit, delete products with stock tracking
- **Inventory**: Stock level monitoring and adjustment
- **Order Management**: View orders, update status, track suspicious transactions
- **Customer Management**: Customer directory with order history
- **Transaction Monitoring**: Payment transaction list with risk scoring
- **Fraud Alerts**: Investigation interface with risk factors and decision controls
- **Audit Logs**: Administrative activity tracking

## Technology Stack

| Layer         | Technology                   |
| ------------- | ---------------------------- |
| Framework     | React 19                     |
| Build Tool    | Vite 7                       |
| Styling       | Tailwind CSS v4              |
| UI Components | Material UI (MUI)            |
| Icons         | Lucide React                 |
| Routing       | React Router v6              |
| State         | React Context + localStorage |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Design system primitives
│   ├── Logo.jsx        # ASATECH brand mark
│   ├── ProductCard.jsx # Product display card
│   ├── Rating.jsx      # Star rating component
│   ├── Timeline.jsx    # Order tracking timeline
│   ├── charts.jsx      # SVG charts (line, bar, donut)
│   └── ...
├── layouts/            # Page layouts
│   ├── StorefrontLayout.jsx
│   ├── AuthLayout.jsx
│   ├── CustomerLayout.jsx
│   └── AdminLayout.jsx
├── pages/              # Route pages
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── auth/           # Login, Register, Password reset
│   ├── account/        # Customer dashboard pages
│   └── admin/          # Admin console pages
├── services/           # API service layer
│   ├── config.js       # Environment configuration
│   ├── client.js       # HTTP client
│   ├── authService.js  # Authentication
│   ├── paymentService.js # Paystack integration
│   ├── catalogService.js # Products
│   ├── orderService.js # Orders & transactions
│   ├── fraudService.js # Fraud alerts
│   └── adminService.js # Admin operations
├── state/              # React Context providers
│   ├── ThemeContext.jsx
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ToastContext.jsx
├── hooks/              # Custom React hooks
│   └── useAsync.js
├── lib/                # Utilities & constants
│   ├── theme.js        # MUI theme builder
│   ├── format.js       # Currency, date formatting
│   └── constants.js    # Domain constants
├── data/               # Mock data (development only)
│   └── products.js
└── utils/              # Helper functions
    └── cn.js           # Class name merger
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arabbyy/ASATECH
cd ASATECH

# Install dependencies
npm install

# Copy environment example
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Backend API base URL (leave empty for offline/demo mode)
VITE_API_BASE_URL=

# Paystack public key (client-safe)
VITE_PAYSTACK_PUBLIC_KEY=
```

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Authentication Flow

1. Users can browse products without authentication
2. Checkout requires authentication (protected route)
3. Admin console requires admin role (protected route)
4. Authentication state persists via localStorage

## Payment Integration

The checkout flow integrates with Paystack via the backend:

```
Frontend → POST /payments/initialize → Backend → Paystack API
Frontend ← { reference, amount, ... } ← Backend ← Paystack
Frontend → PaystackPop.setup() → User completes payment
Backend verifies payment → Order confirmed
```

**Important**: Payment verification happens server-side only. The frontend never handles secret keys or performs verification.

## Risk Scoring

Fraud risk levels are defined as:

- **Low Risk**: 0–29
- **Medium Risk**: 30–59
- **High Risk**: 60–100

Risk scores are provided by the backend fraud engine. The frontend displays scores and factors but never computes them.

## Design System

### Color Palette

- **Brand**: Electric blue (#3b82f6)
- **Surface**: Deep navy (#070a12 dark, #f4f6fa light)
- **Semantic**: Green (success), Amber (warning), Red (danger)

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

### Dark Mode

- Default theme is dark
- Light mode fully supported
- User preference persisted to localStorage

## API Integration Points

All API calls are isolated in the `services/` layer. Key integration points:

| Service          | Endpoint               | Method          | Description         |
| ---------------- | ---------------------- | --------------- | ------------------- |
| `authService`    | `/auth/login`          | POST            | User login          |
| `authService`    | `/auth/register`       | POST            | User registration   |
| `authService`    | `/auth/me`             | GET             | Current user        |
| `catalogService` | `/products`            | GET             | List products       |
| `catalogService` | `/products/:slug`      | GET             | Product details     |
| `orderService`   | `/orders`              | GET             | List orders         |
| `orderService`   | `/orders/:ref`         | GET             | Order details       |
| `paymentService` | `/payments/initialize` | POST            | Initialize Paystack |
| `fraudService`   | `/fraud/alerts`        | GET             | List fraud alerts   |
| `adminService`   | `/admin/products`      | POST/PUT/DELETE | Product management  |

See `docs/API.md` for detailed endpoint specifications.

## Security Considerations

- Paystack public key only (never expose secret key)
- Payment verification server-side only
- Frontend route guards are UX-only (backend enforces authorization)
- No sensitive data in localStorage beyond auth token reference
- CORS and CSRF handled by backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary — ASATECH
