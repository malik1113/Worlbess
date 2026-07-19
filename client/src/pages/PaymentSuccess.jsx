import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

function PaymentSuccess() {
  const API_URL = import.meta.env.VITE_API_URL

  const { token } = useAuth()
  const { clearCart } = useCart()

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [status, setStatus] = useState("verifying")
  const [message, setMessage] = useState(
    "Confirming your secure payment..."
  )
  const [order, setOrder] = useState(null)

  const hasVerified = useRef(false)

  useEffect(() => {
    async function verifyPayment() {
      if (hasVerified.current) {
        return
      }

      hasVerified.current = true

      if (!token) {
        setStatus("error")
        setMessage(
          "Please log in again to view your payment confirmation."
        )
        return
      }

      if (!sessionId) {
        setStatus("error")
        setMessage("The Stripe Checkout Session ID is missing.")
        return
      }

      try {
        const response = await fetch(
          `${API_URL}/api/payments/verify-session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to verify your payment."
          )
        }

        if (!data.paid) {
          setStatus("pending")
          setMessage(
            "Your payment is still being processed. Please check your account order history shortly."
          )
          return
        }

        clearCart()
        setOrder(data.order)
        setStatus("success")
        setMessage("Your payment was successful.")
      } catch (error) {
        console.error("Payment verification failed:", error)
        setStatus("error")
        setMessage(error.message)
      }
    }

    verifyPayment()
  }, [API_URL, clearCart, sessionId, token])

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-2xl rounded-3xl border border-yellow-500/30 bg-[#111111] p-8 text-center md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Secure Payment
        </p>

        {status === "verifying" && (
          <>
            <h1 className="mt-5 text-4xl font-serif">
              Verifying Payment
            </h1>

            <p className="mt-5 text-gray-300">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="mt-5 text-4xl font-serif">
              Payment Confirmed
            </h1>

            <p className="mt-5 text-gray-300">{message}</p>

            {order && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-black p-6 text-left">
                <p className="text-gray-400">Order number</p>

                <p className="mt-1 break-all text-white">
                  {order._id}
                </p>

                <p className="mt-5 text-gray-400">Customer</p>

                <p className="mt-1 text-white">
                  {order.customerName}
                </p>

                <p className="mt-5 text-gray-400">Items</p>

                <p className="mt-1 text-white">
                  {order.itemCount}
                </p>

                <p className="mt-5 text-gray-400">Total paid</p>

                <p className="mt-1 text-xl text-yellow-500">
                  ${Number(order.total).toFixed(2)}
                </p>
              </div>
            )}

            <Link
              to="/account"
              className="mt-8 inline-block rounded-full bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              View My Orders
            </Link>
          </>
        )}

        {status === "pending" && (
          <>
            <h1 className="mt-5 text-4xl font-serif">
              Payment Processing
            </h1>

            <p className="mt-5 text-gray-300">{message}</p>

            <Link
              to="/account"
              className="mt-8 inline-block rounded-full border border-yellow-500 px-8 py-3 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              View My Orders
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="mt-5 text-4xl font-serif">
              Verification Problem
            </h1>

            <p className="mt-5 text-red-300">{message}</p>

            <Link
              to="/account"
              className="mt-8 inline-block rounded-full border border-yellow-500 px-8 py-3 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Check My Orders
            </Link>
          </>
        )}
      </section>
    </main>
  )
}

export default PaymentSuccess