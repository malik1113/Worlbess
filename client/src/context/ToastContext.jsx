// ======================================================
// WORLBESS TOAST NOTIFICATION SYSTEM
// Used throughout the application for customer feedback
// ======================================================
  import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
  } from "react"
  
  const ToastContext = createContext(null)
  
  export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null)
    const timeoutRef = useRef(null)
  
    // Display a temporary notification
    const showToast = useCallback((message, type = "success") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
  
      setToast({
        message,
        type,
      })
  
      timeoutRef.current = setTimeout(() => {
        setToast(null)
        timeoutRef.current = null
      }, 3000)
    }, [])
  
    // Close the current notification immediately
    const hideToast = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
  
      setToast(null)
    }, [])
  
    // Render the active toast notification
    return (
      <ToastContext.Provider value={{ showToast }}>
        {children}
  
        {toast && (
          <div className="fixed top-24 right-6 z-[100] max-w-sm">
            <div
              role="status"
              className={`rounded-2xl border px-5 py-4 shadow-2xl ${
                toast.type === "error"
                  ? "border-red-500/40 bg-red-950 text-red-200"
                  : "border-yellow-500/40 bg-[#111111] text-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <p className="flex-1">{toast.message}</p>
  
                <button
                  type="button"
                  onClick={hideToast}
                  aria-label="Close notification"
                  className="text-gray-400 transition hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </ToastContext.Provider>
    )
  }
  
  export function useToast() {
    const context = useContext(ToastContext)
  
    if (!context) {
      throw new Error("useToast must be used inside ToastProvider")
    }
  
    return context
  }