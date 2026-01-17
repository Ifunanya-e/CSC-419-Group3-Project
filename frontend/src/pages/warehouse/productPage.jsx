import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WarehouseLayout from "../../components/warehouse/WarehouseLayout";
import { useCart } from "../../context/CartContext";
import { getAllProducts } from "../../api/products";

function ProductPage() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["All Products"]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    // Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const data = await getAllProducts();
                
                // Map API fields to expected fields
                const normalizedProducts = data.map(product => ({
                    ...product,
                    // Map backend field names to frontend expected names
                    price: parseFloat(product.unit_price) || product.price || 0,
                    stock: product.current_stock ?? product.stock ?? product.quantity_in_stock ?? product.quantity ?? 0,
                    name: product.name ?? product.product_name ?? 'Unnamed Product',
                    category: product.category ?? product.category_name ?? 'Uncategorized'
                }));
                
                setProducts(normalizedProducts);
                
                // Extract unique categories from products
                const uniqueCategories = ["All Products", ...new Set(normalizedProducts.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchProducts();
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const filteredProducts = activeCategory === "All Products" 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <WarehouseLayout>
            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000435] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading products...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                        <div className="text-red-600 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-800 text-center mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full bg-[#000435] text-white py-2 rounded-lg hover:opacity-90"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Product Grid - Only show when not loading and no error */}
            {!isLoading && !error && (
                <div className="flex h-full bg-gray-100">
                {/* Main Content - Product Grid */}
                <div className="flex-1 my-3 p-6 bg-white rounded-lg overflow-auto ml-8">
                    {/* Category Tabs */}
                    <div className="mb-6 pb-2 border-b-2 border-gray-200">
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                        activeCategory === category
                                            ? 'bg-[#000435] text-white'
                                            : 'border-2 border-[#000435] text-[#000435] hover:bg-[#000435] hover:text-white'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow max-w-xs mx-auto w-full">
                                {/* Product Image */}
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center border-b overflow-hidden">
                                    {product.image ? (
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </div>
                                
                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name || 'Unnamed Product'}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{product.category || 'Uncategorized'}</p>
                                    
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xl font-bold text-gray-900">${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</span>
                                        <span className="flex items-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span className="text-sm">{product.stock ?? 0}</span>
                                        </span>
                                    </div>
                                    
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-[#000435] text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar - Order Summary */}
                {cart.length > 0 && (
                    <div className="w-96 bg-white border-l border-gray-200 flex flex-col m-6 rounded-lg max-h-[calc(100vh-12rem)]">
                        {/* Order Summary Header */}
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Order Summary</h2>
                        <p className="text-sm text-gray-500">#007231</p>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-auto p-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">
                            Total Items <span className="text-gray-500">({cart.length})</span>
                        </h3>
                        
                        <div className="space-y-4 mb-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100">
                                    {/* Product Image */}
                                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{item.name || 'Product'}</h4>
                                        <p className="text-sm font-semibold text-gray-900 mt-1">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</p>
                                        
                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity || 0}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Remove Button */}
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Payment Summary */}
                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h3>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Sub Price:</span>
                                    <span className="font-semibold text-gray-900">${(subtotal || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (5%):</span>
                                    <span className="font-semibold text-gray-900">${(tax || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold pt-2 border-t">
                                    <span className="text-gray-800">Total:</span>
                                    <span className="text-gray-900">${(total || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        

                        {/* Proceed to Summary */}
                        <button 
                            onClick={() => navigate('/staff/order-summary')}
                            className="w-full bg-[#000435] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                            Proceed to Summary
                        </button>
                    </div>
                    </div>
                )}
            </div>
            )}
        </WarehouseLayout>
    );
}

export default ProductPage;