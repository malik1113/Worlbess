function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-600/30">
  
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
  
          <h1 className="text-3xl font-serif tracking-wider text-yellow-500">
            WORLBESS
          </h1>
  
  
          <div className="hidden md:flex space-x-8 text-white">
  
            <a 
              href="#" 
              className="hover:text-yellow-500 transition"
            >
              Home
            </a>
  
            <a 
              href="#" 
              className="hover:text-yellow-500 transition"
            >
              Shop
            </a>
  
            <a 
              href="#" 
              className="hover:text-yellow-500 transition"
            >
              Story
            </a>
  
            <a 
              href="#" 
              className="hover:text-yellow-500 transition"
            >
              Contact
            </a>
  
            <a 
              href="#" 
              className="text-yellow-500"
            >
              Cart
            </a>
  
          </div>
  
        </div>
  
      </nav>
    )
  }
  
  export default Navbar