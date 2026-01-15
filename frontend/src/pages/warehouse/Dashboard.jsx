import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WarehouseLayout from "../../components/warehouse/WarehouseLayout";

function Dashboard() {
    const navigate = useNavigate();
    const [StockAlerts] = useState([
        { name: "Item 1", status: "low" },
        { name: "Item 2", status: "low" },
        { name: "Item 3", status: "low" },
        { name: "Item 4", status: "low" },
    ]);

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
                        <p className="text-red-600 font-bold text-xl">4 Stocks are</p>
                        <p className="text-red-600 font-bold text-xl">LOW</p>
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
                <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Activity Feed</h2>
                        <button className="text-blue-600 font-semibold hover:underline">
                            Expand
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Activity Item 1 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-[#000435] rounded-full"></div>
                                <div className="w-0.5 h-16 bg-gray-300"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">Purchase for washing machine</p>
                                <p className="text-sm text-gray-600">09 March, 2025</p>
                                <p className="text-xs text-gray-500">13:00</p>
                            </div>
                        </div>

                        {/* Activity Item 2 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-[#000435] rounded-full"></div>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">Restock</p>
                                <p className="text-sm text-gray-600">09 March, 2025</p>
                                <p className="text-xs text-gray-500">13:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WarehouseLayout>
    );
}

export default Dashboard;
