import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('ENGLISH');
    const [dataCacheDuration, setDataCacheDuration] = useState('5 mins');
    const [dashboardAutoRefresh, setDashboardAutoRefresh] = useState('OFF');
    const [inventoryStrategy, setInventoryStrategy] = useState('Real-time');

    return (
        <AdminLayout>
            <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h2>
                    </div>
                </div>

                {/* Personal Profile */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Personal Profile</h3>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Picture and Name */}
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                AD
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 mb-1">Admin</p>
                                <p className="text-lg font-bold text-gray-900">Alex Daniels</p>
                            </div>
                        </div>

                        {/* Organization */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Organization:</span>
                            <span className="text-sm font-semibold text-gray-900">Realx Inc.</span>
                        </div>

                        {/* Company Email */}
                        <div className="flex items-center justify-between md:col-span-1">
                            <span className="text-sm text-gray-700">Company Email:</span>
                            <span className="text-sm font-semibold text-gray-900">oladiramustapha@mail.com</span>
                        </div>

                        {/* Warehouse Location */}
                        <div className="flex items-center justify-between md:col-span-1">
                            <span className="text-sm text-gray-700">Warehouse Location:</span>
                            <span className="text-sm font-semibold text-gray-900">14 Rd close of cherlaton</span>
                        </div>
                    </div>
                </div>

                {/* User Management */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">User Management</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {/* Staff Management */}
                        <div className="pt-6 md:pt-0 md:pr-6 first:pt-0">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 underline">Staff Management</h4>
                            <div className="space-y-3">
                                <button className="w-full px-6 py-3 bg-[#000435] text-white rounded-lg hover:bg-[#000525] transition-colors font-medium text-sm">
                                    Edit Staff
                                </button>
                                <button className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm">
                                    Suspended Staff
                                </button>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="pt-6 md:pt-0 md:px-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 underline">Password</h4>
                            <button className="w-full px-6 py-3 bg-[#000435] text-white rounded-lg hover:bg-[#000525] transition-colors font-medium text-sm">
                                User Password Reset
                            </button>
                        </div>

                        {/* Security */}
                        <div className="pt-6 md:pt-0 md:pl-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4 underline">Security</h4>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-sm text-gray-900">Two- Factor Authentication</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-sm text-gray-900">Company Documents</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-sm text-gray-900">Login Data</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Preference */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">System Preference</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {/* UI Preference */}
                        <div className="pt-6 md:pt-0 md:pr-6 first:pt-0">
                            <h4 className="text-sm font-semibold text-gray-700 mb-6 underline">UI Preference</h4>
                            
                            <div className="space-y-6">
                                {/* Dark Mode */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-900">Dark Mode:</span>
                                    <button 
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`relative w-14 h-7 rounded-full transition-colors ${
                                            darkMode ? 'bg-[#000435]' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span 
                                            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                                                darkMode ? 'translate-x-7' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Language */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-900">Language:</span>
                                    <div className="relative">
                                        <select 
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        >
                                            <option>ENGLISH</option>
                                            <option>SPANISH</option>
                                            <option>FRENCH</option>
                                            <option>GERMAN</option>
                                        </select>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Performance Controls */}
                        <div className="pt-6 md:pt-0 md:pl-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-6 underline">Performance Controls</h4>
                            
                            <div className="space-y-6">
                                {/* Data Cache Duration */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-900">Data Cache Duration:</span>
                                    <div className="relative">
                                        <select 
                                            value={dataCacheDuration}
                                            onChange={(e) => setDataCacheDuration(e.target.value)}
                                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        >
                                            <option>5 mins</option>
                                            <option>10 mins</option>
                                            <option>15 mins</option>
                                            <option>30 mins</option>
                                            <option>1 hour</option>
                                        </select>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Dashboard Auto Refresh */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-900">Dashboard Auto Refresh:</span>
                                    <div className="relative">
                                        <select 
                                            value={dashboardAutoRefresh}
                                            onChange={(e) => setDashboardAutoRefresh(e.target.value)}
                                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                        >
                                            <option>OFF</option>
                                            <option>30 seconds</option>
                                            <option>1 minute</option>
                                            <option>5 minutes</option>
                                            <option>10 minutes</option>
                                        </select>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Inventory Re-calculation Strategy */}
                                <div>
                                    <label className="text-sm text-gray-900 block mb-3">Inventory Re-calculation Strategy:</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="inventory-strategy" 
                                                value="Real-time"
                                                checked={inventoryStrategy === 'Real-time'}
                                                onChange={(e) => setInventoryStrategy(e.target.value)}
                                                className="w-4 h-4 text-[#000435] focus:ring-[#000435]"
                                            />
                                            <span className="text-sm text-gray-700">Real-time</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="inventory-strategy" 
                                                value="Scheduled"
                                                checked={inventoryStrategy === 'Scheduled'}
                                                onChange={(e) => setInventoryStrategy(e.target.value)}
                                                className="w-4 h-4 text-[#000435] focus:ring-[#000435]"
                                            />
                                            <span className="text-sm text-gray-700">Scheduled</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="inventory-strategy" 
                                                value="Hybrid"
                                                checked={inventoryStrategy === 'Hybrid'}
                                                onChange={(e) => setInventoryStrategy(e.target.value)}
                                                className="w-4 h-4 text-[#000435] focus:ring-[#000435]"
                                            />
                                            <span className="text-sm text-gray-700">Hybrid</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Settings;
