import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import StaffDashboard from "./pages/StaffDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import InventoryManagement from "./pages/InventoryManagement";
import ProductPage from "./pages/warehouse/productPage";
import OrderSummary from "./pages/warehouse/orderSummary";
import Pickup from "./pages/warehouse/pickup";
import { CartProvider } from "./context/CartContext";
import SignIn from "./pages/SignIn";
import ReceiveItems from "./pages/ReceiveItems";
import Settings from "./pages/Settings";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* manager paths */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/register" element={<OnboardingFlow />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<StaffDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/receive-items" element={<ReceiveItems />} />
          <Route path="/settings" element={<Settings />} />

          {/* Warehouse routes */}
          <Route path="/products" element={<ProductPage />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/pickup" element={<Pickup />} />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;