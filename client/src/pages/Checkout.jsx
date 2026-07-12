import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Checkout() {
  const { cartItems, subtotal } = useCart()

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    ageConfirmed: false,
  })

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.ageConfirmed) {
      window.alert("You must confirm that you meet the legal age requirement.")
      return
    }

    console.log("Checkout information:", formData)
    console.log("Order items:", cartItems)

    window.alert(
      "Checkout form is working. Payment processing will be connected later."
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Checkout
          </p>

          <h1 className="mt-4 text-5xl font-serif">
            Your Cart Is Empty
          </h1>

          <p className="mt-6 text-gray-400">
            Add products to your cart before continuing to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-block rounded-full bg-yellow-500 px-8 py-3 text-black hover:bg-yellow-400 transition"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black px-8 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Secure Checkout
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-serif">
            Complete Your Order
          </h1>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-8"
          >
            <section>
              <h2 className="text-3xl font-serif">
                Contact Information
              </h2>

              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-3xl font-serif">
                Shipping Address
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-gray-300"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-gray-300"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="address"
                  className="block text-sm text-gray-300"
                >
                  Street address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="apartment"
                  className="block text-sm text-gray-300"
                >
                  Apartment, suite, or unit
                </label>

                <input
                  id="apartment"
                  name="apartment"
                  type="text"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm text-gray-300"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm text-gray-300"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm text-gray-300"
                  >
                    ZIP code
                  </label>

                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="phone"
                  className="block text-sm text-gray-300"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>
            </section>

            <label className="mt-8 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-black p-4">
              <input
                name="ageConfirmed"
                type="checkbox"
                checked={formData.ageConfirmed}
                onChange={handleChange}
                className="mt-1 h-5 w-5"
              />

              <span className="text-sm leading-6 text-gray-300">
                I confirm that I meet the legal age requirement to purchase
                tobacco products in my location.
              </span>
            </label>

            <button
              type="submit"
              className="mt-8 w-full rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400 transition"
            >
              Continue to Payment
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-yellow-500/30 bg-[#111111] p-8">
            <h2 className="text-3xl font-serif">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b border-white/10 pb-5"
                >
                  <div>
                    <p className="text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="text-yellow-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Calculated later</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>Calculated later</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-white/10 pt-6 text-xl">
              <span>Estimated Total</span>

              <span className="text-yellow-500">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <Link
              to="/cart"
              className="mt-6 block text-center text-sm text-gray-400 hover:text-yellow-500 transition"
            >
              Return to Cart
            </Link>
          </aside>

        </div>
      </div>
    </main>
  )
}

export default Checkout