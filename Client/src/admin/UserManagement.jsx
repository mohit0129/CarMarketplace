import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, AlertCircle, Trash2, X, Calendar, UserCheck, ChevronDown, RefreshCcw } from 'lucide-react';
import Sidebar from './Sidebar';
import API_BASE_URL from '../config/apiConfig';
import AdminAuth from './AdminAuth';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced filter states
  const [filters, setFilters] = useState({
    search: '',
    dateRange: {
      start: '',
      end: ''
    },
    status: '',
    lastLoginAfter: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get-users`);
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply filters effect
  useEffect(() => {
    let result = [...users];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.mobile?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter(user => user.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange.start) {
      result = result.filter(user => new Date(user.createdAt) >= new Date(filters.dateRange.start));
    }
    if (filters.dateRange.end) {
      result = result.filter(user => new Date(user.createdAt) <= new Date(filters.dateRange.end));
    }

    // Last login filter
    if (filters.lastLoginAfter) {
      result = result.filter(user => new Date(user.lastLogin) >= new Date(filters.lastLoginAfter));
    }

    // Sorting
    result.sort((a, b) => {
      const aValue = a[filters.sortBy] || '';
      const bValue = b[filters.sortBy] || '';
      
      if (filters.sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

    setFilteredUsers(result);
  }, [filters, users]);

  const handleEditUser = (user) => {
    setEditableUser({
      id: user._id ? user._id.toString() : "",
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
    setIsEditing(true);
  };

  const handleSubmitUpdate = async () => {
    if (!editableUser.id || !editableUser.name || !editableUser.email || !editableUser.mobile) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableUser),
      });

      const result = await response.json();
      if (result.flag === "1") {
        fetchUsers();
        setIsEditing(false);
        setEditableUser(null);
        alert("User updated successfully!");
      } else {
        alert(result.message || "Error updating user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/deleteUser/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully!");
        fetchUsers();
      } else {
        const result = await response.json();
        alert(result.message || "Error deleting user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      dateRange: {
        start: '',
        end: ''
      },
      status: '',
      lastLoginAfter: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users (name, email, mobile)..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border rounded"
                />
              </div>

              <div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-1/2 p-2 border rounded"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-1/2 p-2 border rounded"
                  placeholder="End Date"
                />
              </div>

              <div>
                <input
                  type="date"
                  value={filters.lastLoginAfter}
                  onChange={(e) => setFilters(prev => ({ ...prev, lastLoginAfter: e.target.value }))}
                  className="w-full p-2 border rounded"
                  placeholder="Last Login After"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                  <option value="status">Sort by Status</option>
                  <option value="lastLogin">Sort by Last Login</option>
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                <RefreshCcw size={16} />
                Reset Filters
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Last Login</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id || `${user.name}-${user.email}`} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}
                    `}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{user.lastLogin}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button onClick={() => handleViewUser(user)} className="text-blue-500 hover:text-blue-700">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEditUser(user)} className="text-green-500 hover:text-green-700">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details Modal */}
        {showUserDetail && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
              <button 
                onClick={() => setShowUserDetail(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">User Details</h2>
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
                <p><strong>Status:</strong> 
                  <span className={`
                    ml-2 px-2 py-1 rounded-full text-xs
                    ${selectedUser.status === 'Active' ? 'bg-green-100 text-green-800' :
                      selectedUser.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}
                  `}>
                    {selectedUser.status}
                  </span>
                </p>
                <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                <p><strong>Created on:</strong> {selectedUser.createdAt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditing && editableUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editableUser.id}
                  className="w-full p-2 border rounded bg-gray-100"
                  disabled
                />
                <input
                  type="text"
                  value={editableUser.name}
                  onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  value={editableUser.email}
                  onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editableUser.mobile}
                  onChange={(e) => setEditableUser({ ...editableUser, mobile: e.target.value })}
                  placeholder="Mobile"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmitUpdate} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAuth(UserManagement);