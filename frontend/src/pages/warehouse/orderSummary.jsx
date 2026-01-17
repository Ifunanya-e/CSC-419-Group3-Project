import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WarehouseLayout from "../../components/warehouse/WarehouseLayout";
import { useCart } from "../../context/CartContext";
import { getAllProducts } from "../../api/products";

function OrderSummary() {
    const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [amountReceived, setAmountReceived] = useState("");
    const [printReceipt, setPrintReceipt] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [showHoldSaleModal, setShowHoldSaleModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["All Products"]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const data = await getAllProducts();
                
                // Map API fields to expected fields
                const normalizedProducts = data.map(product => ({
                    ...product,
                    price: parseFloat(product.unit_price) || product.price || 0,
                    stock: product.current_stock ?? product.stock ?? 0,
                    name: product.name ?? product.product_name ?? 'Unnamed Product',
                    category: product.category ?? product.category_name ?? 'Uncategorized'
                }));
                
                setProducts(normalizedProducts);
                
                // Extract unique categories
                const uniqueCategories = ["All Products", ...new Set(normalizedProducts.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchProducts();
    }, []);

    // Calculate totals

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    const change = amountReceived ? parseFloat(amountReceived) - total : 0;
    
    // Check if payment is sufficient
    const amountPaid = parseFloat(amountReceived);
    const isPaymentValid = paymentMethod === "card" || 
                          (paymentMethod === "cash" && !isNaN(amountPaid) && amountPaid >= total);

    const handleConfirmPayment = () => {
        if (!isPaymentValid || cart.length === 0) return;
        setShowCheckoutModal(true);
    };

    const handleHoldSale = () => {
        setShowHoldSaleModal(true);
    };

    const handleCancelSale = () => {
        setShowCancelModal(true);
    };

    const confirmCancelSale = () => {
        clearCart();
        setShowCancelModal(false);
        navigate('/staff/products');
    };

    // Add stock status helper
    const getStockStatus = (stock) => {
        if (stock >= 15) return "in";
        if (stock > 0) return "low";
        return "out";
    };

    const filteredProducts = activeCategory === "All Products"
        ? products
        : products.filter(p => p.category === activeCategory);

    const searchedProducts = searchQuery
        ? filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : filteredProducts;

    return (
        <WarehouseLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-100 h-screen overflow-hidden">
                {/* Left Column - Scan/Search Product */}
                <div className="bg-white rounded-lg p-6 flex flex-col max-h-[calc(100vh-3rem)]">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Scan / Search Product</h2>
                    
                    {/* Search Input */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#000435]"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-6 overflow-x-auto">
                        <div className="flex space-x-2 pb-2 min-w-max">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                                        activeCategory === category
                                            ? "bg-[#000435] text-white"
                                            : "border-2 border-gray-300 text-gray-700 hover:border-[#000435]"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 gap-4 overflow-auto flex-1">
                        {isLoading ? (
                            <div className="col-span-2 text-center py-8 text-gray-500">
                                Loading products...
                            </div>
                        ) : searchedProducts.length === 0 ? (
                            <div className="col-span-2 text-center py-8 text-gray-500">
                                No products found
                            </div>
                        ) : (
                            searchedProducts.map((product) => {
                                const stockStatus = getStockStatus(product.stock || 0);
                                return (
                                    <div 
                                        key={product.id} 
                                        onClick={() => addToCart(product)}
                                        className="border-2 border-gray-200 rounded-lg p-3 hover:border-[#000435] transition-colors cursor-pointer"
                                    >
                                        {/* Product Image */}
                                        <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                                            {product.image ? (
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                        
                                        <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name || 'Product'}</h3>
                                        
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                                stockStatus === 'in' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : stockStatus === 'low'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {stockStatus === 'in' ? 'In Stock' : stockStatus === 'low' ? 'Low Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                        
                                        <p className="text-lg font-bold text-gray-900">${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Middle Column - Current Sale */}
                <div className="bg-white rounded-lg p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Current Sale</h2>
                        <p className="text-sm text-gray-500">#007231</p>
                    </div>

                    {/* Payment Summary */}
                    <div className="border border-gray-200 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h3>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Sub Price:</span>
                                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax (5%):</span>
                                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span className="text-gray-800">Total:</span>
                                <span className="text-gray-900">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-auto">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Cart Items <span className="text-gray-500">({cart.length})</span>
                        </h3>
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No items in cart</p>
                        ) : (
                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="ml-2 text-gray-400 hover:text-red-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Checkout */}
                <div className="bg-white rounded-lg p-6 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Payment</h2>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method:</label>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setPaymentMethod("cash")}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    paymentMethod === "cash"
                                        ? "border-[#000435] bg-[#000435] bg-opacity-5"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-2">
                                        <span className="text-2xl">💵</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">Cash</span>
                                </div>
                            </button>

                            <button
                                onClick={() => setPaymentMethod("card")}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    paymentMethod === "card"
                                        ? "border-[#000435] bg-[#000435] bg-opacity-5"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mb-2">
                                        <span className="text-2xl">💳</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-800">Credit Card</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Amount Received */}
                    {paymentMethod === "cash" && (
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount Received:</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                <input
                                    type="number"
                                    value={amountReceived}
                                    onChange={(e) => setAmountReceived(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#000435]"
                                    step="0.01"
                                />
                            </div>
                            {amountReceived && (
                                <p className="text-right text-sm text-gray-600 mt-2">
                                    Change: <span className="font-bold text-gray-900">${change.toFixed(2)}</span>
                                </p>
                            )}
                        </div>
                    )}

                    {/* Total Display */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-700">Total:</span>
                            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Print Receipt */}
                    <div className="mb-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={printReceipt}
                                onChange={(e) => setPrintReceipt(e.target.checked)}
                                className="w-4 h-4 accent-[#000435]"
                            />
                            <span className="text-sm font-medium text-gray-700">Print Receipt</span>
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                        <button
                            onClick={handleConfirmPayment}
                            disabled={cart.length === 0 || !isPaymentValid}
                            className={`py-3 rounded-lg font-bold transition-opacity ${
                                cart.length === 0 || !isPaymentValid
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#000435] text-white hover:opacity-90'
                            }`}
                        >
                            CHECKOUT
                        </button>
                        <button
                            onClick={handleHoldSale}
                            disabled={cart.length === 0}
                            className="bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors disabled:opacity-50"
                        >
                            Hold Sale
                        </button>
                        <button
                            onClick={handleCancelSale}
                            className="bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                        >
                            Cancel Sale
                        </button>
                    </div>
                </div>
            </div>

            {/* Cancel Sale Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Cancel Sale</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to cancel this sale? All items will be removed from the cart.</p>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmCancelSale}
                                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout Success Modal */}
            {showCheckoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl text-center">
                        {/* Green Checkmark Icon */}
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Confirmed!</h2>
                        <p className="text-gray-600 mb-6">Your transaction has been completed successfully.</p>
                        
                        <button
                            onClick={() => {
                                setShowCheckoutModal(false);
                                clearCart();
                                navigate('/staff/products');
                            }}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Hold Sale Modal */}
            {showHoldSaleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl text-center">
                        {/* Pause Icon */}
                        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sale On Hold</h2>
                        <p className="text-gray-600 mb-6">This sale has been saved and can be resumed later.</p>
                        
                        <button
                            onClick={() => setShowHoldSaleModal(false)}
                            className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Hold Sale Modal */}
            {showHoldSaleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Hold Sale</h2>
                        <p className="text-gray-600 mb-6 text-center">This sale will be saved for later. You can resume it anytime.</p>
                        
                        <div className="flex space-x-3">
                            <button 
                                onClick={() => setShowHoldSaleModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    // In a real app, you'd save the cart state here
                                    setShowHoldSaleModal(false);
                                    clearCart();
                                    navigate('/staff/products');
                                }}
                                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WarehouseLayout>
    );
}

export default OrderSummary;
