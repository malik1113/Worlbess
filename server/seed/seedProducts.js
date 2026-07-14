import dotenv from "dotenv"
import connectDB from "../config/db.js"
import Product from "../models/Product.js"

dotenv.config()

const products = [
    {
      name: "Worlbess Premium Leaf",
      category: "Leaf",
      price: 24.99,
      image: "/images/products/premium-leaf.png",
      description: "Premium hand-selected leaf with rich character.",
      featured: true,
      stock: 50,
    },
    {
      name: "Worlbess Grabba",
      category: "Grabba",
      price: 14.99,
      image: "/images/products/grabba-image.png",
      description: "Carefully prepared grabba with consistent quality.",
      featured: true,
      stock: 50,
    },
    {
      name: "Worlbess Storage Jar",
      category: "Accessories",
      price: 19.99,
      image: "/images/products/storage-jar.png",
      description: "A premium storage solution for freshness and organization.",
      featured: true,
      stock: 50,
    },
    {
      name: "Worlbess Heritage T-Shirt",
      category: "Apparel",
      price: 29.99,
      image: "/images/products/heritage-shirt.png",
      description: "Premium Worlbess apparel featuring the heritage collection.",
      featured: true,
      stock: 50,
    },
  ]
  const seedProducts = async () => {
    try {
      await connectDB()
  
      await Product.deleteMany()
      await Product.insertMany(products)
  
      console.log("Worlbess products seeded successfully")
      process.exit(0)
    } catch (error) {
      console.error(`Product seed failed: ${error.message}`)
      process.exit(1)
    }
  }
  
  seedProducts()