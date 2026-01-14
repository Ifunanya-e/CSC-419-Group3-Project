import { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import logo from "../assets/Group1.png";

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // This would come from your auth context or props
  const user = {
    name: "Ayo Bankole",
    role: "Staff",
    email: "oladiramustopha@mail.com"
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#02063E] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img src={logo} alt="Warehouse X" className="h-12 brightness-0 invert" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Inventory Management</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">🚚</span>
            <span className="font-medium">Shipment</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">💰</span>
            <span className="font-medium">Cashier</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-[#02063E] font-bold text-lg">
                {user.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.role}</p>
              <p className="text-xs text-white/70">{user.name}</p>
              <p className="text-xs text-white/60 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold">WELCOME</h1>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button className="bg-[#02063E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#03074d] transition-colors">
              Priority Task
            </button>
            <button className="bg-[#02063E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#03074d] transition-colors">
              Scan Barcode
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* New Pickup Card */}
            <div className="bg-gray-200 rounded-2xl p-8 flex items-center justify-center min-h-[150px]">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#02063E]">NEW</p>
                <p className="text-2xl font-bold text-[#02063E]">PICKUP</p>
              </div>
            </div>

            {/* Alert Card */}
            <div className="bg-gray-200 rounded-2xl p-8 min-h-[150px] relative">
              <p className="text-red-600 font-bold mb-2">ALERT</p>
              <p className="text-red-600 font-semibold">4 Stocks are LOW</p>
              {/* Simple line chart representation */}
              <svg className="absolute bottom-4 right-4 w-32 h-20" viewBox="0 0 100 50">
                <polyline
                  points="0,25 20,20 40,15 60,30 80,35 100,45"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Pending Shipment Card */}
            <div className="bg-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[150px]">
              <p className="text-sm text-gray-700 mb-2">Pending Shipment</p>
              <p className="text-6xl font-bold text-[#02063E]">57</p>
            </div>

            {/* SKU Count Card */}
            <div className="bg-gray-200 rounded-2xl p-8 min-h-[150px]">
              <p className="text-lg font-bold text-[#02063E] mb-4">SKU COUNT</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-20">Open</span>
                  <div className="flex-1 h-6 bg-[#02063E] rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-20">In Review</span>
                  <div className="flex-1 h-6 bg-[#02063E] rounded" style={{ width: '120%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Activity Feed</h2>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <span>⛶</span>
                <span>Expand</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="flex-1 flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm">Purchase for washing machine</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">13:00</p>
                    <p className="text-xs text-gray-500">09 March, 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="flex-1 flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-sm">Restock</span>
                  <div className="text-right">
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