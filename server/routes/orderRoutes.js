import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
    createOrder,
    getMyOrders,
  } from "../controllers/orderController.js"

const router = express.Router()

router.get("/my-orders", protect, getMyOrders)
router.post("/", protect, createOrder)


export default router