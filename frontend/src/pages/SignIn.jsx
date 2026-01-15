import React from 'react';
import SignInForm from '../components/signin/SignInForm';
import logo from "../assets/Group1.png"; 

const SignIn = () => {
  return (
   
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Brand Logo - Matches the height used in RegisterForm */}
      <div className="mb-8 z-10">
        <img 
          src={logo} 
          alt="WarehouseX Logo" 
          className="h-14" 
        />
      </div>

      {/* The Navy Blue Sign In Card Component */}
      <SignInForm />

      {/* Background illustration area for the warehouse workers */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none opacity-10 flex justify-between px-10">
         {/* These act as placeholders for the SVG illustrations seen in your mockups */}
      </div>
    </div>
  );
};

export default SignIn;