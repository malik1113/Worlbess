import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadsDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "products"
)
fs.mkdirSync(uploadsDirectory, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsDirectory)
  },

  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`

    const extension = path.extname(file.originalname).toLowerCase()

    callback(null, `product-${uniqueSuffix}${extension}`)
  },
})

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