import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllUsers, updateUser, deleteUser } from '../../api/users';

function UserRoles() {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [sortBy, setSortBy] = useState('empId');
    const [filterRole, setFilterRole] = useState('all');
    
    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({ full_name: '', email: '', role: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch users from API
    useEffect(() => {
        async function fetchUsers() {
            try {
                setIsLoading(true);
                setError(null);
                const users = await getAllUsers();
                
                // Map API fields to frontend expected fields
                const mappedUsers = users.map(user => ({
                    id: user.id,
                    name: user.full_name || '',
                    position: user.role === 'admin' ? 'Admin' : user.role === 'manager' ? 'Manager' : 'Staff',
                    empId: `Emp-${String(user.id).padStart(3, '0')}`,
                    email: user.email || '',
                    role: user.role || 'staff'
                }));
                
                setEmployees(mappedUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setError(error.message || "Failed to load users");
            } finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const toggleSelectEmployee = (id) => {
        setSelectedEmployees(prev => 
            prev.includes(id) 
                ? prev.filter(empId => empId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedEmployees.length === currentPageUsers.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(currentPageUsers.map(emp => emp.id));
        }
    };

    // Sorting and filtering logic
    const getSortedAndFilteredEmployees = () => {
        let filtered = [...employees];
        
        // Filter by role
        if (filterRole !== 'all') {
            filtered = filtered.filter(emp => emp.role === filterRole);
        }
        
        // Sort by selected option
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'empId':
                    return a.empId.localeCompare(b.empId);
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'email':
                    return a.email.localeCompare(b.email);
                default:
                    return 0;
            }
        });
        
        return filtered;
    };

    const sortedAndFilteredEmployees = getSortedAndFilteredEmployees();
    const totalFilteredUsers = sortedAndFilteredEmployees.length;
    const totalPages = Math.ceil(totalFilteredUsers / usersPerPage);
    const indexOfLastUser = Math.min(currentPage * usersPerPage, totalFilteredUsers);
    const indexOfFirstUser = (currentPage - 1) * usersPerPage;
    const currentPageUsers = sortedAndFilteredEmployees.slice(indexOfFirstUser, indexOfLastUser);

    // Reset to page 1 when filters change
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (newRole) => {
        setFilterRole(newRole);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Edit User Functions
    const handleEditUser = (employee) => {
        setEditingUser(employee);
        setEditFormData({
            full_name: employee.name,
            email: employee.email,
            role: employee.role
        });
        setUpdateError('');
        setShowEditModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setIsUpdating(true);

        try {
            await updateUser(editingUser.id, editFormData);
            
            // Update the local employee list
            setEmployees(prev => prev.map(emp => 
                emp.id === editingUser.id 
                    ? {
                        ...emp,
                        name: editFormData.full_name,
                        email: editFormData.email,
                        role: editFormData.role,
                        position: editFormData.role === 'admin' ? 'Admin' : editFormData.role === 'manager' ? 'Manager' : 'Staff'
                    }
                    : emp
            ));
            
            setShowEditModal(false);
            setEditingUser(null);
        } catch (error) {
            setUpdateError(error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!showDeleteConfirm) {
            setShowDeleteConfirm(true);
            return;
        }

        setUpdateError('');
        setIsDeleting(true);

        try {
            await deleteUser(editingUser.id);
            
            // Remove user from local list
            setEmployees(prev => prev.filter(emp => emp.id !== editingUser.id));
            
            setShowEditModal(false);
            setEditingUser(null);
            setShowDeleteConfirm(false);
        } catch (error) {
            setUpdateError(error.message);
            setShowDeleteConfirm(false);
        } finally {
            setIsDeleting(false);
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

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        {/* Sort by Emp ID */}
                        <div className="relative">
                            <select 
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <option value="empId">Sort By: Emp ID</option>
                                <option value="name">Sort By: Name</option>
                                <option value="email">Sort By: Email</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>

                        {/* Sort by Role */}
                        <div className="relative">
                            <select 
                                value={filterRole}
                                onChange={(e) => handleRoleFilterChange(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <option value="all">Sort By: Role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="staff">Staff</option>
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
                                            checked={selectedEmployees.length === currentPageUsers.length && currentPageUsers.length > 0}
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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : employees.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    currentPageUsers.map((employee) => (
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
                                                    <option selected={employee.role === 'admin'}>Admin</option>
                                                    <option selected={employee.role === 'manager'}>Manager</option>
                                                    <option selected={employee.role === 'staff'}>Staff</option>
                                                </select>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <button 
                                                    onClick={() => handleEditUser(employee)}
                                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                                                >
                                                    <span>Edit</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-semibold">{indexOfFirstUser + 1}</span> to{' '}
                                <span className="font-semibold">
                                    {indexOfLastUser}
                                </span>{' '}
                                of <span className="font-semibold">{totalFilteredUsers}</span> users
                            </div>
                            
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-3 py-1 rounded border ${
                                            currentPage === index + 1
                                                ? 'bg-[#000435] text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit User</h2>
                        
                        <form onSubmit={handleUpdateUser}>
                            {updateError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {updateError}
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    value={editFormData.full_name}
                                    onChange={(e) => setEditFormData(prev => ({ ...prev, full_name: e.target.value }))}
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                    required
                                />
                            </div>

                            {/* Role */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role:
                                </label>
                                <div className="relative">
                                    <select
                                        value={editFormData.role}
                                        onChange={(e) => setEditFormData(prev => ({ ...prev, role: e.target.value }))}
                                        className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="staff">Staff</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="space-y-3">
                                {/* Delete Confirmation Message */}
                                {showDeleteConfirm && (
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-sm text-yellow-800 font-semibold">
                                            Are you sure you want to delete this user? This action cannot be undone.
                                        </p>
                                    </div>
                                )}

                                {/* Main Action Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setEditingUser(null);
                                            setUpdateError('');
                                            setShowDeleteConfirm(false);
                                        }}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdating || showDeleteConfirm}
                                        className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                                            isUpdating || showDeleteConfirm
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-[#000435] text-white hover:bg-[#000525]'
                                        }`}
                                    >
                                        {isUpdating ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={handleDeleteUser}
                                    disabled={isDeleting || isUpdating}
                                    className={`w-full py-2.5 rounded-lg font-semibold transition-colors ${
                                        showDeleteConfirm
                                            ? isDeleting
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                            : 'bg-red-50 text-red-600 border-2 border-red-600 hover:bg-red-100'
                                    } ${(isDeleting || isUpdating) && !showDeleteConfirm ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isDeleting ? 'Deleting...' : showDeleteConfirm ? 'Confirm Delete' : 'Delete User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default UserRoles;
