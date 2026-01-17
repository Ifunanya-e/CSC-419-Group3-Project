import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { updateMyPassword } from '../../api/users';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Settings() {
    const { user } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('ENGLISH');
    const [dataCacheDuration, setDataCacheDuration] = useState('5 mins');
    const [dashboardAutoRefresh, setDashboardAutoRefresh] = useState('OFF');
    const [inventoryStrategy, setInventoryStrategy] = useState('Real-time');
    
    // Password Modal State
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordUpdateError, setPasswordUpdateError] = useState('');
    const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

    // Password validation function (from RegisterForm)
    function validatePassword(password) {
        const errors = [];
        
        if (!/[A-Z]/.test(password)) {
            errors.push("Must include a Capital Letter");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Must include small letters");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Must include a digit");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Must include symbols");
        }
        if (password.length < 8) {
            errors.push("Must be at least 8 characters");
        }
        
        return errors;
    }

    const getRequirementStatus = (requirement) => {
        return !passwordErrors.includes(requirement);
    };

    function handleNewPasswordChange(e) {
        const newPassword = e.target.value;
        setPasswordData(prev => ({ ...prev, newPassword }));
        setPasswordErrors(validatePassword(newPassword));
    }

    async function handlePasswordUpdate(e) {
        e.preventDefault();
        setPasswordUpdateError('');
        setPasswordUpdateSuccess(false);

        // Validate new password
        const errors = validatePassword(passwordData.newPassword);
        if (errors.length > 0) {
            setPasswordErrors(errors);
            setShowPasswordRequirements(true);
            setPasswordUpdateError('Please meet all password requirements');
            return;
        }

        // Check if passwords match
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordUpdateError('New passwords do not match');
            return;
        }

        try {
            setIsUpdatingPassword(true);
            await updateMyPassword({
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword
            });
            
            setPasswordUpdateSuccess(true);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordErrors([]);
            
            // Close modal after 2 seconds
            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordUpdateSuccess(false);
            }, 2000);
        } catch (error) {
            setPasswordUpdateError(error.message);
        } finally {
            setIsUpdatingPassword(false);
        }
    }

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
                                {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <p className="text-xs text-gray-600 mb-1">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}</p>
                                <p className="text-lg font-bold text-gray-900">{user?.full_name || 'User Name'}</p>
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
                            <span className="text-sm font-semibold text-gray-900">{user?.email || 'N/A'}</span>
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
                            <button 
                                onClick={() => setShowPasswordModal(true)}
                                className="w-full px-6 py-3 bg-[#000435] text-white rounded-lg hover:bg-[#000525] transition-colors font-medium text-sm"
                            >
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

            {/* Password Reset Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
                        
                        {passwordUpdateSuccess ? (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <FaCheck className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-green-600 font-semibold">Password updated successfully!</p>
                            </div>
                        ) : (
                            <form onSubmit={handlePasswordUpdate}>
                                {passwordUpdateError && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                        {passwordUpdateError}
                                    </div>
                                )}

                                {/* Current Password */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password:
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                        required
                                    />
                                </div>

                                {/* New Password */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password:
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={handleNewPasswordChange}
                                        onFocus={() => setShowPasswordRequirements(true)}
                                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                        required
                                    />
                                    
                                    {/* Password Requirements */}
                                    {showPasswordRequirements && passwordData.newPassword && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                                            <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                                            
                                            <div className="space-y-1.5">
                                                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include a Capital Letter") ? "text-green-600" : "text-red-600"}`}>
                                                    {getRequirementStatus("Must include a Capital Letter") ? <FaCheck /> : <FaTimes />}
                                                    <span>Must include a Capital Letter</span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include small letters") ? "text-green-600" : "text-red-600"}`}>
                                                    {getRequirementStatus("Must include small letters") ? <FaCheck /> : <FaTimes />}
                                                    <span>Must include small letters</span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include a digit") ? "text-green-600" : "text-red-600"}`}>
                                                    {getRequirementStatus("Must include a digit") ? <FaCheck /> : <FaTimes />}
                                                    <span>Must include a digit</span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must include symbols") ? "text-green-600" : "text-red-600"}`}>
                                                    {getRequirementStatus("Must include symbols") ? <FaCheck /> : <FaTimes />}
                                                    <span>Must include symbols (!@#$%^&*...)</span>
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 text-xs ${getRequirementStatus("Must be at least 8 characters") ? "text-green-600" : "text-red-600"}`}>
                                                    {getRequirementStatus("Must be at least 8 characters") ? <FaCheck /> : <FaTimes />}
                                                    <span>Must be at least 8 characters</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm New Password */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password:
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#000435] focus:border-[#000435]"
                                        required
                                    />
                                    
                                    {/* Password Match Indicator */}
                                    {passwordData.confirmPassword && passwordData.newPassword && (
                                        <div className="mt-2">
                                            {passwordData.newPassword === passwordData.confirmPassword ? (
                                                <p className="text-xs text-green-600 flex items-center gap-1">
                                                    <FaCheck /> Passwords match
                                                </p>
                                            ) : (
                                                <p className="text-xs text-red-600 flex items-center gap-1">
                                                    <FaTimes /> Passwords do not match
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowPasswordModal(false);
                                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                            setPasswordErrors([]);
                                            setPasswordUpdateError('');
                                        }}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isUpdatingPassword}
                                        className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                                            isUpdatingPassword
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-[#000435] text-white hover:bg-[#000525]'
                                        }`}
                                    >
                                        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default Settings;
