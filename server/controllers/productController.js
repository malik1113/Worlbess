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
  export const updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        })
      }
  
      const {
        name,
        category,
        price,
        description,
        image,
        stock,
        featured,
      } = req.body
  
      if (name !== undefined) {
        if (!name.trim()) {
          return res.status(400).json({
            success: false,
            message: "Product name cannot be empty.",
          })
        }
  
        product.name = name.trim()
      }
  
      if (category !== undefined) {
        if (!category.trim()) {
          return res.status(400).json({
            success: false,
            message: "Product category cannot be empty.",
          })
        }
  
        product.category = category.trim()
      }
  
      if (description !== undefined) {
        if (!description.trim()) {
          return res.status(400).json({
            success: false,
            message: "Product description cannot be empty.",
          })
        }
  
        product.description = description.trim()
      }
  
      if (image !== undefined) {
        if (!image.trim()) {
          return res.status(400).json({
            success: false,
            message: "Product image cannot be empty.",
          })
        }
  
        product.image = image.trim()
      }
  
      if (price !== undefined) {
        const numericPrice = Number(price)
  
        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
          return res.status(400).json({
            success: false,
            message: "Price must be a valid non-negative number.",
          })
        }
  
        product.price = numericPrice
      }
  
      if (stock !== undefined) {
        const numericStock = Number(stock)
  
        if (!Number.isInteger(numericStock) || numericStock < 0) {
          return res.status(400).json({
            success: false,
            message: "Stock must be a valid non-negative integer.",
          })
        }
  
        product.stock = numericStock
      }
  
      if (featured !== undefined) {
        if (typeof featured !== "boolean") {
          return res.status(400).json({
            success: false,
            message: "Featured must be true or false.",
          })
        }
  
        product.featured = featured
      }
  
      const updatedProduct = await product.save()
  
      res.status(200).json({
        success: true,
        message: "Product updated successfully.",
        product: updatedProduct,
      })
    } catch (error) {
      console.error(`Update product failed: ${error.message}`)
  
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        })
      }
  
      res.status(500).json({
        success: false,
        message: "Unable to update product.",
      })
    }
  }