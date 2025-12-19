# 🚀 Quick Setup Guide

## Step 1: Install Node.js

Download and install Node.js from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- This installs both Node.js and npm

Verify installation:
```bash
node --version
npm --version
```

## Step 2: Clone the Project

```bash
# Download the project from GitHub
git clone <your-github-repo-url>

# Go into the project folder
cd <repo-folder>

# Go into the frontend folder
cd frontend
```

## Step 3: Install Dependencies

```bash
# Install all required packages
npm install

# This will take 2-3 minutes
```

## Step 4: Start the App

```bash
# Start the development server
npm start

# The browser will automatically open http://localhost:3000
```

That's it! 🎉

---

## Using Yarn Instead of npm (Optional)

If you prefer Yarn:

```bash
# Install Yarn globally
npm install -g yarn

# Then use yarn commands instead:
yarn install    # Instead of npm install
yarn start      # Instead of npm start
```

---

## What to Do After Setup

The app is now running with **mock data** (sample products, orders, etc.). Everything works without a backend!

### Explore the Features:
1. Browse **Refurbished Laptops** - http://localhost:3000/refurbished-laptops
2. Browse **New Laptops** - http://localhost:3000/new-laptops
3. Try the **filters** (brand, RAM, storage, etc.)
4. Add items to **cart** and see B2B/B2C pricing
5. Go to **Profile** to see sample orders with tracking
6. Test the **checkout** flow

### Making Changes:
- Edit files in `frontend/src/`
- The app will automatically reload when you save
- No need to restart the server

---

## Folder Structure (What You Need to Know)

```
frontend/
  ├── src/
  │   ├── pages/          ← All the pages (Home, Products, Cart, etc.)
  │   ├── components/     ← Reusable components (Header, Footer, etc.)
  │   ├── mockData.js     ← Change products/orders here
  │   └── App.js          ← Main app file
  │
  ├── public/
  │   └── bright-logo.webp ← Replace this with your logo
  │
  └── package.json        ← Project dependencies
```

---

## Common Issues

### Issue: Port 3000 is already in use
**Solution**: The app will ask if you want to use port 3001 instead. Press 'Y' to accept.

### Issue: npm install fails
**Solution**: 
```bash
# Delete node_modules and try again
rm -rf node_modules
npm install
```

### Issue: "Module not found" error
**Solution**: Make sure you're in the `frontend` folder:
```bash
cd frontend
npm install
npm start
```

---

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- All the code is in `frontend/src/` - feel free to explore!
- The app uses **React** - if you know React, you can customize everything

Happy coding! 💻
