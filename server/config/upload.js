import multer from "multer"

const storage = multer.memoryStorage()

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
]

const fileFilter = (req, file, callback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true)
    return
  }

  callback(
    new Error(
      "Invalid image type. Only JPEG, PNG, and WebP images are allowed."
    )
  )
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

export default upload