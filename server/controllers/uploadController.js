import cloudinary from "../config/cloudinary.js"

const uploadBufferToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "worlbess/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      }
    )

    uploadStream.end(fileBuffer)
  })

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload.",
      })
    }

    const uploadResult = await uploadBufferToCloudinary(req.file.buffer)

    return res.status(201).json({
      success: true,
      message: "Product image uploaded successfully.",
      image: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    })
  } catch (error) {
    console.error("Cloudinary product image upload error:", error)

    return res.status(500).json({
      success: false,
      message: "Unable to upload the product image.",
    })
  }
}