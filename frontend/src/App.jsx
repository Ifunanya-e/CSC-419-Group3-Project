import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingFlow from "./pages/OnboardingFlow";
import ManagerDashboard from "./pages/ManagerDashboard";
import Dashboard from "./pages/warehouse/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import ProductPage from "./pages/warehouse/productPage";
import OrderSummary from "./pages/warehouse/orderSummary";
import Pickup from "./pages/warehouse/pickup";
import AdminDashboard from "./pages/admin/adminDashboard";
import StoresRegisters from "./pages/admin/StoresRegisters";
import UserRoles from "./pages/admin/UserRoles";
import ProductsCategories from "./pages/admin/ProductsCategories";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import { CartProvider } from "./context/CartContext";
import SignIn from "./pages/SignIn";
import ReceiveItems from "./pages/ReceiveItems";
// import Settings from "./pages/Settings";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* manager paths */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/register" element={<OnboardingFlow />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/receive-items" element={<ReceiveItems />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Warehouse Routes */}
          <Route path="/staff/dashboard" element={<Dashboard />} />
          <Route path="/staff/products" element={<ProductPage />} />
          <Route path="/staff/order-summary" element={<OrderSummary />} />
          <Route path="/staff/pickup" element={<Pickup />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/stores" element={<StoresRegisters />} />
          <Route path="/admin/users" element={<UserRoles />} />
          <Route path="/admin/products" element={<ProductsCategories />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
         

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;