import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-[#080808] px-8 pt-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">

        <section>
          <Link
            to="/"
            className="text-3xl font-serif tracking-widest text-yellow-500"
          >
            WORLBESS
          </Link>

          <p className="mt-5 max-w-sm leading-7 text-gray-400">
            Ancient craftsmanship. Modern excellence. Premium products selected
            with patience, care, and respect for the leaf.
          </p>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Shop
          </h2>

          <nav className="mt-5 flex flex-col gap-3 text-gray-300">
            <Link to="/shop" className="hover:text-yellow-500 transition">
              Leaf
            </Link>

            <Link to="/shop" className="hover:text-yellow-500 transition">
              Grabba
            </Link>

            <Link to="/shop" className="hover:text-yellow-500 transition">
              Accessories
            </Link>

            <Link to="/shop" className="hover:text-yellow-500 transition">
              Apparel
            </Link>
          </nav>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Company
          </h2>

          <nav className="mt-5 flex flex-col gap-3 text-gray-300">
            <Link to="/about" className="hover:text-yellow-500 transition">
              Our Story
            </Link>

            <Link to="/contact" className="hover:text-yellow-500 transition">
              Contact
            </Link>

            <Link to="/contact" className="hover:text-yellow-500 transition">
              FAQ
            </Link>

            <span className="text-gray-500">
              Shipping
            </span>

            <span className="text-gray-500">
              Returns
            </span>
          </nav>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Newsletter
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            Receive product news, collection releases, and Worlbess updates.
          </p>

          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault()
              window.alert(
                "Newsletter signup is working. Email delivery will be connected later."
              )
            }}
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none focus:border-yellow-500"
            />

            <button
              type="submit"
              className="mt-3 w-full rounded-full border border-yellow-500 px-5 py-3 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
            >
              Subscribe
            </button>
          </form>
        </section>

      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-6 border-t border-white/10 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

        <p>
          © {new Date().getFullYear()} Worlbess. All rights reserved.
        </p>

        <div className="flex flex-wrap gap-5">
          <span>Instagram</span>
          <span>TikTok</span>
          <span>Facebook</span>
          <span>YouTube</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer