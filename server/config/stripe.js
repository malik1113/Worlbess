import Stripe from "stripe"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: path.join(__dirname, "../.env"),
})

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing. Add it to server/.env before starting the server."
  )
}

const stripe = new Stripe(stripeSecretKey)

export default stripe