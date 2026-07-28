import { Link } from "react-router-dom"

function FeaturedCollections() {
  const collections = [
    { name: "Leaf", category: "leaf" },
    { name: "Grabba", category: "grabba" },
    { name: "Accessories", category: "accessories" },
    { name: "Apparel", category: "apparel" },
  ]

  return (
    <section className="bg-[#0d0d0d] py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 text-center font-serif text-5xl text-yellow-500">
          Explore The Collection
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              to={`/shop?category=${collection.category}`}
              className="rounded-xl border border-yellow-500/20 bg-black p-10 transition duration-300 hover:border-yellow-500"
            >
              <h3 className="text-center text-2xl text-white">
                {collection.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollections