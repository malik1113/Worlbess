import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react"
  
  const CartContext = createContext(null)
  
  const CART_STORAGE_KEY = "worlbess-cart"
  
  function loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
  
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error("Unable to load cart from localStorage:", error)
      return []
    }
  }
  
  export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(loadCartFromStorage)
  
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
  
    function addToCart(product) {
      setCartItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.id === product.id
        )
  
        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
  
        return [...currentItems, { ...product, quantity: 1 }]
      })
    }
  
    function increaseQuantity(productId) {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }
  
    function decreaseQuantity(productId) {
      setCartItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      )
    }
  
    function removeFromCart(productId) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      )
    }
  
    function clearCart() {
      setCartItems([])
    }
  
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