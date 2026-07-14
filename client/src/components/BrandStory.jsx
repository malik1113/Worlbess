import { motion } from "framer-motion"
import homeImage from "../assets/products/home-image.png"

function BrandStory() {
  return (
    <section className="bg-[#0d0d0d] py-24">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-14 items-center">

        <motion.div
          className="relative min-h-[420px] rounded-2xl overflow-hidden border border-yellow-500/20"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={homeImage}
            alt="Worlbess heritage tobacco craftsmanship"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 z-10 p-8">
            <p className="text-yellow-500 uppercase tracking-[0.35em] text-sm">
              Heritage
            </p>

            <h3 className="mt-3 text-4xl font-serif text-white">
              Ancient Craftsmanship
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-sm">
            The Worlbess Story
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-serif text-white leading-tight">
            Some Traditions Cannot Be Rushed
          </h2>

          <p className="mt-6 text-gray-300 leading-8">
            Long before modern factories and mass production, master leaf
            craftsmen across North Africa and the Arabian Peninsula refined
            the art of selecting, curing, and preparing exceptional tobacco by
            hand.
          </p>

          <p className="mt-5 text-gray-300 leading-8">
            Inspired by this heritage, Worlbess embraces patience, skilled
            hands, natural materials, and respect for the leaf itself. Our goal
            is simple: deliver premium products shaped by craftsmanship rather
            than shortcuts.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-gray-200">
            <div className="border-l-2 border-yellow-500 pl-4">
              Organic focused
            </div>

            <div className="border-l-2 border-yellow-500 pl-4">
              Scent free
            </div>

            <div className="border-l-2 border-yellow-500 pl-4">
              Chemical free processing
            </div>

            <div className="border-l-2 border-yellow-500 pl-4">
              Hand selected
            </div>
          </div>

          <button className="mt-10 px-8 py-3 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300">
            Read Our Full Story
          </button>
        </motion.div>

      </div>
    </section>
  )
}

export default BrandStory