import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImage from "../assets/story/story-image.png";
import SEO from "../components/SEO";

function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SEO
        title="Our Story | Worlbess"
        description="Discover the Worlbess story, inspired by traditional craftsmanship, natural materials, patience, and respect for premium tobacco leaf."
      />

      {/* HERO */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-8 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-[#1a1305]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
              The Worlbess Story
            </p>

            <h1 className="mt-5 text-5xl font-serif leading-tight md:text-7xl">
              Some Traditions Cannot Be Rushed
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
              Worlbess represents the meeting point between ancient
              craftsmanship and modern excellence—a premium brand built on
              patience, quality, and respect for the leaf.
            </p>
          </motion.div>

          <motion.div
            className="relative min-h-[360px] overflow-hidden rounded-3xl border border-yellow-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={aboutImage}
              alt="Traditional Worlbess tobacco craftsmanship"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 z-10 p-10">
              <p className="text-sm uppercase tracking-[0.4em] text-yellow-500">
                Heritage
              </p>

              <h2 className="mt-5 text-4xl font-serif text-white">
                Ancient Craftsmanship
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-[#0d0d0d] px-8 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Inspired by Heritage
            </p>

            <h2 className="mt-4 text-4xl font-serif leading-tight md:text-5xl">
              Crafted With Patience and Purpose
            </h2>
          </motion.div>

          <motion.div
            className="space-y-6 text-lg leading-8 text-gray-300"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p>
              Long before modern factories and mass production, master leaf
              craftsmen across North Africa and the Arabian Peninsula refined
              the art of selecting, curing, and preparing exceptional tobacco by
              hand, in the pursuit of the perfect blend.
            </p>

            <p>
              Their knowledge was shaped through generations of observation,
              patience, and careful practice. Every leaf was judged by sight,
              touch, texture, balance, taste, and character.
            </p>

            <p>
              Inspired by this heritage, Worlbess embraces the belief that
              exceptional quality begins with the skilled hands of a Master,
              natural materials, and respect for the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-black px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Our Principles
            </p>

            <h2 className="mt-4 text-4xl font-serif md:text-5xl">
              Quality Before Shortcuts
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              Worlbess is built around timeless standards that guide every
              product, every customer experience, and every decision.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Organic Focused",
                text: "A commitment to thoughtfully selected natural materials.",
              },
              {
                title: "Scent Free",
                text: "Products prepared without unnecessary added fragrance.",
              },
              {
                title: "Chemical Free",
                text: "A focus on traditional preparation without modern shortcuts.",
              },
              {
                title: "Hand Selected",
                text: "Careful attention to quality, consistency, and character.",
              },
            ].map((value, index) => (
              <motion.article
                key={value.title}
                className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-8"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
              >
                <div className="h-px w-12 bg-yellow-500" />

                <h3 className="mt-6 text-2xl font-serif text-white">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">{value.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section className="bg-[#0d0d0d] px-8 py-24">
        <motion.div
          className="mx-auto max-w-5xl rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#171717] to-black px-8 py-16 text-center md:px-16"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
            The Brand Promise
          </p>

          <h2 className="mt-6 text-4xl font-serif leading-tight md:text-6xl">
            Tradition Before Shortcuts.
            <br />
            Craftsmanship Before Convenience.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl leading-8 text-gray-300">
            Worlbess exists to deliver premium products with authenticity, care,
            and a standard worthy of the name: the world's best.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full border border-yellow-500 px-8 py-4 text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300"
          >
            Explore the Collection
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

export default About;
