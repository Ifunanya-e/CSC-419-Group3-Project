import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/Group1.png";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const result = await login(email, password);
    
    // Debug: Check what role is returned
    console.log("Login result:", result);
    console.log("User role:", result.user?.role);
    
    // Navigate based on user role
    const userRole = result.user?.role?.toLowerCase(); // Convert to lowercase for comparison
    
    if (userRole === "admin") {
      console.log("Navigating to admin dashboard");
      navigate("/admin/dashboard");
    } else if (userRole === "manager") {
      console.log("Navigating to manager dashboard");
      navigate("/manager-dashboard");
    } else {
      console.log("Navigating to staff dashboard");
      navigate("/staff/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    
    if (err.response?.status === 401) {
      setError("Invalid email or password");
    } else if (err.response?.data?.detail) {
      setError(err.response.data.detail);
    } else {
      setError("Login failed. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
}
  return (
    <div className="w-full max-w-md bg-[#050A30] rounded-[40px] p-10 shadow-2xl text-white relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
        <p className="text-xs text-white">
          Welcome! Let's get started by signing into your account
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2">E-mail :</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400 text-white" 
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Password :</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400 text-white" 
            placeholder="••••••••"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full font-bold py-3 rounded-xl transition-colors mt-4 ${
            isLoading 
              ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
              : "bg-white text-[#050A30] hover:bg-gray-200"
          }`}
        >
          {isLoading ? "Signing in..." : "Log In"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm">
        <span className="text-gray-400">Need an account? </span>
        <Link to="/register" className="text-blue-500 font-semibold hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;