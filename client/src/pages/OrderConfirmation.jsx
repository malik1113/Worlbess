import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";

function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-8 pb-24 pt-32 text-white">
        <SEO
          title="Order Confirmation | Worlbess"
          description="View your Worlbess order confirmation and purchase details."
        />
        <div className="max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-500">
            Worlbess
          </p>

          <h1 className="mt-5 text-5xl font-serif">No Order Found</h1>

          <p className="mt-6 leading-8 text-gray-400">
            This confirmation page must be opened after completing checkout.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400 transition"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
      <SEO
        title="Order Confirmed | Worlbess"
        description="Your Worlbess order has been received successfully."
      />
      <div className="mx-auto max-w-5xl">
        <motion.section
          className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-[#171717] to-black px-8 py-16 text-center md:px-16"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-yellow-500 bg-yellow-500/10 text-5xl text-yellow-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.25,
              type: "spring",
              stiffness: 220,
              damping: 16,
            }}
          >
            ✓
          </motion.div>

          <p className="mt-10 text-sm uppercase tracking-[0.35em] text-yellow-500">
            Order Confirmed
          </p>

          <h1 className="mt-5 text-5xl font-serif md:text-7xl">
            Thank You, {order.customerName}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-300">
            Your Worlbess order has been received. A confirmation email will be sent to
            <span className="text-white">{order.email}</span>.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Order Number
              </p>

              <p className="mt-3 text-xl text-yellow-500">
                {order.orderNumber}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Order Total
              </p>

              <p className="mt-3 text-xl text-yellow-500">
                ${order.total.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Items
              </p>

              <p className="mt-3 text-xl text-white">{order.itemCount}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Status
              </p>

              <p className="mt-3 text-xl text-green-400">Received</p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-yellow-500/20 bg-[#0d0d0d] p-8 text-left">
            <h2 className="text-3xl font-serif">What Happens Next?</h2>

            <div className="mt-7 space-y-6">
              <div className="flex gap-5">
                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
                  1
                </span>

                <div>
                  <h3 className="text-lg text-white">Order Review</h3>

                  <p className="mt-1 text-gray-400">
                    Your order and age-verification information will be
                    reviewed.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
                  2
                </span>

                <div>
                  <h3 className="text-lg text-white">Processing</h3>

                  <p className="mt-1 text-gray-400">
                    Approved orders will be prepared for shipment.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-black">
                  3
                </span>

                <div>
                  <h3 className="text-lg text-white">Shipping Update</h3>

                  <p className="mt-1 text-gray-400">
                    Tracking information will be provided when shipping is
                    connected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400 transition"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="rounded-full border border-yellow-500 px-8 py-4 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
            >
              Return Home
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default OrderConfirmation;
