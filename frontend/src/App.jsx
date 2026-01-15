import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import StaffDashboard from "./pages/StaffDashboard";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<OnboardingFlow />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<StaffDashboard />} />

        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;