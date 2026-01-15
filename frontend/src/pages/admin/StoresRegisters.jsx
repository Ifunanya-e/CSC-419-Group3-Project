import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

function StoresRegisters() {
    const [stores] = useState([
        { id: 1, name: 'Main Branch', location: 'Lagos', status: 'Active' },
        { id: 2, name: 'Abuja Outlet', location: 'Abuja', status: 'Active' },
        { id: 3, name: 'Lagos Outlet', location: 'Lekki', status: 'Inactive' },
        { id: 4, name: 'Abia Branch', location: 'Umuahia', status: 'Active' },
        { id: 5, name: 'Imo Outlet', location: 'Owerri', status: 'Active' },
        { id: 6, name: 'Ogun Outlet', location: 'Owo', status: 'Inactive' },
    ]);

    const [registers] = useState([
        { id: 'Reg 01-310', store: 'Main Branch', status: 'Active' },
        { id: 'Reg 01-315', store: 'Main Branch', status: 'Active' },
        { id: 'Reg 01-313', store: 'Main Branch', status: 'Inactive' },
        { id: 'Reg 02-313', store: 'Lagos Outlet', status: 'Active' },
        { id: 'Reg 05-313', store: 'Abia Branch', status: 'Active' },
        { id: 'Reg 05-313', store: 'Ogun Outlet', status: 'Inactive' },
    ]);

    return (
        <AdminLayout>
            <div className="p-4 md:p-6">
                {/* Page Title */}
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Stores & Registers Overview</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Total Stores */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.129 3h17.742a1.5 1.5 0 0 1 1.061.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-800">Total Stores</h3>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-5xl font-bold text-gray-900">120</p>
                            <p className="text-sm text-gray-500">Last Week</p>
                        </div>
                    </div>

                    {/* Active Stores */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.129 3h17.742a1.5 1.5 0 0 1 1.061.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-800">Active Stores</h3>
                            </div>
                            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                <FiTrendingUp className="w-3 h-3" />
                                <span>+20</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-5xl font-bold text-gray-900">96</p>
                            <p className="text-sm text-gray-500">Last Week</p>
                        </div>
                    </div>

                    {/* Inactive Stores */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.129 3h17.742a1.5 1.5 0 0 1 1.061.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-gray-800">Inactive Stores</h3>
                            </div>
                            <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                                <FiTrendingDown className="w-3 h-3" />
                                <span>-10%</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-5xl font-bold text-gray-900">22</p>
                            <p className="text-sm text-gray-500">Last Week</p>
                        </div>
                    </div>
                </div>

                {/* Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Stores Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-800">Stores</h3>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-sm font-medium text-gray-700">Add Store</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">Manage all business locations in the system.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Store Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {stores.map((store) => (
                                        <tr key={store.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{store.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{store.location}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                                                    store.status === 'Active' 
                                                        ? 'text-green-700 bg-green-100' 
                                                        : 'text-red-700 bg-red-100'
                                                }`}>
                                                    {store.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                                    <span>Edit</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Registers Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-800">Registers</h3>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-sm font-medium text-gray-700">Add Register</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">Configure and manage POS registers assigned to stores.</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Register ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Store</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {registers.map((register, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{register.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{register.store}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                                                    register.status === 'Active' 
                                                        ? 'text-green-700 bg-green-100' 
                                                        : 'text-red-700 bg-red-100'
                                                }`}>
                                                    {register.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                                    <span>Edit</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </td>
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

export default StoresRegisters;
