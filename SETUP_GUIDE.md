# CareerForge AI - Setup & Run Guide

## 📋 Quick Start

### 1. Generate JWT Secret
Open PowerShell and run:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (e.g., `a7f9e2c1b3d4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8`)

### 2. Create Backend `.env` File

Create a file at: `backend/.env`

```env
GOOGLE_GENAI_API_KEY=your-gemini-api-key-here
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=paste-your-generated-secret-here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

### 4. Start MongoDB

**Option A: Local MongoDB** (if you have it installed)
```bash
mongod
```

**Option B: MongoDB Atlas** (cloud)
- Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Update `MONGO_URI` in `backend/.env`

### 5. Start Both Servers

**Terminal 1 - Backend (from backend/ folder):**
```bash
npm run dev
```
✅ Should see: `🚀 Server is running on port 3000`

**Terminal 2 - Frontend (from frontend/ folder):**
```bash
npm run dev
```
✅ Should see: `VITE v7.x.x  ready in xxx ms`

### 6. Open in Browser
Go to **http://localhost:5173**

---

## ⚠️ Troubleshooting

### Error: "Cannot find module..."
- Make sure `npm install` completed successfully in both directories
- Delete `node_modules` and run `npm install` again

### Error: "MongoDB connection failed"
- Check MongoDB is running (`mongod`)
- Or update `MONGO_URI` with MongoDB Atlas connection string

### Error: "Token verification failed"
- Make sure `JWT_SECRET` is at least 32 characters and set in `.env`

### Port already in use
- Backend on 3000: `npx kill-port 3000`
- Frontend on 5173: `npx kill-port 5173`

---

## 🎯 Key Endpoints

Once running, you can test:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/api/health

---

## 📦 Dependencies Status

✅ All dependencies already installed and converted to ES modules
✅ Backend uses Node.js ES modules (`"type": "module"`)
✅ All `require()` converted to `import` statements

You're ready to go! 🚀
