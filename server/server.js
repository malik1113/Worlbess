import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use("/api/products", productRoutes)

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