import { useState, useEffect } from "react";
import { FaBell, FaSearch, FaBars, FaTimes, FaCog, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import logo from "../assets/Group1.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const displayUser = {
    name: user?.full_name || user?.email?.split('@')[0] || "Manager",
    role: user?.role || "Manager",
    email: user?.email || "manager@example.com"
  };

  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    category: "",
    description: "",
    current_stock: 0,
    reorder_level: 0,
    unit_price: 0,
    bin_location: "",
    supplier_id: 1
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/products/", newProduct);
      
      setNewProduct({
        sku: "",
        name: "",
        category: "",
        description: "",
        current_stock: 0,
        reorder_level: 0,
        unit_price: 0,
        bin_location: "",
        supplier_id: 1
      });
      
      setShowAddModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      setError(error.response?.data?.detail || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Only send the fields that should be updated, excluding id and other metadata
      const updatePayload = {
        sku: selectedProduct.sku,
        name: selectedProduct.name,
        category: selectedProduct.category,
        description: selectedProduct.description,
        current_stock: parseInt(selectedProduct.current_stock),
        reorder_level: parseInt(selectedProduct.reorder_level),
        unit_price: parseFloat(selectedProduct.unit_price),
        bin_location: selectedProduct.bin_location,
        supplier_id: parseInt(selectedProduct.supplier_id)
      };

      await api.patch(`/products/${selectedProduct.id}`, updatePayload);
      
      setShowEditModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
      console.error("Error response:", error.response?.data);
      setError(error.response?.data?.detail || "Failed to update product");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProduct(productId) {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert(error.response?.data?.detail || "Failed to delete product");
    }
  }

  function openEditModal(product) {
    setSelectedProduct({...product});
    setShowEditModal(true);
  }

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#02063E] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white p-2"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-6 border-b border-white/10">
          <img src={logo} alt="Warehouse X" className="h-12 brightness-0 invert" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/manager-dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="/inventory-management"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Inventory Management</span>
          </a>
        </nav>

        <div className="p-4 space-y-3">
          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              navigate('/signin');
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors hover:bg-red-600 bg-red-500/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <span className="text-[#02063E] font-bold text-lg">
                {displayUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{displayUser.role}</p>
              <p className="text-xs text-white/70 truncate">{displayUser.name}</p>
              <p className="text-xs text-white/60 truncate">{displayUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full lg:w-auto">
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaBars className="text-xl" />
            </button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaCog className="text-xl" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#02063E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#03074d] transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Add New Item
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        Loading products...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={
                            product.current_stock <= product.reorder_level
                              ? 'text-red-600 font-semibold'
                              : 'text-gray-900'
                          }>
                            {product.current_stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${typeof product.unit_price === 'number' 
                            ? product.unit_price.toFixed(2) 
                            : parseFloat(product.unit_price || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.bin_location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {showAddModal && (
        <ProductModal
          title="Add New Product"
          product={newProduct}
          setProduct={setNewProduct}
          onSubmit={handleAddProduct}
          onClose={() => setShowAddModal(false)}
          isLoading={isLoading}
          submitText="Add Product"
        />
      )}

      {showEditModal && selectedProduct && (
        <ProductModal
          title="Edit Product"
          product={selectedProduct}
          setProduct={setSelectedProduct}
          onSubmit={handleEditProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          isLoading={isLoading}
          submitText="Update Product"
        />
      )}
    </div>
  );
}

function ProductModal({ title, product, setProduct, onSubmit, onClose, isLoading, submitText }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
              <input
                type="text"
                value={product.sku}
                onChange={(e) => setProduct(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input
                type="text"
                value={product.category}
                onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bin Location *</label>
              <input
                type="text"
                value={product.bin_location}
                onChange={(e) => setProduct(prev => ({ ...prev, bin_location: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
              <input
                type="number"
                value={product.current_stock}
                onChange={(e) => setProduct(prev => ({ ...prev, current_stock: parseInt(e.target.value) || 0 }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
              <input
                type="number"
                value={product.reorder_level}
                onChange={(e) => setProduct(prev => ({ ...prev, reorder_level: parseInt(e.target.value) || 0 }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price *</label>
              <input
                type="number"
                step="0.01"
                value={product.unit_price}
                onChange={(e) => setProduct(prev => ({ ...prev, unit_price: parseFloat(e.target.value) || 0 }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier ID *</label>
              <input
                type="number"
                value={product.supplier_id}
                onChange={(e) => setProduct(prev => ({ ...prev, supplier_id: parseInt(e.target.value) || 1 }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={product.description || ''}
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#02063E]"
              rows="3"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#02063E] text-white hover:bg-[#03074d]'
              }`}
            >
              {isLoading ? "Processing..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}