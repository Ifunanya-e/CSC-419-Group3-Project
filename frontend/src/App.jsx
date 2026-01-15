<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import StaffDashboard from "./pages/StaffDashboard";
=======
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import Dashboard from "./pages/warehouse/Dashboard";
import ProductPage from "./pages/warehouse/productPage";
import OrderSummary from "./pages/warehouse/orderSummary";
import Pickup from "./pages/warehouse/pickup";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path="/" element={<Dashboard />} />
    <Route path="/products" element={<ProductPage />} />
    <Route path="/order-summary" element={<OrderSummary />} />
    <Route path="/pickup" element={<Pickup />} />
  </>
  )
)
>>>>>>> Stashed changes

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