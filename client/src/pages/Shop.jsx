import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const categories = ["All", "Leaf", "Grabba", "Accessories", "Apparel"];

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Unable to load products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Product request failed:", error);
        setError("We could not load the Worlbess collection.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchingProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        normalizedSearch === "" ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const numericMinPrice = minPrice === "" ? null : Number(minPrice);

      const numericMaxPrice = maxPrice === "" ? null : Number(maxPrice);

      const matchesMinPrice =
        numericMinPrice === null || product.price >= numericMinPrice;

      const matchesMaxPrice =
        numericMaxPrice === null || product.price <= numericMaxPrice;

      return (
        matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
      );
    });

    return [...matchingProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        case "name-az":
          return a.name.localeCompare(b.name);

        case "name-za":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });
  }, [products, selectedCategory, searchTerm, sortOption, minPrice, maxPrice]);

  return (
    <main className="min-h-screen bg-black px-8 pt-32 pb-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Worlbess Collection
          </p>

          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Shop</h1>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-400">
            Explore premium leaf, grabba, accessories, and apparel selected with
            quality and craftsmanship in mind.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>

          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-yellow-500/30 bg-[#111111] px-6 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500"
          />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-6 py-3 transition duration-300 ${
                selectedCategory === category
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-yellow-500/40 text-yellow-500 hover:border-yellow-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label
              htmlFor="min-price"
              className="mb-2 block text-sm text-gray-400"
            >
              Minimum price
            </label>

            <input
              id="min-price"
              type="number"
              min="0"
              step="0.01"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="$0"
              className="w-full rounded-full border border-yellow-500/30 bg-[#111111] px-5 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="max-price"
              className="mb-2 block text-sm text-gray-400"
            >
              Maximum price
            </label>

            <input
              id="max-price"
              type="number"
              min="0"
              step="0.01"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="No maximum"
              className="w-full rounded-full border border-yellow-500/30 bg-[#111111] px-5 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div>
            <label htmlFor="product-sort" className="sr-only">
              Sort products
            </label>

            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="rounded-full border border-yellow-500/30 bg-[#111111] px-6 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>

        {isLoading && (
          <p className="mt-16 text-center text-gray-400">
            Loading the Worlbess collection...
          </p>
        )}

        {error && !isLoading && (
          <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-red-500/30 bg-red-950/20 p-6 text-center">
            <p className="text-red-300">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full border border-yellow-500 px-5 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#111111] transition duration-300 hover:border-yellow-500/60"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c1c1c] to-black">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="px-6 text-center text-gray-500">
                      Product image coming soon
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-sm uppercase tracking-widest text-yellow-500">
                    {product.category}
                  </p>

                  <h2 className="mt-3 font-serif text-xl text-white">
                    {product.name}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {product.description}
                  </p>

                  <p className="mt-3 text-sm">
                    {product.stock > 0 ? (
                      <span className="text-green-400">
                        In stock: {product.stock}
                      </span>
                    ) : (
                      <span className="text-red-400">Out of stock</span>
                    )}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-lg text-white">
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="relative z-50 rounded-full border border-yellow-500 px-4 py-2 text-yellow-500 transition duration-300 hover:bg-yellow-500 hover:text-black"
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <p className="mt-16 text-center text-gray-400">
            No products are currently available in this category.
          </p>
        )}
      </div>
    </main>
  );
}

export default Shop;
