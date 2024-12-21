import React, { useEffect, useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import Sidebar from './Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AreaChart, Area } from 'recharts';
import AdminAuth from './AdminAuth'; // Import the new AdminAuth component
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import API_BASE_URL from '../config/apiConfig';

function AdminDashboard() {
  // const [Name,setName] = React.useState("");
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Helper function to handle Decimal128 values
  const convertDecimal128 = (value) => {
    if (value && value.hasOwnProperty('$numberDecimal')) {
      return parseFloat(value.$numberDecimal); // Convert Decimal128 to number
    }
    return value;
  };

  useEffect(() => {
    // Fetch New Listings (Car Listings)
    fetch(`${API_BASE_URL}/api/listings/listings`)
      .then((response) => response.json())
      .then((data) => {
        // Convert any Decimal128 values to regular numbers or strings
        const formattedListings = data.slice(0, 5).map(listing => ({
          ...listing,
          price: convertDecimal128(listing.price),
        }));
        setListings(formattedListings);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });

    // Fetch Recent Transactions
    fetch(`${API_BASE_URL}/payments`)
      .then((response) => response.json())
      .then((data) => {
        // Convert any Decimal128 values to regular numbers or strings
        const formattedTransactions = data.slice(0, 5).map(transaction => ({
          ...transaction,
          amount: convertDecimal128(transaction.amount),
        }));
        setTransactions(formattedTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Manual data for the charts
  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 6000 },
    { name: 'May', revenue: 7000 },
  ];

  const activityData = [
    { name: 'Week 1', activity: 30 },
    { name: 'Week 2', activity: 40 },
    { name: 'Week 3', activity: 35 },
    { name: 'Week 4', activity: 50 },
    { name: 'Week 5', activity: 45 },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Main Content */}
      {/* <AdminAuth setName={setName} /> Include AdminAuth to handle the authentication */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Graph */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Revenue Graph</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Chart */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Activity Chart</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="activity" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* New Listings Table */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">New Listings Table</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <tr key={listing.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.make} {listing.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.carType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.listing_status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transaction_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.payment_method}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date_of_payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          <button onClick={() => { navigate('/ReportDesign'); }}
            style={{
              padding: '14px 20px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Generate Report
          </button>
        </main>
      </div>
    </div>
  );
}

export default AdminAuth(AdminDashboard);