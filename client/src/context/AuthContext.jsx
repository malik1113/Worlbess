import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react"
  
  const AuthContext = createContext(null)
  
  const TOKEN_STORAGE_KEY = "worlbess-token"
  
  export function AuthProvider({ children }) {
    const API_URL = import.meta.env.VITE_API_URL
  
    const [token, setToken] = useState(() =>
      localStorage.getItem(TOKEN_STORAGE_KEY)
    )
  
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      async function loadUser() {
        if (!token) {
          setUser(null)
          setIsLoading(false)
          return
        }
  
        try {
          const response = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
  
          const data = await response.json()
  
          if (!response.ok) {
            throw new Error(data.message || "Unable to load user profile.")
          }
  
          setUser(data.user)
        } catch (error) {
          console.error("Authentication check failed:", error)
  
          localStorage.removeItem(TOKEN_STORAGE_KEY)
          setToken(null)
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      }
  
      loadUser()
    }, [API_URL, token])
  
    function saveAuthentication(authToken, authenticatedUser) {
      localStorage.setItem(TOKEN_STORAGE_KEY, authToken)
      setToken(authToken)
      setUser(authenticatedUser)
    }
  
    function logout() {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      setToken(null)
      setUser(null)
    }
  
    const value = useMemo(
      () => ({
        token,
        user,
        isLoading,
        isAuthenticated: Boolean(token && user),
        saveAuthentication,
        logout,
      }),
      [token, user, isLoading]
    )
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    const context = useContext(AuthContext)
  
    if (!context) {
      throw new Error("useAuth must be used inside AuthProvider")
    }
  
    return context
  }