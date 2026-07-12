import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import products from "../data/products"

const categories = ["All", "Leaf", "Grabba", "Accessories", "Apparel"]

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products
    }

    return products.filter(
      (product) => product.category === selectedCategory
    )
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-8 text-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            Worlbess Collection
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-serif">
            Shop
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-400 leading-7">
            Explore premium leaf, grabba, accessories, and apparel selected
            with quality and craftsmanship in mind.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-6 py-3 transition duration-300 ${
                selectedCategory === category
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-yellow-500/40 text-yellow-500 hover:border-yellow-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111] hover:border-yellow-500/60 transition duration-300"
            >
              <div className="aspect-square bg-gradient-to-br from-[#1c1c1c] to-black flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="px-6 text-center text-gray-500">
                    Product image coming soon
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-sm uppercase tracking-widest text-yellow-500">
                  {product.category}
                </p>

                <h2 className="mt-3 text-xl font-serif text-white">
                  {product.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-lg text-white">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Opening product:", product.id)
                      navigate(`/product/${product.id}`)
                    }}
                    className="relative z-50 pointer-events-auto rounded-full border border-yellow-500 px-4 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300"
                  >
                    View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-16 text-center text-gray-400">
            No products are currently available in this category.
          </p>
        )}

      </div>
    </main>
  )
}

export default Shop