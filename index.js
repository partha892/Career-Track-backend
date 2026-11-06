
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/config/db.js";
import router from "./src/routers/authRoutes.js";
import { applicationRouter } from "./src/routers/applicationRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Trust Vercel proxy
app.set("trust proxy", 1);

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://career-track-frontend-sigma.vercel.app",
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerTrack Backend is running!",
  });
});

// API routes
app.use("/api/v1/user", router);
app.use("/api/v1/application", applicationRouter);

// Connect database
connectDB();

// Start server
app.listen(port, () => {
  console.log(`CareerTrack server running on port ${port}`);
});
