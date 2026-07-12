function VideoSection() {
    return (
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
  
          <div>
            <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
              The Worlbess Experience
            </p>
  
            <h2 className="mt-4 text-4xl md:text-5xl font-serif text-white">
              Ancient Tradition Refined for the Modern World
            </h2>
  
            <p className="mt-6 text-gray-300 leading-8">
              Discover a premium collection inspired by, centuries old expert craftsmanship,
              natural materials, and generations of respect for the leaf.
            </p>
  
            <button className="mt-8 px-8 py-3 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300">
              Discover Our Story
            </button>
          </div>
  
          <div className="aspect-video rounded-2xl overflow-hidden border border-yellow-500/30 bg-[#161616] flex items-center justify-center">
            <div className="text-center px-6">
              <div className="text-5xl">▶</div>
              <p className="mt-4 text-gray-400">
                Worlbess brand video coming soon
              </p>
            </div>
          </div>
  
        </div>
      </section>
    )
  }
  
  export default VideoSection