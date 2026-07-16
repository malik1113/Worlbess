import express from "express"
import {
    registerUser,
    loginUser,
    getProfile,
  } from "../controllers/authController.js"

import { protect } from "../middleware/authMiddleware.js"
import { adminOnly } from "../middleware/adminMiddleware.js"
  


const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getProfile)

router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
    user: req.user,
  })
})

export default router