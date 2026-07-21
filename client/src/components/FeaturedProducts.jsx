import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function FeaturedProducts() {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true)
        setError("")

        const response = await fetch(`${API_URL}/api/products`)

        if (!response.ok) {
          throw new Error("Unable to load featured products")
        }

        const data = await response.json()

        const availableFeaturedProducts = data.products.filter(
          (product) => product.featured && product.stock > 0
        )

        setFeaturedProducts(availableFeaturedProducts)
      } catch (error) {
        console.error("Featured products request failed:", error)
        setError("Featured products are temporarily unavailable.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [API_URL])

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            The Collection
          </p>

          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Featured Products
          </h2>

          <p className="mt-5 text-gray-400">
            Explore a selection of Worlbess products chosen for quality,
            craftsmanship, and character.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-gray-400">
            Loading featured products...
          </p>
        )}

        {error && !isLoading && (
          <p className="text-center text-red-300">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <motion.article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111]"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-[#1d1d1d] to-black">
                  {product.image ? (
                    <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  ) : (
                    <span className="text-gray-500">
                      Product image coming soon
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-sm uppercase tracking-widest text-yellow-500">
                    {product.category}
                  </p>

                  <h3 className="mt-3 font-serif text-xl text-white">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg text-white">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="rounded-full border border-yellow-500 px-4 py-2 text-yellow-500 transition duration-300 hover:bg-yellow-500 hover:text-black"
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!isLoading && !error && featuredProducts.length === 0 && (
          <p className="text-center text-gray-400">
            No featured products are currently available.
          </p>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts