import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useToast } from "./ToastContext.jsx"

const CartContext = createContext(null)

const CART_STORAGE_KEY = "worlbess-cart"

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!savedCart) {
      return []
    }

    const parsedCart = JSON.parse(savedCart)

    if (!Array.isArray(parsedCart)) {
      return []
    }

    return parsedCart.filter(
      (item) =>
        item &&
        (item._id || item.id) &&
        Number.isFinite(item.price) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    )
  } catch (error) {
    console.error("Unable to load cart from localStorage:", error)
    return []
  }
}

function getProductId(product) {
  return product._id || product.id
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage)

  const { showToast } = useToast()

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      )
    } catch (error) {
      console.error("Unable to save cart to localStorage:", error)
    }
  }, [cartItems])

}
  // ======================================================
// CART ACTIONS
// ======================================================

// Add product to shopping cart
// Displays toast notifications for success and stock errors
function addToCart(product) {
  function addToCart(product) {
    const productId = getProductId(product)
  
    if (!productId) {
      showToast("Unable to add this product to the cart.", "error")
      return
    }
  
    if (product.stock <= 0) {
      showToast(`${product.name} is out of stock.`, "error")
      return
    }
  
    let notificationMessage = `${product.name} added to cart.`
    let notificationType = "success"
  
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => getProductId(item) === productId
      )
  
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          notificationMessage = `Only ${product.stock} ${product.name} available.`
          notificationType = "error"
  
          return currentItems
        }
  
        return currentItems.map((item) =>
          getProductId(item) === productId
            ? {
                ...item,
                stock: product.stock,
                quantity: item.quantity + 1,
              }
            : item
        )
      }
  
      return [
        ...currentItems,
        {
          ...product,
          _id: productId,
          quantity: 1,
        },
      ]
    })
  
    showToast(notificationMessage, notificationType)
  }

  // Increase quantity of an existing cart item
  function increaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (getProductId(item) !== productId) {
          return item
        }

        if (item.quantity >= item.stock) {
          return item
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        }
      })
    )
  }


  // Decrease quantity or remove item when quantity reaches zero
  function decreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getProductId(item) === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove an item completely from the shopping cart
  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => getProductId(item) !== productId
      )
    )
  }

  // Empty the shopping cart after successful checkout
  function clearCart() {
    setCartItems([])
  }


  // ======================================================
  // CART TOTALS
  // ======================================================
  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  )

  const value = {
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}
