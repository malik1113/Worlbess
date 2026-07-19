import express from "express"
import cors from "cors"
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
console.log("Stripe configuration loaded:", Boolean(stripe))

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
// Stripe must receive the untouched raw request body. The webhook route must appear before the general JSON middleware. Stripe signature verification fails when another middleware alters the request body.
app.post(
    "/api/payments/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
  )
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

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Worlbess server running on http://localhost:${PORT}`)
  })
}

startServer()