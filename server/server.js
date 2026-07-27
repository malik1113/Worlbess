import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import stripe from "./config/stripe.js"
import { stripeWebhook } from "./controllers/paymentController.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.join(__dirname, ".env"),
})

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
)

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PRODUCTION_CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header, such as:
      // curl, Stripe webhooks, server-to-server requests, and health checks.
      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      const corsError = new Error("Origin not allowed by CORS")
      corsError.status = 403;

      return callback(corsError)
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Stripe must receive the untouched raw request body.
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payments", paymentRoutes)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Worlbess API is running",
  })
})
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    const isProduction = process.env.NODE_ENV === "production"
    if (isProduction) {
      console.error({
        message: error.message,
        status: statusCode,
        method: req.method,
        path: req.originalUrl,
      })
    } else {
      console.error(error)
    }
    res.status(statusCode).json({
      success: false,
      message:
        isProduction && statusCode === 500
          ? "An unexpected server error occurred"
          : error.message,
    })
  })
const startServer = async () => {
  await connectDB()

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Worlbess server running on port ${PORT}`)
  })
}

startServer()
