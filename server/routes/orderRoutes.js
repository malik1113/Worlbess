import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMiddleware.js"
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js"

const router = express.Router()

router.get("/admin", protect, adminOnly, getAllOrders)
router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
)
router.get("/my-orders", protect, getMyOrders)
router.post("/", protect, createOrder)

export default router