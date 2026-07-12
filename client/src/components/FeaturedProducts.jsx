import { motion } from "framer-motion"
import products from "../data/products"

function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured && product.inStock
  )

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            The Collection
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-white">
            Featured Products
          </h2>

          <p className="mt-5 text-gray-400">
            Explore a selection of Worlbess products chosen for quality,
            craftsmanship, and character.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.article
              key={product.id}
              className="group bg-[#111111] border border-yellow-500/20 rounded-2xl overflow-hidden"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square bg-gradient-to-br from-[#1d1d1d] to-black flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <span className="text-gray-500">
                    Product image coming soon
                  </span>
                )}
              </div>

              <div className="p-6">
                <p className="text-yellow-500 text-sm uppercase tracking-widest">
                  {product.category}
                </p>

                <h3 className="mt-3 text-xl text-white font-serif">
                  {product.name}
                </h3>

                <p className="mt-3 text-gray-400 text-sm leading-6">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-white text-lg">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="border border-yellow-500 rounded-full px-4 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300"
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedProducts