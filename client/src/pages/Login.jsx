import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const location = useLocation()
  const { saveAuthentication } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage("")

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Unable to log in.")
      }

      saveAuthentication(data.token, data.user)

      const destination = location.state?.from || "/"

      navigate(destination, { replace: true })
    } catch (error) {
      console.error("Login failed:", error)
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Customer Account
          </p>

          <h1 className="mt-4 text-5xl font-serif">
            Log In
          </h1>

          <p className="mt-4 text-gray-400">
            Access your Worlbess account and order history.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-yellow-500/20 bg-[#111111] p-8"
        >
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <div>
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
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Need an account?{" "}
            <Link
              to="/register"
              className="text-yellow-500 transition hover:text-yellow-400"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login