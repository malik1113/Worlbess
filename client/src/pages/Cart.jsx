import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";

function Cart() {
  const {
    cartItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
        <SEO
          title="Shopping Cart | Worlbess"
          description="Review the products in your Worlbess shopping cart before proceeding to secure checkout."
        />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Your Cart
          </p>

          <h1 className="mt-4 font-serif text-5xl">Your Cart Is Empty</h1>

          <p className="mt-6 text-gray-400">
            Explore the Worlbess collection and add something exceptional.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full bg-yellow-500 px-8 py-3 text-black transition hover:bg-yellow-400"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
      <SEO
        title="Shopping Cart | Worlbess"
        description="Review the products in your Worlbess shopping cart before proceeding to secure checkout."
      />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Your Selection
            </p>

            <h1 className="mt-4 font-serif text-5xl">Shopping Cart</h1>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-gray-400 transition hover:text-yellow-500"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            {cartItems.map((item) => (
              <article
                key={item._id}
                className="grid gap-6 rounded-2xl border border-yellow-500/20 bg-[#111111] p-6 sm:grid-cols-[140px_1fr]"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-[#1a1a1a]">
                  {item.image ? (
                    <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-500">
                      Product image coming soon
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-6">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-yellow-500">
                        {item.category}
                      </p>

                      <h2 className="mt-2 font-serif text-2xl">{item.name}</h2>
                    </div>

                    <p className="text-xl text-yellow-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center overflow-hidden rounded-full border border-yellow-500/40">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item._id)}
                          className="px-4 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span className="min-w-12 text-center">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          disabled={item.quantity >= item.stock}
                          className="px-4 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.stock - item.quantity} remaining
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="text-sm text-gray-400 transition hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-2xl border border-yellow-500/30 bg-[#111111] p-8">
            <h2 className="font-serif text-3xl">Order Summary</h2>

            <div className="mt-8 space-y-4 border-b border-white/10 pb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between text-xl">
              <span>Estimated Total</span>
              <span className="text-yellow-500">${subtotal.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="mt-8 block rounded-full bg-yellow-500 px-8 py-4 text-center font-semibold text-black transition hover:bg-yellow-400"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="mt-4 block text-center text-sm text-gray-400 transition hover:text-yellow-500"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
