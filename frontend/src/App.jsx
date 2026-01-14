import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<OnboardingFlow />} />
        <Route path="/dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;