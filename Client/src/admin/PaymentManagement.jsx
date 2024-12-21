import React, { useState, useEffect } from 'react';
import { Eye, Filter, ChevronLeft, ChevronRight, X, Check, RefreshCcw, Trash2 } from 'lucide-react';
import Sidebar from './Sidebar';
import AdminAuth from './AdminAuth';
import API_BASE_URL from '../config/apiConfig';

function PaymentManagement() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: ''
  });

  const parseAmount = (amount) => {
    if (amount === null || amount === undefined) return 0;
    if (typeof amount === 'number') return amount;
    if (typeof amount === 'object' && amount.$numberDecimal) {
      return parseFloat(amount.$numberDecimal);
    }
    const parsed = parseFloat(amount);
    return !isNaN(parsed) ? parsed : 0;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/payments`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        const processedTransactions = data.map(transaction => ({
          ...transaction,
          amount: parseAmount(transaction.amount)
        }));
        setTransactions(processedTransactions);
        setFilteredTransactions(processedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Apply filters effect
  useEffect(() => {
    let result = [...transactions];

    // Search filter
    if (filters.search) {
      result = result.filter(t =>
        t.transaction_id?.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.user_id?.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.car_id?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(t => t.payment_status === filters.status);
    }

    // Date range filter
    if (filters.startDate) {
      result = result.filter(t => new Date(t.date_of_payment) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter(t => new Date(t.date_of_payment) <= new Date(filters.endDate));
    }

    // Amount range filter
    if (filters.minAmount) {
      result = result.filter(t => t.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      result = result.filter(t => t.amount <= parseFloat(filters.maxAmount));
    }

    setFilteredTransactions(result);
  }, [filters, transactions]);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/${transactionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setTransactions(transactions.filter(t => t._id !== transactionId));
        if (selectedTransaction && selectedTransaction._id === transactionId) {
          setShowDetailPanel(false);
          setSelectedTransaction(null);
        }
        alert('Transaction deleted successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }
    } catch (error) {
      alert(`Failed to delete transaction: ${error.message}`);
    }
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailPanel(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transaction Management</h1>
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
              <div>
                <input
                  type="text"
                  placeholder="Search by ID, User, or Car"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Successful</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Amount"
                  value={filters.minAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max Amount"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-200 text-red rounded hover:bg-red-300"
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
                <th className="py-2 px-4 border-b text-left">Transaction ID</th>
                <th className="py-2 px-4 border-b text-left">User ID</th>
                {/* <th className="py-2 px-4 border-b text-left">Car ID</th> */}
                <th className="py-2 px-4 border-b text-left">Amount</th>
                <th className="py-2 px-4 border-b text-left">Payment Method</th>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{transaction.transaction_id}</td>
                  <td className="py-2 px-4 border-b">{transaction.user_id || 'N/A'}</td>
                  {/* <td className="py-2 px-4 border-b">{transaction.car_id || 'N/A'}</td> */}
                  <td className="py-2 px-4 border-b">
                    ₹{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-4 border-b">{transaction.payment_method || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{formatDate(transaction.date_of_payment)}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${(() => {
                          console.log("Payment Status:", transaction.payment_status); // Log here
                          if (transaction.payment_status === 'success') {
                            return 'bg-green-100 text-green-800';
                          } else if (transaction.payment_status === 'pending') {
                            return 'bg-yellow-100 text-yellow-800';
                          } else {
                            return 'bg-red-100 text-red-800';
                          }
                        })()
                        }`}
                    >
                      {transaction.payment_status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewTransaction(transaction)}
                        className="text-blue-500 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Transaction"
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

        {showDetailPanel && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
              <button
                onClick={() => setShowDetailPanel(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
              <div className="space-y-2">
                <p><strong>Transaction ID:</strong> {selectedTransaction.transaction_id}</p>
                <p><strong>User ID:</strong> {selectedTransaction.user_id || 'N/A'}</p>
                <p><strong>Car ID:</strong> {selectedTransaction.car_id || 'N/A'}</p>
                <p><strong>Amount:</strong> ₹{selectedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Payment Method:</strong> {selectedTransaction.payment_method || 'N/A'}</p>
                <p><strong>Date:</strong> {formatDate(selectedTransaction.date_of_payment)}</p>
                <p><strong>Status:</strong>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ml-2 ${selectedTransaction.payment_status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : selectedTransaction.payment_status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {selectedTransaction.payment_status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAuth(PaymentManagement);