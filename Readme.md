# Live Monitoring Service

A modern, full-stack, mock SRE dashboard built with Next.js 15, React, and TypeScript. This project demonstrates a live monitoring UI, mock API endpoints.

## Note 
vercel follow serverless ARTICTURE to there is possibily the data may loss , so you can run locally and also you can use fs module for serverless ARTICTURE
 

vistit for demo here :- ```https://live-monetring.vercel.app```

---

##  Architectural Decisions

### 1. **Next.js App Router**
- **Why:** Enables server components, file-based routing, and API routes in a single framework. Simplifies full-stack development and SSR/SSG.

### 2. **React Query (@tanstack/react-query)**
- **Why:** Handles data fetching, caching, and background updates for a responsive, real-time UI. great for dashboard types applications.

### 3. **Mock API with Next.js API Routes**
- **Why:** Allows the frontend to interact with realistic endpoints without a real backend. it's make easier to switch to real time api in later and also scaling on top of it or using it as wrapper.

### 4. **Tailwind CSS**
- **Why:** for styling the pages and making responsive .

### 5. **Framer Motion**
- **Why:** making the ui more intractive by adding some animation.

### 6. **Lucide React Icons**
- **Why:**  get a bunch of good icons.

### 7. **Docker & Docker Compose**
- **Why:** for make ease in local development and also deployments and isolating form os of different user .

---

## Key Libraries
- **next**: React framework for SSR, SSG, and API routes
- **react, react-dom**: UI library
- **@tanstack/react-query**: Data fetching/caching
- **framer-motion**: Animations
- **lucide-react**: Icons
- **tailwindcss, postcss**: Styling

---

##  Running Locally guide 

### **1. Prerequisites**
- Node.js 18+ (recommended: 20+)
- npm 

### **2. Install dependencies**
```sh
cd frontend
npm install
```

### **3. Start the development server**
```sh
npm run dev
```
- App runs at [http://localhost:3000](http://localhost:3000)

### **4. Environment Variables**
- Copy `.env` or `.env.example` to `.env` and adjust as needed.

---

##  Running with Docker

### **Build and run in production mode:**
```sh
docker-compose up --build
```
- App runs at [http://localhost:3000](http://localhost:3000)

### **For development (hot reload):**
```sh
DOCKER_TARGET=final-dev NODE_ENV=development docker-compose up --build
```

---

##  Notes
- **Mock Data:** All service data is in-memory and resets on container/server restart.
- **API:** All API endpoints are under `/api/services` (see `frontend/src/app/api/services/`).

- **Frontend:** main dashboard is at `/dashboard`, landing page at `/`.

---

## Project Structure
- `frontend/src/app/` - Next.js app directory (pages, API routes)
- `frontend/src/components/` - UI and dashboard components
- `frontend/src/lib/` - Utilities and mock API logic

---

