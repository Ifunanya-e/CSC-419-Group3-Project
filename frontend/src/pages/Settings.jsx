import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaBars, FaTimes, FaCog, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/Group1.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile form data
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    role: ""
  });

  // Password form data
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const displayUser = {
    name: user?.full_name || "Manager",
    role: user?.role || "Manager",
    email: user?.email || "manager@example.com"
  };

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get(`/users/${user?.id}`);
        setProfileData({
          full_name: response.data.full_name || "",
          email: response.data.email || "",
          role: response.data.role || ""
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setMessage({ type: "error", text: "Failed to load user data" });
      }
    }

    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  // Handle profile update
// Handle profile update
// Handle profile update
async function handleProfileUpdate(e) {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ type: "", text: "" });

  try {
    console.log("User ID:", user?.id);
    console.log("Profile data being sent:", {
      full_name: profileData.full_name,
      email: profileData.email,
      role: profileData.role
    });

    // Send id as query parameter, not in URL path
    const response = await api.patch(`/users/${user?.id}`, {
      full_name: profileData.full_name,
      email: profileData.email,
      role: profileData.role
    }, {
      params: {
        id: user?.id  // Add id as query parameter
      }
    });

    console.log("Update response:", response.data);

    setMessage({ type: "success", text: "Profile updated successfully!" });
    
    // Update local storage
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  } catch (error) {
    console.error("Failed to update profile:", error);
    console.error("Error response:", error.response?.data);
    
    let errorMessage = "Failed to update profile";
    
    if (error.response?.data?.detail) {
      // If detail is an array of validation errors
      if (Array.isArray(error.response.data.detail)) {
        errorMessage = error.response.data.detail.map(err => err.msg).join(", ");
      } else if (typeof error.response.data.detail === 'string') {
        errorMessage = error.response.data.detail;
      } else {
        errorMessage = JSON.stringify(error.response.data.detail);
      }
    }
    
    setMessage({ 
      type: "error", 
      text: errorMessage
    });
  } finally {
    setIsLoading(false);
  }
}

// Handle password update
async function handlePasswordUpdate(e) {
  e.preventDefault();
  setIsLoading(true);
  setMessage({ type: "", text: "" });

    // Validate passwords match
    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage({ type: "error", text: "New passwords do not match" });
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordData.new_password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" });
      setIsLoading(false);
      return;
    }

    try {
      await api.patch("/users/me/password", {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      });

      setMessage({ type: "success", text: "Password updated successfully!" });
      
      // Clear password form
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });

      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
  console.error("Failed to update password:", error);
  let errorMessage = "Failed to update password. Please check your current password.";
  
  if (error.response?.data?.detail) {
    // If detail is an array of validation errors
    if (Array.isArray(error.response.data.detail)) {
      errorMessage = error.response.data.detail.map(err => err.msg).join(", ");
    } else if (typeof error.response.data.detail === 'string') {
      errorMessage = error.response.data.detail;
    } else {
      errorMessage = JSON.stringify(error.response.data.detail);
    }
  }
  
  setMessage({ 
    type: "error", 
    text: errorMessage
  });
} finally {
  setIsLoading(false);
}
  }
  function handleLogout() {
    logout();
    navigate("/signin");
    setIsSidebarOpen(false);
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
                href="/manager-dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsSidebarOpen(false)}
            >
                <span className="text-xl">📊</span>
                <span className="font-medium">Dashboard</span>
            </a>

            <a
                href="/inventory-management"
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
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
                onClick={() => setIsSidebarOpen(false)}
            >
                <FaCog className="text-xl" />
                <span className="font-medium">Settings</span>
            </a>

            {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 text-white/80 hover:text-white transition-colors mt-4"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
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

            {/* Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold">Settings</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 md:gap-6">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-lg md:text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === "profile"
                    ? "border-[#02063E] text-[#02063E]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === "password"
                    ? "border-[#02063E] text-[#02063E]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Change Password
              </button>
            </div>

            {/* Message Alert */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === "success" 
                  ? "bg-green-50 border border-green-200 text-green-700" 
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {message.text}
              </div>
            )}

            {/* Profile Settings Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.full_name}
                      onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={profileData.role}
                      onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#02063E] text-white hover:bg-[#03074d]"
                      }`}
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === "password" && (
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-colors ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#02063E] text-white hover:bg-[#03074d]"
                      }`}
                    >
                      {isLoading ? "Updating..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
