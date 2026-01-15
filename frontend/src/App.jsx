import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import StaffDashboard from "./pages/StaffDashboard";
import ProductPage from "./pages/warehouse/productPage";
import OrderSummary from "./pages/warehouse/orderSummary";
import Pickup from "./pages/warehouse/pickup";
import { CartProvider } from "./context/CartContext";
import SignIn from "./pages/SignIn";

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