import { useState } from 'react'
import { Search, Filter, MoreHorizontal, Eye, Edit, AlertCircle, X, MessageSquare } from 'lucide-react'

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDetail, setShowUserDetail] = useState(false)

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-06-15 10:30 AM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', status: 'Active', lastLogin: '2023-06-14 02:45 PM' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Renter', status: 'Suspended', lastLogin: '2023-06-10 09:15 AM' },
    // Add more user data as needed
  ]

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserDetail(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-md">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Bulk Actions */}
      <div className="mb-4">
        <select className="border rounded-md px-4 py-2">
          <option>Bulk Actions</option>
          <option>Suspend Selected</option>
          <option>Delete Selected</option>
        </select>
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Last Login</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{user.lastLogin}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button onClick={() => handleViewUser(user)} className="text-blue-500 hover:text-blue-700">
                      <Eye size={18} />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <AlertCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Panel */}
      {showUserDetail && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-1/3 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">User Details</h2>
              <button onClick={() => setShowUserDetail(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Profile Information</h3>
                <p>Name: {selectedUser.name}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Role: {selectedUser.role}</p>
                <p>Status: {selectedUser.status}</p>
              </div>

              <div>
                <h3 className="font-semibold">Activity Logs</h3>
                <p>Last Login: {selectedUser.lastLogin}</p>
                {/* Add more activity logs here */}
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
                  <Edit size={18} className="mr-2" />
                  Edit User
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center">
                  <AlertCircle size={18} className="mr-2" />
                  Suspend User
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  Message User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}