import { useState } from "react";
import WarehouseLayout from "../../components/warehouse/WarehouseLayout";
import { products } from "../../data/products";

function Pickup() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [condition, setCondition] = useState(null); // 'good' or 'bad'
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Get product images - convert single image to array, or use images array if it exists
    const getProductImages = (product) => {
        if (!product) return [];
        if (product.images && Array.isArray(product.images)) {
            return product.images;
        }
        return product.image ? [product.image] : [];
    };

    return (
        <WarehouseLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-100 h-full">
                {/* Left Column - Pick Up List */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Pick Up</h1>
                        <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#000435] transition-colors">
                            <span className="font-semibold text-gray-700">Sort</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setCondition(null);
                                    setCurrentImageIndex(0);
                                }}
                                className={`bg-white border rounded-lg overflow-hidden cursor-pointer transition-all ${
                                    selectedProduct?.id === product.id
                                        ? "border-[#4169E1] shadow-lg"
                                        : "border-gray-200 hover:shadow-lg"
                                }`}
                            >
                                {/* Product Image */}
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center border-b overflow-hidden">
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
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-900">Quantity</span>
                                        <span className="flex items-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <span className="text-sm">{product.stock}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Item Details */}
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedProduct?.name || "Select an item"}</h2>

                    {selectedProduct && (
                        <div className="space-y-6">
                            {/* Image Carousel */}
                            <div className="relative">
                                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    {(() => {
                                        const images = getProductImages(selectedProduct);
                                        const currentImage = images[currentImageIndex] || images[0];
                                        
                                        return currentImage ? (
                                            <img 
                                                src={currentImage} 
                                                alt={selectedProduct.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        );
                                    })()}
                                </div>

                                {/* Carousel Dots - Only show if multiple images */}
                                {(() => {
                                    const images = getProductImages(selectedProduct);
                                    if (images.length > 1) {
                                        return (
                                            <div className="flex justify-center space-x-2 mt-3">
                                                {images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`w-2 h-2 rounded-full transition-colors ${
                                                            currentImageIndex === index ? "bg-gray-800" : "bg-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category:</label>
                                <p className="text-gray-800">{selectedProduct.category}</p>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
                                <p className="text-gray-800">{selectedProduct.stock}</p>
                            </div>

                            {/* Condition Assessment */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    What is the condition of the items?
                                </label>

                                <div className="space-y-3">
                                    {/* GOOD Option */}
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={condition === "good"}
                                                onChange={() => setCondition(condition === "good" ? null : "good")}
                                                className="sr-only"
                                            />
                                            <div className={`w-6 h-6 border-2 rounded transition-colors ${
                                                condition === "good"
                                                    ? "bg-green-500 border-green-500"
                                                    : "border-gray-300"
                                            }`}>
                                                {condition === "good" && (
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold text-green-600">GOOD</span>
                                    </label>

                                    {/* BAD Option */}
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={condition === "bad"}
                                                onChange={() => setCondition(condition === "bad" ? null : "bad")}
                                                className="sr-only"
                                            />
                                            <div className={`w-6 h-6 border-2 rounded transition-colors ${
                                                condition === "bad"
                                                    ? "bg-red-500 border-red-500"
                                                    : "border-gray-300"
                                            }`}>
                                                {condition === "bad" && (
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold text-red-600">BAD</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </WarehouseLayout>
    );
}

export default Pickup;
