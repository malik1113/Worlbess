import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function AdminDashboard() {
  const navigate = useNavigate()

  const {
    user,
    isLoading,
    isAuthenticated,
  } = useAuth()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/admin",
        },
      })

      return
    }

    if (user?.role !== "admin") {
      navigate("/account", {
        replace: true,
      })
    }
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    user,
  ])

  if (isLoading || !user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-gray-400">
            Loading administration tools...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Administration
          </p>

          <h1 className="mt-4 text-5xl font-serif">
            Worlbess Admin Dashboard
          </h1>

          <p className="mt-4 text-gray-400">
            Manage products, inventory, and customer orders.
          </p>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Products
            </p>

            <p className="mt-4 text-3xl font-serif text-yellow-500">
              Product Management
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Inventory
            </p>

            <p className="mt-4 text-3xl font-serif text-yellow-500">
              Stock Controls
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Orders
            </p>

            <p className="mt-4 text-3xl font-serif text-yellow-500">
              Order Management
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard