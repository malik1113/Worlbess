import { Link, useParams } from "react-router-dom"
import products from "../data/products"
import { useCart } from "../context/CartContext"

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return (
      <main className="min-h-screen bg-black pt-32 px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif text-yellow-500">
            Product Not Found
          </h1>

          <Link
            to="/shop"
            className="inline-block mt-8 rounded-full border border-yellow-500 px-6 py-3 text-yellow-500"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-8 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        <div className="aspect-square rounded-2xl border border-yellow-500/20 bg-[#111111] flex items-center justify-center overflow-hidden">
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
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-serif">
            {product.name}
          </h1>

          <p className="mt-6 text-2xl text-yellow-500">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-gray-300 leading-8">
            {product.description}
          </p>

          <p className="mt-6 text-green-400">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
              className="rounded-full bg-yellow-500 px-8 py-3 text-black disabled:opacity-40"
            >
              Add to Cart
            </button>

            <Link
              to="/shop"
              className="rounded-full border border-yellow-500 px-8 py-3 text-yellow-500"
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