import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })
  } catch (error) {
    console.error(`Get products failed: ${error.message}`)

    res.status(500).json({
      success: false,
      message: "Unable to retrieve products",
    })
  }
}