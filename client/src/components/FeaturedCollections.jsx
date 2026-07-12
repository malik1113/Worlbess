function FeaturedCollections() {
    return (
      <section className="bg-[#0d0d0d] py-24">
  
        <div className="max-w-7xl mx-auto px-8">
  
          <h2 className="text-5xl text-center text-yellow-500 font-serif mb-16">
            Explore The Collection
          </h2>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  
            {[
              "Leaf",
              "Grabba",
              "Accessories",
              "Apparel"
            ].map((item) => (
  
              <div
                key={item}
                className="bg-black border border-yellow-500/20 rounded-xl p-10 hover:border-yellow-500 transition duration-300 cursor-pointer"
              >
  
                <h3 className="text-2xl text-white text-center">
                  {item}
                </h3>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    )
  }
  
  export default FeaturedCollections