import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Shop from "./pages/Shop"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Footer from "./components/Footer"
import OrderConfirmation from "./pages/OrderConfirmation"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-confirmation" 
          element={<OrderConfirmation />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App