import express from "express"
import {
  createCheckoutSession,
  verifyCheckoutSession,
  cancelCheckoutSession,
} from "../controllers/paymentController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post(
  "/create-checkout-session",
  protect,
  createCheckoutSession
)

router.post(
  "/cancel-checkout-session",
  protect,
  cancelCheckoutSession
)

router.get(
  "/verify-session/:sessionId",
  protect,
  verifyCheckoutSession
)

export default router