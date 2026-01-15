import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/Group1.png";
import MobileSteps from "./MobileSteps";
import { FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";

function RegisterForm({ formData = {}, setFormData, onContinue, isLoading, error }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  function validatePassword(password) {
    const errors = [];
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Must include a Capital Letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Must include small letters");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Must include a digit");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Must include symbols");
    }
    if (password.length < 8) {
      errors.push("Must be at least 8 characters");
    }
    
    return errors;
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    setPasswordErrors(validatePassword(newPassword));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validate password
    const errors = validatePassword(formData.password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      setShowPasswordRequirements(true);
      return;
    }
    
    // Check if passwords match
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    onContinue();
  }

  const getRequirementStatus = (requirement) => {
    return !passwordErrors.includes(requirement);
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Site logo" className="h-12" />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* First & Last Name Row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name :
            </label>
            <input
              type="text"
              placeholder="John"
              value={formData.firstName || ""}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, firstName: e.target.value }))
              }
              className="w-full rounded-lg border-2 border-[#02063E] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name :
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={formData.lastName || ""}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, lastName: e.target.value }))
              }
              className="w-full rounded-lg border-2 border-[#02063E] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Email :
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-lg border-2 border-[#02063E] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password :
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={formData.password || ""}
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordRequirements(true)}
            className="w-full rounded-lg border-2 border-[#02063E] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            required
          />
          
          {/* Password Requirements */}
          {showPasswordRequirements && formData.password && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
              
              <div className="space-y-1.5">
                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include a Capital Letter") ? "text-green-600" : "text-red-600"}`}>
                  {getRequirementStatus("Must include a Capital Letter") ? <FaCheck /> : <FaTimes />}
                  <span>Must include a Capital Letter</span>
                </div>
                
                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include small letters") ? "text-green-600" : "text-red-600"}`}>
                  {getRequirementStatus("Must include small letters") ? <FaCheck /> : <FaTimes />}
                  <span>Must include small letters</span>
                </div>
                
                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include a digit") ? "text-green-600" : "text-red-600"}`}>
                  {getRequirementStatus("Must include a digit") ? <FaCheck /> : <FaTimes />}
                  <span>Must include a digit</span>
                </div>
                
                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include symbols") ? "text-green-600" : "text-red-600"}`}>
                  {getRequirementStatus("Must include symbols") ? <FaCheck /> : <FaTimes />}
                  <span>Must include symbols (!@#$%^&*...)</span>
                </div>
                
                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must be at least 8 characters") ? "text-green-600" : "text-red-600"}`}>
                  {getRequirementStatus("Must be at least 8 characters") ? <FaCheck /> : <FaTimes />}
                  <span>Must be at least 8 characters</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password :
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border-2 border-[#02063E] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02063E]"
            required
          />
          
          {/* Password Match Indicator */}
          {confirmPassword && formData.password && (
            <div className="mt-2">
              {formData.password === confirmPassword ? (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <FaCheck /> Passwords match
                </p>
              ) : (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaTimes /> Passwords do not match
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#02063E] text-white hover:bg-[#03074d]"}
          `}
        >
          <span>{isLoading ? "Loading..." : "Continue"}</span>
          {!isLoading && <FaArrowRight />}
        </button>
      </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#02063E] font-medium hover:underline">
            Sign in
          </Link>
        </p>

        
      {/* Mobile Step Tracker */}
      <div className="lg:hidden">
        <MobileSteps activeStep={1} />
      </div>
    </div>
  );
}

export default RegisterForm;