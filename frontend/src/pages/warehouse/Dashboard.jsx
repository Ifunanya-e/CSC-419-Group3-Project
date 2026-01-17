import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WarehouseLayout from "../../components/warehouse/WarehouseLayout";
import { useAuth } from "../../context/AuthContext";
import { getLowStockProducts } from "../../api/products";

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [lowStockCount, setLowStockCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch low stock products on component mount
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setIsLoading(true);
                const lowStock = await getLowStockProducts();
                // Count the number of low stock items
                setLowStockCount(Array.isArray(lowStock) ? lowStock.length : 0);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setLowStockCount(0);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    return (
        <WarehouseLayout>
            <div className="p-4 md:p-6">
                {/* Header Section */}
                <div className="mb-4 md:mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">WELCOME</h1>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 pb-3 mb-6 border-b-2 border-gray-200">
                    <button className="bg-[#000435] text-white py-3 px-6 md:px-10 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Priority Task
                    </button>
                    <button className="bg-[#000435] text-white py-3 px-6 md:px-10 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Scan Barcode
                    </button>
                </div>

                {/* Dashboard Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                    {/* New Pickup Card */}
                    <a 
                        onClick={() => navigate('/staff/pickup')}
                        className="bg-gray-300 rounded-lg p-8 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                    >
                        <p className="text-[#000435] text-2xl font-semibold">NEW PICKUP</p>
                    </a>

                    {/* Alert Card */}
                    <div className="bg-gray-300 rounded-lg p-8 text-center">
                        <p className="text-red-600 font-bold text-lg mb-2">ALERT</p>
                        <div className="flex justify-center mb-4">
                            <svg className="w-24 h-24" viewBox="0 0 100 100">
                                <polyline points="10,90 20,40 30,60 40,20 50,50 60,30 70,70 80,10 90,80" fill="none" stroke="#ef4444" strokeWidth="2"/>
                            </svg>
                        </div>
                        {isLoading ? (
                            <p className="text-gray-600 font-semibold text-sm md:text-base">Loading...</p>
                        ) : (
                            <>
                                <p className="text-red-600 font-bold text-xl">{lowStockCount} {lowStockCount === 1 ? 'Stock is' : 'Stocks are'}</p>
                                <p className="text-red-600 font-bold text-xl">LOW</p>
                            </>
                        )}
                    </div>

                    {/* Pending Shipment Card */}
                    <div className="bg-gray-300 rounded-lg p-8 text-center">
                        <p className="text-gray-600 font-medium mb-4">Pending Shipment</p>
                        <p className="text-5xl font-bold text-[#000435]">57</p>
                    </div>

                    {/* SKU Count Card */}
                    <div className="bg-gray-300 rounded-lg p-8">
                        <p className="text-gray-600 font-medium mb-6">SKU COUNT</p>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 text-sm mb-2">Open</p>
                                <div className="w-full bg-gray-400 rounded h-4">
                                    <div className="bg-[#000435] rounded h-4" style={{ width: '35%' }}></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm mb-2">In Review</p>
                                <div className="w-full bg-gray-400 rounded h-4">
                                    <div className="bg-[#000435] rounded h-4" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                {/* Activity Feed */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Feed</h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <p className="text-gray-700 text-sm">Stock check completed</p>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <p className="text-gray-700 text-sm">New shipment received</p>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <p className="text-gray-700 text-sm">Low stock alert for 3 items</p>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <p className="text-gray-700 text-sm">Order #12345 processed</p>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <p className="text-gray-700 text-sm">Urgent: Restock needed</p>
                        </div>
                    </div>
                </div>
            </div>
        </WarehouseLayout>
    );
}

export default Dashboard;
