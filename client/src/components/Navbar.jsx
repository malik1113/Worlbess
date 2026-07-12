import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Navbar() {
  const { cartCount } = useCart()
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-serif tracking-wider text-yellow-500"
        >
          WORLBESS
        </Link>

        <div className="hidden md:flex space-x-8 text-white">
          <Link to="/" className="hover:text-yellow-500 transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-yellow-500 transition">
            Shop
          </Link>

          <Link to="/about" className="hover:text-yellow-500 transition">
            Story
          </Link>

          <Link to="/contact" className="hover:text-yellow-500 transition">
            Contact
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 text-yellow-500"
          >
            Cart

            {cartCount > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-500 px-2 text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar