export const uploadProductImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      })
    }
  
    const imagePath = `/uploads/products/${req.file.filename}`
  
    res.status(201).json({
      success: true,
      message: "Product image uploaded successfully.",
      image: imagePath,
    })
  }