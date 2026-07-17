import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  adjustProductStock,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import upload from "../config/upload.js"
import { uploadProductImage } from "../controllers/uploadController.js"

const router = express.Router();

router.patch(
  "/:id/stock",
  protect,
  adminOnly,
  adjustProductStock
)

router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("image"),
  uploadProductImage
)

router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
