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
export const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        })
      }
  
      res.status(200).json({
        success: true,
        product,
      })
    } catch (error) {
      console.error(`Get product failed: ${error.message}`)
  
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      })
    }
  }