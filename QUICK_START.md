# ⚡ Quick Start - 3 Simple Steps

## Before You Begin

✅ Install **Node.js** from https://nodejs.org/ (Download the LTS version)

---

## Step 1: Open Terminal

**Windows:**
- Press `Win + R`, type `cmd`, press Enter

**Mac:**
- Press `Cmd + Space`, type `terminal`, press Enter

**Linux:**
- Press `Ctrl + Alt + T`

---

## Step 2: Navigate to Project

```bash
# Go to where you downloaded/cloned the project
cd path/to/your/project

# Go into the frontend folder
cd frontend
```

---

## Step 3: Install & Run

```bash
# Install dependencies (one-time only)
npm install

# Start the app
npm start
```

**That's it!** 🎉

Your browser will automatically open to http://localhost:3000

---

## ✨ What You'll See

- **Home Page** with options for New or Refurbished laptops
- **18+ Pages** - all working with sample data
- **Shopping Cart** - fully functional
- **Order Tracking** - with sample orders
- **User Profile** - with mock account data

---

## 🎨 Everything Works Out of the Box

No database setup needed!
No backend required!
Just **React** and mock data!

---

## 📱 Test These Features

1. Go to http://localhost:3000/refurbished-laptops
   - Try the filters (Brand, RAM, Storage, etc.)
   - Sort by price, rating, discount

2. Add items to cart
   - Regular pricing for small quantities
   - Automatic 15% discount for 10+ items (B2B)

3. Go to Profile page
   - See 2 sample orders
   - Click on an order to see tracking details

4. Try the signup page
   - Check the "Are you a business?" option
   - See business fields appear

---

## 🛠️ Making Changes

All code is in `frontend/src/`:

- **Change products**: Edit `src/mockData.js`
- **Change pages**: Edit files in `src/pages/`
- **Change header/footer**: Edit in `src/components/`
- **Change logo**: Replace `public/bright-logo.webp`

Save any file and the app will automatically reload! ✨

---

## 🚀 Next Steps

1. **Explore the code** - Everything is well-organized in folders
2. **Customize** - Change colors, add features, modify products
3. **Deploy** - Ready to deploy to Vercel, Netlify, or any hosting

---

## 📚 Documentation

- **Full README**: See [README.md](README.md)
- **Detailed Setup**: See [SETUP.md](SETUP.md)
- **React Docs**: https://react.dev/

---

## Need Help?

**Terminal shows errors?**
- Make sure you're in the `frontend` folder: `cd frontend`
- Try: `rm -rf node_modules && npm install`

**Port 3000 already in use?**
- Terminal will ask if you want port 3001
- Press 'Y' and use that instead

**Page won't load?**
- Wait 30-60 seconds for the first build
- Check terminal for "Compiled successfully!"

---

**Happy Coding!** 💻✨
