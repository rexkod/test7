# 💻 Bright Laptop - E-Commerce Platform

A modern, full-featured e-commerce platform built with **React** for buying new and refurbished laptops.

## ✨ Features

- 🔄 **Refurbished & New Laptops** - Separate catalogs with advanced filtering
- 💰 **B2B & B2C Pricing** - Automatic bulk pricing for orders of 10+ units
- 🔍 **Advanced Filtering** - Filter by brand, RAM, storage, processor, screen size, price range
- 🛒 **Shopping Cart** - Add to cart with B2B/B2C pricing indicators
- 📦 **Order Tracking** - Complete order history with shipment tracking timeline
- 👤 **User Account** - Profile management with addresses and order history
- 🎨 **Modern UI** - Built with Shadcn UI components and Tailwind CSS
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Yarn** or **npm**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# Navigate to frontend
cd frontend

# Install dependencies
yarn install
# OR
npm install

# Start development server
yarn start
# OR
npm start
```

The app will open at **http://localhost:3000**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/              # All page components
│   │   ├── Home.jsx
│   │   ├── RefurbishedLaptops.jsx
│   │   ├── NewLaptops.jsx
│   │   ├── ProductDetailEnhanced.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── About.jsx
│   │   ├── Business.jsx
│   │   ├── Startups.jsx
│   │   ├── Blogs.jsx
│   │   └── Contact.jsx
│   │
│   ├── components/         # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ui/            # Shadcn UI components
│   │
│   ├── mockData.js        # Mock data for products, orders, addresses
│   ├── App.js             # Main app with routing
│   └── index.css          # Global styles + Tailwind
│
├── public/
│   ├── bright-logo.webp   # Company logo
│   └── index.html
│
├── package.json
├── tailwind.config.js
└── .env
```

## 🎯 Key Pages

### Shopping Pages
- `/` - Home page with hero banners
- `/refurbished-laptops` - Certified refurbished laptops (12 products)
- `/new-laptops` - Brand new laptops (6 products)
- `/product/:id` - Detailed product page with specs

### Account Pages
- `/login` - User login
- `/signup` - User registration (with business option)
- `/profile` - User profile with orders and addresses
- `/order/:orderId` - Order details with tracking

### Other Pages
- `/cart` - Shopping cart
- `/checkout` - Checkout with address management
- `/about` - About company
- `/business` - Business solutions (B2B)
- `/startups` - Startup programs
- `/blogs` - Blog listing
- `/contact` - Contact form

## 🛠️ Tech Stack

- **React 19.0.0** - UI library
- **React Router DOM** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **React Hook Form** - Form handling
- **Zod** - Validation

## 🎨 Features Deep Dive

### 1. Product Filtering
- Price range slider
- Multi-select brand filter
- RAM, Storage, Processor filters
- Screen size filter
- Sort by: Price, Rating, Discount, Newest

### 2. B2B/B2C Pricing
- **B2C**: Regular pricing for individual purchases
- **B2B**: 15% discount when quantity ≥ 10 units (MOQ)
- Automatic pricing in cart and checkout
- Visual badges throughout the app

### 3. Order Tracking
- 6-step tracking timeline
- Real-time status updates
- Estimated delivery dates
- Downloadable invoice
- Shipping address display

### 4. Business Signup
- Regular user signup
- Business user option with:
  - Business name
  - GST number
  - Business address

## 🔧 Development Commands

```bash
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test

# Format code
yarn format

# Lint code
yarn lint
```

## 📦 Build for Production

```bash
# Create optimized production build
cd frontend
yarn build

# Output will be in frontend/build/
# Deploy this folder to any static hosting:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - Any web server
```

## 🎨 Customization

### Change Branding
1. Replace logo: `frontend/public/bright-logo.webp`
2. Update name in: `src/components/Header.jsx`, `src/components/Footer.jsx`
3. Update title in: `public/index.html`

### Modify Products
Edit `src/mockData.js`:
- `products` array - Add/edit products
- `categories` array - Modify categories
- `sampleOrders` array - Update order history
- `sampleAddresses` array - Change addresses

### Styling
- Colors: Edit `src/index.css` (CSS variables)
- Tailwind: Modify `tailwind.config.js`
- Components: Update in `src/components/ui/`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow prompts, done!
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod

# Follow prompts
```

### Deploy to GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repo-name"

# Install gh-pages
yarn add -D gh-pages

# Add scripts to package.json
"predeploy": "yarn build",
"deploy": "gh-pages -d build"

# Deploy
yarn deploy
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
# Mac/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json yarn.lock
yarn install
```

### Build fails
```bash
# Check Node version (should be 18+)
node --version

# Update dependencies
yarn upgrade
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

For support or inquiries: contact@brightlaptop

---

**Built with ❤️ using React**
