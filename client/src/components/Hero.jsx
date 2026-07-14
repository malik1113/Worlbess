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
            WORLBESS GRABBA
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
            className="mt-8 px-10 py-4 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Shop Collection
          </motion.button>

        </div>


        {/* RIGHT SIDE - GLOBE */}
        <div className="relative flex justify-center">
            <div className="absolute inset-0 z-0 m-auto h-72 w-72 rounded-full bg-yellow-500/20 blur-3xl"></div>

            <motion.img
                src={globe}
                alt="Earth glowing in space for Worlbess"
                className="relative z-10 w-full max-w-[560px] rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
                }}
                transition={{
                opacity: { duration: 1.5 },
                scale: { duration: 1.5 },
                y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                }}
            />
            </div>


      </motion.div>

    </section>
  )
}

export default Hero