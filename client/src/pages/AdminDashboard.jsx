import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/admin",
        },
      });

      return;
    }

    if (user?.role !== "admin") {
      navigate("/account", {
        replace: true,
      });
    }
  }, [isAuthenticated, isLoading, navigate, user]);
  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoadingProducts(true);
        setErrorMessage("");

        const response = await fetch(`${API_URL}/api/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load products.");
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Admin product loading failed:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
  }, [API_URL]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-gray-400">
            Loading administration tools...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Administration
          </p>

          <h1 className="mt-4 text-5xl font-serif">Worlbess Admin Dashboard</h1>

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
        <section className="mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-yellow-500">
                Catalog
              </p>

              <h2 className="mt-2 text-3xl font-serif">Product Management</h2>
            </div>

            <button
              type="button"
              className="rounded-full bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
            >
              Add Product
            </button>
          </div>

          {isLoadingProducts && (
            <p className="mt-8 text-gray-400">Loading products...</p>
          )}

          {errorMessage && (
            <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
              {errorMessage}
            </div>
          )}

          {!isLoadingProducts && !errorMessage && products.length === 0 && (
            <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-[#111111] p-8">
              <p className="text-gray-400">
                No products are currently available.
              </p>
            </div>
          )}

          {!isLoadingProducts && !errorMessage && products.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111]">
              <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/10 px-6 py-4 text-sm uppercase tracking-[0.15em] text-gray-400 md:grid">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Actions</span>
              </div>

              <div className="divide-y divide-white/10">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="grid gap-4 px-6 py-5 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center"
                  >
                    <div>
                      <p className="font-medium text-white">{product.name}</p>

                      <p className="mt-1 text-sm text-gray-400">
                        {product.featured
                          ? "Featured product"
                          : "Standard product"}
                      </p>
                    </div>

                    <p className="text-gray-300">{product.category}</p>

                    <p className="text-gray-300">${product.price.toFixed(2)}</p>

                    <p
                      className={
                        product.stock === 0
                          ? "text-red-400"
                          : product.stock <= 10
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      {product.stock}
                    </p>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-full border border-yellow-500/40 px-4 py-2 text-sm text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="rounded-full border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
