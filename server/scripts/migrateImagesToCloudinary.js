import fs from "fs"
import path from "path"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

import Product from "../models/Product.js"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const requiredEnvVariables = [
    "MONGODB_URI",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ]
  
  const missingEnvVariables = requiredEnvVariables.filter(
    variableName => !process.env[variableName]
  )
  
  if (missingEnvVariables.length > 0) {
    console.error(
      `Missing required environment variables: ${missingEnvVariables.join(", ")}`
    )
  
    process.exit(1)
  }
  async function migrateImages() {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
  
      console.log("✓ Connected to MongoDB")
  
      const products = await Product.find({
        image: { $regex: "^/uploads/products/" },
      })
  
      console.log(
        `Found ${products.length} product(s) using legacy uploads.`
      )
      for (const product of products) {
        const relativePath = product.image.replace(/^\/uploads\//, "")
        const localImagePath = path.join("uploads", relativePath)
      
        if (!fs.existsSync(localImagePath)) {
          console.error(`✗ Missing file for ${product.name}: ${localImagePath}`)
          continue
        }
      
        console.log(`Uploading ${product.name}...`)
      
        const uploadResult = await cloudinary.uploader.upload(localImagePath, {
          folder: "worlbess/products",
          resource_type: "image",
        })
      
        product.image = uploadResult.secure_url
      
        await product.save()
      
        console.log(`✓ Migrated ${product.name}`)
        console.log(uploadResult.secure_url)
      }
    } catch (error) {
      console.error(error)
    } finally {
      await mongoose.disconnect()
    }
    console.log("Migration complete.")
  }
  
  migrateImages()