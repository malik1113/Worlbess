import { motion } from "framer-motion"
import globe from "../assets/hero/worlbess-globe.png"


function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >

        {/* LEFT SIDE - BRAND CONTENT */}
        <div>

          <motion.h1
            className="text-7xl font-serif font-bold tracking-widest text-yellow-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            WORLBESS
          </motion.h1>


          <motion.h2
            className="mt-6 text-3xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The World's Best Grabba
          </motion.h2>


          <motion.p
            className="mt-4 text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Ancient craftsmanship.
            <br />
            Modern excellence.
          </motion.p>


          <motion.button
            className="mt-8 px-10 py-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
            whileHover={{ scale: 1.05 }}
          >
            Shop Collection
          </motion.button>

        </div>


        {/* RIGHT SIDE - GLOBE */}
        <div className="flex justify-center">

          <motion.img
            src={globe}
            alt="Worlbess Globe"
            className="w-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />

        </div>


      </motion.div>

    </section>
  )
}

export default Hero