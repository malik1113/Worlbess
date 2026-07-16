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
  export const createProduct = async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        description,
        image,
        stock,
        featured,
      } = req.body
  
      if (
        !name?.trim() ||
        !category?.trim() ||
        !description?.trim() ||
        !image?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required product information.",
        })
      }
  
      const numericPrice = Number(price)
      const numericStock = Number(stock)
  
      if (
        !Number.isFinite(numericPrice) ||
        numericPrice < 0 ||
        !Number.isInteger(numericStock) ||
        numericStock < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Price and stock must contain valid values.",
        })
      }
  
      const product = await Product.create({
        name: name.trim(),
        category: category.trim(),
        price: numericPrice,
        description: description.trim(),
        image: image.trim(),
        stock: numericStock,
        featured: Boolean(featured),
      })
  
      res.status(201).json({
        success: true,
        message: "Product created successfully.",
        product,
      })
    } catch (error) {
      console.error(`Create product failed: ${error.message}`)
  
      res.status(500).json({
        success: false,
        message: "Unable to create product.",
      })
    }
  }