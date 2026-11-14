# Hyni Fashion Studio – Backend Phase 1

Node.js + Express + MongoDB Community starter backend for the existing React/Vite frontend.

## Requirements
- Node.js 20 LTS or newer
- MongoDB Community Server running locally
- npm

## Setup
1. Open a terminal in the `backend` folder.
2. Install dependencies: `npm install`
3. Configure `.env` with `MONGODB_URI` and a `JWT_SECRET` containing at least 32 characters.
4. Start the development server: `npm run dev`
5. Open `http://localhost:5000/api/health`.

## Vercel deployment
- Set the Vercel project's Root Directory to `backend`.
- Use `npm run build` as the Build Command.
- Add `MONGODB_URI` and `JWT_SECRET` as backend Vercel environment variables. Set `CLIENT_URL` to `https://hynifashionstudios.vercel.app`.
- Deploy the project; `index.js` exports the Express app for Vercel, and database connections are established when requests arrive.

## Expected health response
When MongoDB is running, the endpoint returns HTTP 200 and JSON with `success: true`, `api: healthy`, and `database: connected`.

## Scripts
- `npm run build` – validate the Vercel function entry point
- `npm run dev` – start with nodemon
- `npm start` – start normally

## Phase 1 scope
- Express application and HTTP server
- Local MongoDB connection with Mongoose
- Environment configuration
- CORS for the Vite frontend at `http://localhost:5173`
- Helmet security headers and development request logging
- JSON parsing, 404 handler and centralized error handler
- API and database health endpoint

Authentication, products, orders, payments and employee management are intentionally not included yet; they will be added in later phases.
