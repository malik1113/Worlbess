import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

function Account() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { user, token, isLoading: isAuthLoading, isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/account",
        },
      });

      return;
    }

    async function loadOrders() {
      try {
        setIsLoadingOrders(true);
        setErrorMessage("");

        const response = await fetch(`${API_URL}/api/orders/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your orders.");
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Order history failed:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoadingOrders(false);
      }
    }

    loadOrders();
  }, [API_URL, isAuthLoading, isAuthenticated, navigate, token]);

  if (isAuthLoading || isLoadingOrders) {
    return (
      <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
        <SEO
          title="My Account | Worlbess"
          description="View your Worlbess customer account and order history."
        />
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-gray-400">Loading your account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white">
      <SEO
        title="My Account | Worlbess"
        description="View your Worlbess customer account and order history."
      />
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Customer Account
          </p>

          <h1 className="mt-4 text-5xl font-serif">Welcome, {user?.name}</h1>

          <p className="mt-3 text-gray-400">{user?.email}</p>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-serif">Order History</h2>

          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
              {errorMessage}
            </div>
          )}

          {!errorMessage && orders.length === 0 && (
            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-[#111111] p-8">
              <p className="text-gray-400">
                You have not placed any orders yet.
              </p>
            </div>
          )}

          {!errorMessage && orders.length > 0 && (
            <div className="mt-6 space-y-6">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-2xl border border-yellow-500/20 bg-[#111111] p-6"
                >
                  <div className="flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Order</p>

                      <p className="mt-1 font-medium text-white">
                        #{order._id}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-sm text-gray-400">Status</p>

                      <p className="mt-1 text-yellow-500">{order.status}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={`${order._id}-${item.product?._id || item.name}`}
                        className="flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-white">{item.name}</p>

                          <p className="mt-1 text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-gray-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-lg font-semibold text-yellow-500">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Account;
