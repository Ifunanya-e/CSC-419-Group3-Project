import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/Group1.png";

const SignInForm = () => {
  return (
    
    <div className="w-full max-w-md bg-[#050A30] rounded-[40px] p-10 shadow-2xl text-white relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
        <p className="text-xs text-gray-400">
          Welcome back! Let's get started by signing into your account
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm mb-2">E-mail :</label>
          <input 
            type="email" 
            className="w-full bg-transparent border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400" 
            placeholder="Username"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Password :</label>
          <input 
            type="password" 
            className="w-full bg-transparent border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400" 
            placeholder="Username"
          />
        </div>

        <button type="submit" className="w-full bg-white text-[#050A30] font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors mt-4">
          Continue
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