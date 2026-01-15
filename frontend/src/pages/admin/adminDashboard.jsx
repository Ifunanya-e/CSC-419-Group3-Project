import AdminLayout from '../../components/admin/AdminLayout';

function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="p-4 md:p-6">
                {/* Dashboard Title */}
                <div className="mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h2>
                </div>

                {/* Main Grid - 2 rows x 3 columns, with performance chart spanning 2 rows */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 mb-4">
                    {/* Row 1, Column 1 - Notification Card */}
                    <div className="bg-[#000435] rounded-xl p-6 text-white flex flex-col justify-between">
                        <div className="flex items-center space-x-2 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                            <span className="font-semibold text-base">Notification</span>
                        </div>
                        <p className="text-base mb-6 leading-relaxed flex-grow">
                            This week accounts just came in. Ready to print.
                        </p>
                        <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                            <span>View Report</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Row 1, Column 2 - Products Sold Card */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-medium text-gray-600">Products Sold</h3>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4 flex-grow flex items-center">
                            <p className="text-6xl font-bold text-gray-900">123</p>
                        </div>
                        <div className="flex items-center text-sm text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                            <span>-4% decrease from yesterday</span>
                        </div>
                    </div>

                    {/* Row 1-2, Column 3 - Performance Chart (spans 2 rows) */}
                    <div className="lg:row-span-2 bg-white rounded-xl p-5 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-600">Total View</h3>
                                <h4 className="text-sm font-medium text-gray-600">Performance</h4>
                            </div>
                            <div className="text-xs space-y-1">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                                    <span className="text-gray-600">View Count</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                                    <span className="text-gray-600">Percentage</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                                    <span className="text-gray-600">Sales</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center flex-1 py-8">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    {/* Background circle */}
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="20"/>
                                    
                                    {/* Green segment - 54% */}
                                    <circle 
                                        cx="50" 
                                        cy="50" 
                                        r="40" 
                                        fill="none" 
                                        stroke="#10b981" 
                                        strokeWidth="20"
                                        strokeDasharray="135.7 251.2"
                                        strokeDashoffset="0"
                                    />
                                    
                                    {/* Purple segment - 21% */}
                                    <circle 
                                        cx="50" 
                                        cy="50" 
                                        r="40" 
                                        fill="none" 
                                        stroke="#a855f7" 
                                        strokeWidth="20"
                                        strokeDasharray="52.8 251.2"
                                        strokeDashoffset="-135.7"
                                    />
                                    
                                    {/* Orange segment - 25% */}
                                    <circle 
                                        cx="50" 
                                        cy="50" 
                                        r="40" 
                                        fill="none" 
                                        stroke="#fb923c" 
                                        strokeWidth="20"
                                        strokeDasharray="62.8 251.2"
                                        strokeDashoffset="-188.5"
                                    />
                                </svg>
                                
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-xs text-gray-600">Total Count</p>
                                    <p className="text-2xl font-bold text-gray-900">638K</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mt-4 text-xs">
                            <div className="text-center">
                                <p className="text-purple-500 font-semibold">21%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-orange-400 font-semibold">25%</p>
                            </div>
                            <div className="text-center">
                                <p className="text-emerald-400 font-semibold">54%</p>
                            </div>
                        </div>
                    </div>

                    {/* Row 2, Column 1 - Active Registers Card */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-medium text-gray-600">Active Registers</h3>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4 flex-grow flex items-center">
                            <p className="text-6xl font-bold text-gray-900">98</p>
                        </div>
                        <p className="text-sm text-gray-600">
                            22 Registers Inactive. <span className="text-red-600 font-medium">Check for fault</span>
                        </p>
                    </div>

                    {/* Row 2, Column 2 - Total Earnings Card */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-medium text-gray-600">Total Earnings</h3>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-4 flex-grow flex items-center">
                            <p className="text-4xl font-bold text-gray-900">$626 466.97</p>
                        </div>
                        <div className="flex items-center text-sm text-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                            <span>Up 20% Month-Over-Month</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Revenue Chart and Sales Report */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                        <div className="mb-3">
                            <h3 className="text-base font-semibold text-gray-800">Revenue</h3>
                            <p className="text-xl font-bold text-gray-900">$100 466.97</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3 text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                <span className="text-gray-600">Income</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                <span className="text-gray-600">Expenses</span>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative h-40">
                            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                                {/* Grid lines */}
                                <line x1="0" y1="30" x2="400" y2="30" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="60" x2="400" y2="60" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="90" x2="400" y2="90" stroke="#f3f4f6" strokeWidth="1"/>
                                <line x1="0" y1="120" x2="400" y2="120" stroke="#f3f4f6" strokeWidth="1"/>
                                
                                {/* Expenses area (gray) */}
                                <path 
                                    d="M 0 80 L 33 95 L 66 70 L 100 100 L 133 75 L 166 90 L 200 65 L 233 95 L 266 80 L 300 105 L 333 70 L 366 90 L 400 75 L 400 150 L 0 150 Z" 
                                    fill="#d1d5db" 
                                    opacity="0.5"
                                />
                                
                                {/* Income area (green) */}
                                <path 
                                    d="M 0 60 L 33 70 L 66 45 L 100 75 L 133 50 L 166 65 L 200 40 L 233 70 L 266 55 L 300 80 L 333 50 L 366 65 L 400 55 L 400 150 L 0 150 Z" 
                                    fill="#10b981" 
                                    opacity="0.3"
                                />
                                
                                {/* Income line */}
                                <path 
                                    d="M 0 60 L 33 70 L 66 45 L 100 75 L 133 50 L 166 65 L 200 40 L 233 70 L 266 55 L 300 80 L 333 50 L 366 65 L 400 55" 
                                    stroke="#10b981" 
                                    strokeWidth="2" 
                                    fill="none"
                                />
                                
                                {/* Expenses line */}
                                <path 
                                    d="M 0 80 L 33 95 L 66 70 L 100 100 L 133 75 L 166 90 L 200 65 L 233 95 L 266 80 L 300 105 L 333 70 L 366 90 L 400 75" 
                                    stroke="#6b7280" 
                                    strokeWidth="2" 
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* Month labels */}
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

                    {/* Sales Report Card */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-base font-semibold text-gray-800">Sales Report</h3>
                            <button className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Product Out of Stock */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-700">Product Out of Stock</span>
                                    <span className="text-xs font-semibold text-gray-900">(345)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#000435] h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            {/* Product Launched */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-700">Product Lauched</span>
                                    <span className="text-xs font-semibold text-gray-900">(180)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#000435] h-2 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                            </div>

                            {/* Product Sold */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-700">Product Sold</span>
                                    <span className="text-xs font-semibold text-gray-900">(533)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#000435] h-2 rounded-full" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
