import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

function UserRoles() {
    const [employees] = useState([
        { id: 1, name: 'Ekene Akabogu', position: 'Manager', empId: 'Emp-001', email: 'ekene.a@gmail.com', role: 'Admin' },
        { id: 2, name: 'Ayo Bankole', position: 'Staff', empId: 'Emp-052', email: 'ay.bankole@gmail.com', role: 'Cashier' },
        { id: 3, name: 'Oladapo Bayo', position: 'Staff', empId: 'Emp-089', email: 'o.bayo@gmail.com', role: 'Logistics' },
        { id: 4, name: 'Oladira Mustapha', position: 'Manager', empId: 'Emp-002', email: 'o.mustapha@gmail.com', role: 'Admin' },
        { id: 5, name: 'Alex Daniels', position: 'Manager', empId: 'Emp-005', email: 'alex.daniels@gmail.com', role: 'Admin' },
        { id: 6, name: 'Jerry Parker', position: 'Staff', empId: 'Emp-020', email: 'jerry.parker@gmail.com', role: 'Cashier' },
    ]);

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const toggleSelectEmployee = (id) => {
        setSelectedEmployees(prev => 
            prev.includes(id) 
                ? prev.filter(empId => empId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map(emp => emp.id));
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Employees</h2>
                    <button className="flex items-center space-x-2 px-6 py-3 bg-[#000435] text-white rounded-lg hover:bg-[#000525] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="font-medium">Add Employee</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        {/* Sort by Emp ID */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <option>Sort By: Emp ID</option>
                                <option>Sort By: Name</option>
                                <option>Sort By: Email</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {/* Sort by Role */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                <option>Sort By: Role</option>
                                <option>Admin</option>
                                <option>Cashier</option>
                                <option>Logistics</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>

                    {/* Filter Button */}
                    <button className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-gray-700">Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedEmployees.length === employees.length}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-[#000435] focus:ring-[#000435]"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Emp ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {employees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input 
                                                type="checkbox"
                                                checked={selectedEmployees.includes(employee.id)}
                                                onChange={() => toggleSelectEmployee(employee.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#000435] focus:ring-[#000435]"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{employee.name}</p>
                                                <p className="text-xs text-gray-500">{employee.position}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-900">{employee.empId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{employee.email}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200">
                                                    <option selected={employee.role === 'Admin'}>Admin</option>
                                                    <option selected={employee.role === 'Cashier'}>Cashier</option>
                                                    <option selected={employee.role === 'Logistics'}>Logistics</option>
                                                    <option>Manager</option>
                                                    <option>Staff</option>
                                                </select>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                    <span>Edit</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default UserRoles;
