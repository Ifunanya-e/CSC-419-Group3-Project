import AdminLayout from '../../components/admin/AdminLayout';

function Reports() {
    const storeData = [
        { name: 'Main Branch', sales: '$246,000.00', status: 800 },
        { name: 'Abuja Outlet', sales: '$12,549.00', status: 45 },
        { name: 'Lagos Outlet', sales: '$79,299.00', status: 239 },
        { name: 'Abia Branch', sales: '$22,900.00', status: 120 },
        { name: 'Imo Outlet', sales: '$29,000.00', status: 189 },
        { name: 'Ogun Outlet', sales: '$50,985.00', status: 655 },
    ];

    const inventoryByStore = [
        { name: 'Main Branch', products: 1520, stockValue: '$2,500,000.00', lowStock: 50 },
        { name: 'Abuja Outlet', products: 200, stockValue: '$500,000.00', lowStock: 10 },
        { name: 'Lagos Outlet', products: 150, stockValue: '$130,000.00', lowStock: 9 },
        { name: 'Abia Branch', products: 400, stockValue: '$700,000.00', lowStock: 20 },
        { name: 'Imo Outlet', products: 289, stockValue: '$1,000,000.00', lowStock: 33 },
        { name: 'Ogun Outlet', products: 500, stockValue: '$1,200,000.00', lowStock: 7 },
    ];

    return (
        <AdminLayout>
            <div className="p-4 md:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Reports (Global)</h2>
                    <p className="text-sm text-gray-600">Read-only overview of system-wide sales and inventory data.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Total Sales */}
                    <div className="bg-[#000435] rounded-xl p-6 text-white relative overflow-hidden">
                        <div className="flex items-center space-x-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                            <span className="text-sm font-medium">Total Sales (All Stores)</span>
                        </div>
                        <p className="text-5xl font-bold mb-4">734</p>
                        <button className="text-xs text-gray-300 hover:text-white flex items-center space-x-1">
                            <span>View Report</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Total Transactions */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-800">Total Transactions</span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-5xl font-bold text-gray-900 mb-3">123</p>
                        <div className="flex items-center text-xs text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            <span>-4% decrease from yesterday</span>
                        </div>
                    </div>

                    {/* Total Inventory Value */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-800">Total Inventory Value</span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-5xl font-bold text-gray-900 mb-2">98</p>
                        <p className="text-xs text-gray-600">22 Registers Inactive. <span className="text-red-600 font-medium">Check for fault</span></p>
                    </div>

                    {/* Total Earnings */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 relative">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-800">Total Earnings</span>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-3">$626,466.97</p>
                        <div className="flex items-center text-xs text-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                            <span>Up 20% Month-Over-Month</span>
                        </div>
                    </div>
                </div>

                {/* Sales by Store and Sales Over Time */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Sales by Store */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Sales by Store</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">Store Name</span>
                                <span className="text-sm font-semibold text-gray-700">Total Sales</span>
                                <span className="text-sm font-semibold text-gray-700">Status</span>
                            </div>
                            {storeData.map((store, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                                    <span className="text-sm text-gray-900">{store.name}</span>
                                    <span className="text-sm font-semibold text-gray-900">{store.sales}</span>
                                    <span className="text-sm text-gray-600">{store.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#000435] text-white rounded-lg hover:bg-[#000525]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span className="text-sm font-medium">Download</span>
                        </button>
                    </div>

                    {/* Sales Over Time */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Sales Over Time</h3>
                        <div className="mb-4">
                            <p className="text-3xl font-bold text-gray-900">$440,733.97</p>
                        </div>
                        <div className="flex items-center space-x-4 mb-4 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                <span className="text-gray-600">Income</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                <span className="text-gray-600">Expenses</span>
                            </div>
                        </div>
                        {/* Chart Placeholder */}
                        <div className="relative h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                                {/* Grid lines */}
                                <line x1="0" y1="30" x2="400" y2="30" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="60" x2="400" y2="60" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="90" x2="400" y2="90" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="120" x2="400" y2="120" stroke="#f3f4f6" strokeWidth="1"/>
                                
                                {/* Income area (green) */}
                                <path 
                                    d="M 0 60 L 33 70 L 66 45 L 100 75 L 133 50 L 166 65 L 200 40 L 233 70 L 266 55 L 300 80 L 333 50 L 366 65 L 400 55 L 400 150 L 0 150 Z" 
                                    fill="#10b981" 
                                    opacity="0.3"
                                />
                                
                                {/* Expenses area (gray) */}
                                <path 
                                    d="M 0 80 L 33 95 L 66 70 L 100 100 L 133 75 L 166 90 L 200 65 L 233 95 L 266 80 L 300 105 L 333 70 L 366 90 L 400 75 L 400 150 L 0 150 Z" 
                                    fill="#d1d5db" 
                                    opacity="0.5"
                                />
                            </svg>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>June</span>
                            <span>July</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                        </div>
                    </div>
                </div>

                {/* Inventory Summary and Inventory by Store */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Inventory Summary */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Inventory Summary</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#000435] rounded-xl p-6 text-white">
                                <p className="text-xs mb-2 opacity-90">Total SKU</p>
                                <p className="text-4xl font-bold">523</p>
                            </div>
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                <p className="text-xs text-gray-600 mb-2">Low-Stock Items</p>
                                <p className="text-4xl font-bold text-gray-900">21</p>
                            </div>
                        </div>
                        <div className="bg-red-500 rounded-xl p-6 text-white mb-6">
                            <p className="text-xs mb-2 opacity-90">Out-of-stock items</p>
                            <p className="text-4xl font-bold">32</p>
                        </div>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#000435] text-white rounded-lg hover:bg-[#000525]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span className="text-sm font-medium">Download</span>
                        </button>
                    </div>

                    {/* Inventory by Store */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Inventory by Store</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200">
                                    <tr>
                                        <th className="pb-3 text-left text-xs font-semibold text-gray-700">Store Name</th>
                                        <th className="pb-3 text-left text-xs font-semibold text-gray-700">Products</th>
                                        <th className="pb-3 text-left text-xs font-semibold text-gray-700">Stock Value</th>
                                        <th className="pb-3 text-left text-xs font-semibold text-gray-700">Low Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {inventoryByStore.map((store, index) => (
                                        <tr key={index}>
                                            <td className="py-3 text-sm text-gray-900">{store.name}</td>
                                            <td className="py-3 text-sm text-gray-600">{store.products}</td>
                                            <td className="py-3 text-sm font-medium text-gray-900">{store.stockValue}</td>
                                            <td className="py-3 text-sm text-gray-600">{store.lowStock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Reports;
