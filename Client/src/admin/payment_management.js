import { useState } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, X, Check, RefreshCcw, XCircle } from 'lucide-react'

export default function CarTransactions() {
  const [showDetailPanel, setShowDetailPanel] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const transactions = [
    { id: 'TRX001', buyer: 'John Doe', seller: 'Car Dealership A', car: 'Tesla Model 3', amount: 45000, date: '2023-06-15', status: 'Completed' },
    { id: 'TRX002', buyer: 'Jane Smith', seller: 'Car Dealership B', car: 'Ford F-150', amount: 55000, date: '2023-06-14', status: 'Pending' },
    { id: 'TRX003', buyer: 'Bob Johnson', seller: 'Car Dealership C', car: 'Toyota RAV4', amount: 35000, date: '2023-06-13', status: 'Failed' },
    // Add more transaction data as needed
  ]

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setShowDetailPanel(true)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Marketplace Transactions</h1>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <input type="date" className="p-2 border rounded" />
          <span>to</span>
          <input type="date" className="p-2 border rounded" />
        </div>
        <select className="p-2 border rounded">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
        <div className="flex items-center space-x-2">
          <input type="number" placeholder="Min Amount" className="p-2 border rounded w-32" />
          <span>-</span>
          <input type="number" placeholder="Max Amount" className="p-2 border rounded w-32" />
        </div>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border rounded"
          />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Transaction ID</th>
              <th className="py-2 px-4 border-b text-left">Buyer</th>
              <th className="py-2 px-4 border-b text-left">Seller</th>
              <th className="py-2 px-4 border-b text-left">Car</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewTransaction(transaction)}>
                <td className="py-2 px-4 border-b">{transaction.id}</td>
                <td className="py-2 px-4 border-b">{transaction.buyer}</td>
                <td className="py-2 px-4 border-b">{transaction.seller}</td>
                <td className="py-2 px-4 border-b">{transaction.car}</td>
                <td className="py-2 px-4 border-b">${transaction.amount.toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{transaction.date}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>Showing 1-3 of 3 results</p>
        <div className="flex space-x-2">
          <button className="p-2 border rounded">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 border rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Transaction Detail Panel */}
      {showDetailPanel && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-1/3 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Transaction Details</h2>
              <button onClick={() => setShowDetailPanel(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Transaction Information</h3>
                <p>ID: {selectedTransaction.id}</p>
                <p>Date: {selectedTransaction.date}</p>
                <p>Amount: ${selectedTransaction.amount.toLocaleString()}</p>
                <p>Status: {selectedTransaction.status}</p>
              </div>

              <div>
                <h3 className="font-semibold">Car Information</h3>
                <p>Model: {selectedTransaction.car}</p>
                {/* Add more car details here */}
              </div>

              <div>
                <h3 className="font-semibold">Buyer Information</h3>
                <p>Name: {selectedTransaction.buyer}</p>
                {/* Add more buyer details here */}
              </div>

              <div>
                <h3 className="font-semibold">Seller Information</h3>
                <p>Name: {selectedTransaction.seller}</p>
                {/* Add more seller details here */}
              </div>

              <div>
                <h3 className="font-semibold">Payment Method</h3>
                <p>Credit Card ending in 1234</p>
                {/* Add more payment details here */}
              </div>

              <div>
                <h3 className="font-semibold">Transaction History</h3>
                <ul className="list-disc list-inside">
                  <li>2023-06-15 10:00 AM: Transaction Initiated</li>
                  <li>2023-06-15 10:05 AM: Payment Processed</li>
                  <li>2023-06-15 10:10 AM: Transaction Completed</li>
                </ul>
              </div>

              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center">
                  <Check size={18} className="mr-2" />
                  Approve
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center">
                  <RefreshCcw size={18} className="mr-2" />
                  Refund
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center">
                  <XCircle size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}