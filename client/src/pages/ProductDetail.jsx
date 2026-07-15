import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError("")

        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        )

        if (!response.ok) {
          throw new Error("Product not found")
        }

        const data = await response.json()
        setProduct(data.product)
      } catch (error) {
        console.error("Product request failed:", error)
        setError("We could not load this product.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-8 pt-32 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-400">Loading product...</p>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-black px-8 pt-32 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-serif text-4xl text-yellow-500">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-400">
            {error || "This product is unavailable."}
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full border border-yellow-500 px-6 py-3 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    )
  }

  const isInStock = product.stock > 0

  return (
    <main className="min-h-screen bg-black px-8 pt-32 pb-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111]">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <p className="text-gray-500">
              Product image coming soon
            </p>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            {product.category}
          </p>

          <h1 className="mt-4 font-serif text-5xl">
            {product.name}
          </h1>

          <p className="mt-6 text-2xl text-yellow-500">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-8 text-gray-300">
            {product.description}
          </p>

          <p className={`mt-6 ${isInStock ? "text-green-400" : "text-red-400"}`}>
            {isInStock
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              disabled={!isInStock}
              onClick={() => addToCart(product)}
              className="rounded-full bg-yellow-500 px-8 py-3 text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to Cart
            </button>

            <Link
              to="/shop"
              className="rounded-full border border-yellow-500 px-8 py-3 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail