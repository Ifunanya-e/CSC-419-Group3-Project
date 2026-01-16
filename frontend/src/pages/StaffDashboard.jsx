import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Group1.png";
import { useAuth } from "../context/AuthContext";
import { searchProducts, getLowStockProducts } from "../api/products";
import api from "../api/client";

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [isLoadingLowStock, setIsLoadingLowStock] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  // Get the actual logged-in user
  const { user } = useAuth();

  // Use real user data or fallback to defaults
  const displayUser = {
    name: user?.full_name || "User",
    role: user?.role || "Staff",
    email: user?.email || "user@example.com"
  };

  // Fetch low stock products on component mount
  useEffect(() => {
    async function fetchLowStock() {
      try {
        const lowStockItems = await getLowStockProducts();
        // Count the number of low stock items
        setLowStockCount(Array.isArray(lowStockItems) ? lowStockItems.length : 0);
      } catch (error) {
        console.error("Failed to fetch low stock items:", error);
        setLowStockCount(0);
      } finally {
        setIsLoadingLowStock(false);
      }
    }

    fetchLowStock();
  }, []); // Empty dependency array means this runs once on mount

  // Fetch total products count
  useEffect(() => {
    async function fetchProductsCount() {
      try {
        const response = await api.get("/products/");
        setTotalProducts(Array.isArray(response.data) ? response.data.length : 0);
      } catch (error) {
        console.error("Failed to fetch products count:", error);
        setTotalProducts(0);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    fetchProductsCount();
  }, []);

  // Handle search
  async function handleSearch(query) {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#02063E] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white p-2"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img src={logo} alt="Warehouse X" className="h-12 brightness-0 invert" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Inventory Management</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">🚚</span>
            <span className="font-medium">Shipment</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="text-xl">💰</span>
            <span className="font-medium">Cashier</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-[#02063E] font-bold text-lg">
                {displayUser.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{displayUser.role}</p>
              <p className="text-xs text-white/70 truncate">{displayUser.name}</p>
              <p className="text-xs text-white/60 truncate">{displayUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:w-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl relative">
              <div className="relative">
                <FaSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                />
              </div>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y">
                      {searchResults.map((product, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setShowResults(false);
                            // Handle product selection here
                            console.log("Selected product:", product);
                          }}
                        >
                          <p className="font-medium text-sm">{product.name || product.title}</p>
                          {product.description && (
                            <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                          )}
                          {product.price && (
                            <p className="text-xs text-[#02063E] font-semibold mt-1">
                              ${product.price}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No products found
                    </div>
                  )}
                  <button
                    onClick={() => setShowResults(false)}
                    className="w-full p-2 text-xs text-gray-600 hover:bg-gray-50 border-t"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 md:gap-6">
              <h1 className="hidden sm:block text-lg md:text-2xl font-bold">WELCOME</h1>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-lg md:text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <button className="bg-[#02063E] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#03074d] transition-colors">
              Priority Task
            </button>
            <button className="bg-[#02063E] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-[#03074d] transition-colors">
              Scan Barcode
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* New Pickup Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 flex items-center justify-center min-h-[120px] md:min-h-[150px]">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-[#02063E]">NEW</p>
                <p className="text-xl md:text-2xl font-bold text-[#02063E]">PICKUP</p>
              </div>
            </div>

            {/* Alert Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[150px] relative">
              <p className="text-red-600 font-bold mb-2">ALERT</p>
              {isLoadingLowStock ? (
                <p className="text-gray-600 font-semibold text-sm md:text-base">Loading...</p>
              ) : (
                <p className="text-red-600 font-semibold text-sm md:text-base">
                  {lowStockCount} {lowStockCount === 1 ? 'Stock is' : 'Stocks are'} LOW
                </p>
              )}
              <svg className="absolute bottom-4 right-4 w-24 h-16 md:w-32 md:h-20" viewBox="0 0 100 50">
                <polyline
                  points="0,25 20,20 40,15 60,30 80,35 100,45"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Pending Shipment Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[120px] md:min-h-[150px]">
              <p className="text-xs md:text-sm text-gray-700 mb-2">Pending Shipment</p>
              <p className="text-5xl md:text-6xl font-bold text-[#02063E]">57</p>
            </div>

            {/* SKU Count Card */}
            <div className="bg-gray-200 rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[150px]">
              <p className="text-base md:text-lg font-bold text-[#02063E] mb-4">SKU COUNT</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm text-gray-700 w-16 md:w-20">Open</span>
                  <div className="flex-1 h-5 md:h-6 bg-[#02063E] rounded max-w-[150px] md:max-w-[200px]"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs md:text-sm text-gray-700 w-16 md:w-20">In Review</span>
                  <div className="flex-1 h-5 md:h-6 bg-[#02063E] rounded max-w-[180px] md:max-w-[250px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold">Activity Feed</h2>
              <button className="text-xs md:text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span>⛶</span>
                <span className="hidden sm:inline">Expand</span>
              </button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1 md:mt-0 flex-shrink-0"></div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 border-b border-gray-100 gap-2">
                  <span className="text-xs md:text-sm">Purchase for washing machine</span>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">13:00</p>
                    <p className="text-xs text-gray-500">09 March, 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-1 md:mt-0 flex-shrink-0"></div>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 md:py-3 border-b border-gray-100 gap-2">
                  <span className="text-xs md:text-sm">Restock</span>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">13:00</p>
                    <p className="text-xs text-gray-500">09 March, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}