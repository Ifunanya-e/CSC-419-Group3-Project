import { useState } from "react";
import InfoCard from "../components/register/InfoCard";
import RegisterForm from "../components/register/RegisterForm";
import ConfirmProfileStep from "../components/register/ConfirmProfileStep";
import WorkspaceStep from "../components/register/WorkspaceStep";
import { createUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const { saveUserAfterRegistration } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    profileImage: null,
    workspace: null,
  });

  // Add this function in OnboardingFlow.jsx
async function handleFinalSubmit() {
  setIsLoading(true);
  setError("");

  try {
    console.log("Final submission data:", formData);
    
    // Save user data to context
    const userData = {
      full_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      workspace: formData.workspace
    };
    
    saveUserAfterRegistration(userData);
    
    console.log("Saved user data:", userData);
    
    // Navigate to dashboard
    navigate("/dashboard");
    
  } catch (err) {
    setError("Failed to complete registration. Please try again.");
    console.error("Final submission error:", err);
  } finally {
    setIsLoading(false);
  }
}

 
  async function handleRegister() {
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: "staff",
      };

      await createUser(payload);

      setActiveStep(2);
    } catch (err) {
  const errorMessage = err.message || "Registration failed. Please check your details and try again.";
  setError(errorMessage);
  console.error("Registration error:", err);
} finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left info card (desktop only) */}
      <div className="hidden lg:block lg:w-[45%] xl:w-[50%] p-8 lg:p-12">
        <InfoCard activeStep={activeStep} />
      </div>

      {/* Right side - Form content */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-12">
        <div className="w-full max-w-xl">
          {/* STEP 1 */}
          {activeStep === 1 && (
            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              onContinue={handleRegister}
              isLoading={isLoading}
              error={error}
            />
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <ConfirmProfileStep
              formData={formData}
              setFormData={setFormData}
              onBack={() => setActiveStep(1)}
              onContinue={() => setActiveStep(3)}
            />
          )}

          {/* STEP 3 */}
          
{activeStep === 3 && (
  <WorkspaceStep
    formData={formData}
    setFormData={setFormData}
    onBack={() => setActiveStep(2)}
    onSubmit={handleFinalSubmit}
    isLoading={isLoading}
  />
)}
        </div>
      </div>
    </div>
  );
}