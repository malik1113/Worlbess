import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"

const navigationLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Story", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Cart", path: "/cart" },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-yellow-600/30 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-serif tracking-wider text-green-500 md:text-3xl"
          >
            WORLBESS BODEGA
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 text-white md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition hover:text-yellow-500 ${
                  location.pathname === link.path
                    ? "text-yellow-500"
                    : "text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.label}

                  {link.label === "Cart" && cartCount > 0 && (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-500 px-2 text-xs font-bold text-black">
                      {cartCount}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((currentState) => !currentState)}
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-yellow-500/40 text-yellow-500 md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block h-0.5 w-5 bg-yellow-500"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 8 : 0,
              }}
            />

            <motion.span
              className="block h-0.5 w-5 bg-yellow-500"
              animate={{
                opacity: menuOpen ? 0 : 1,
              }}
            />

            <motion.span
              className="block h-0.5 w-5 bg-yellow-500"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -8 : 0,
              }}
            />
          </button>

        </div>
      </nav>

      {/* MOBILE SLIDE-OUT MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.aside
              className="fixed right-0 top-0 z-40 flex h-full w-[85%] max-w-sm flex-col border-l border-yellow-500/20 bg-[#090909] px-8 pb-10 pt-28 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
                Navigation
              </p>

              <nav className="mt-10 flex flex-col gap-3">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-serif transition hover:text-yellow-500 ${
                        location.pathname === link.path
                          ? "text-yellow-500"
                          : "text-white"
                      }`}
                    >
                      <span>{link.label}</span>

                      {link.label === "Cart" && cartCount > 0 && (
                        <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-yellow-500 px-2 text-xs font-bold text-black">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto border-t border-white/10 pt-8">
                <p className="text-sm leading-6 text-gray-400">
                  Ancient craftsmanship.
                  <br />
                  Modern excellence.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar