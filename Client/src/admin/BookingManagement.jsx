import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Edit, Eye, Trash2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from './Sidebar';
import AdminCarListingForm from './AdminCarListingForm';
import AdminAuth from './AdminAuth';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import API_BASE_URL from '../config/apiConfig';

function BookingManagement() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModel, setShowViewModel] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showAdminCarListingForm, setShowAdminCarListingForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    paymentStatus: 'all',
    paymentRange: { min: '', max: '' },
    dueAmount: 'all',
    searchQuery: '',
    bookingStatus: 'all'
  });

  const [formData, setFormData] = useState({
    listing_id: '',
    user_id: '',
    car_id: '',
    booking_start_date: '',
    booking_end_date: '',
    total_price: '',
    paid_price: '',
    transaction_id: '',
    booking_status: 'pending',
    payment_status: 'pending'
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
    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      applyFilters();
    }
  }, [filters, listings]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/booking`);
      if (response.status === 200) {
        const processedListings = response.data.map(listing => ({
          ...listing,
          total_price: parseAmount(listing.total_price),
          paid_price: parseAmount(listing.paid_price)
        }));
        setListings(processedListings);
        setFilteredListings(processedListings);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      alert(`Failed to fetch listings: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const applyFilters = () => {
    let results = [...listings];

    if (filters.paymentStatus !== 'all') {
      results = results.filter(booking =>
        booking.payment_status === filters.paymentStatus
      );
    }

    if (filters.paymentRange.min !== '') {
      results = results.filter(booking =>
        booking.paid_price >= parseFloat(filters.paymentRange.min)
      );
    }
    if (filters.paymentRange.max !== '') {
      results = results.filter(booking =>
        booking.paid_price <= parseFloat(filters.paymentRange.max)
      );
    }

    if (filters.dueAmount !== 'all') {
      results = results.filter(booking => {
        const dueAmount = booking.total_price - booking.paid_price;
        switch (filters.dueAmount) {
          case 'none':
            return dueAmount === 0;
          case 'partial':
            return dueAmount > 0 && dueAmount < booking.total_price;
          case 'full':
            return dueAmount === booking.total_price;
          default:
            return true;
        }
      });
    }

    if (filters.bookingStatus !== 'all') {
      results = results.filter(booking =>
        booking.booking_status === filters.bookingStatus
      );
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.trim().toLowerCase();
      results = results.filter(booking =>
        String(booking.booking_id || '').toLowerCase().includes(query) ||
        String(booking.user_id || '').toLowerCase().includes(query) ||
        String(booking.transaction_id || '').toLowerCase().includes(query) ||
        String(booking.car_id || '').toLowerCase().includes(query)
      );
    }

    setFilteredListings(results);
  };

  const handleViewListing = async (listing) => {
    if (!listing || !listing.booking_id) {
      console.error('Invalid listing:', listing);
      alert('Cannot view listing: Invalid listing data');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/booking/${listing.booking_id}`);
      setSelectedListing(response.data);
      setShowViewModel(true);
    } catch (error) {
      console.error('Error fetching listing details:', error);
      alert(`Failed to fetch listing details: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleEditListing = async (listing) => {
    if (!listing || !listing.booking_id) {
      console.error('Invalid listing data:', listing);
      alert('Cannot edit listing: Invalid listing data');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/booking/${listing.booking_id}`);
      if (!response.data) {
        throw new Error('No data returned from the server');
      }

      setSelectedListing(response.data);
      setFormData({
        listing_id: response.data.listing_id || '',
        user_id: response.data.user_id || '',
        car_id: response.data.car_id || '',
        booking_start_date: response.data.booking_start_date || '',
        booking_end_date: response.data.booking_end_date || '',
        total_price: response.data.total_price?.toString() || '',
        paid_price: response.data.paid_price?.toString() || '',
        transaction_id: response.data.transaction_id || '',
        booking_status: response.data.booking_status || 'pending',
        payment_status: response.data.payment_status || 'pending',
      });

      setShowAddEditModal(true);
    } catch (error) {
      console.error('Error fetching listing for edit:', error);
      alert(`Failed to fetch listing for editing: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleSaveListing = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/booking/${selectedListing.booking_id}`,
        formData
      );
      if (response.status === 200) {
        alert('Listing updated successfully!');
        setShowAddEditModal(false);
        fetchListings();
      }
    } catch (error) {
      console.error('Error saving listing:', error);
      alert(`Failed to save listing: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleDeleteListing = async (listing) => {
    if (!listing || !listing.booking_id) {
      console.error('Invalid listing:', listing);
      alert('Cannot delete listing: Invalid listing data');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');

    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/api/booking/${listing.booking_id}`);
        fetchListings();
        alert('Listing deleted successfully');
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert(`Failed to delete listing: ${error.response?.data?.message || 'Unknown error'}`);
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddEditModal(false);
    setShowViewModel(false);
    setSelectedListing(null);
    setFormData({
      listing_id: '',
      user_id: '',
      car_id: '',
      booking_start_date: '',
      booking_end_date: '',
      total_price: '',
      paid_price: '',
      transaction_id: '',
      booking_status: 'pending',
      payment_status: 'pending'
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold">Booking Management</h1>

          {/* Toggle Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>


        {/* Filters Section */}
        {showFilters && (
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow">
              {/* Payment Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payment Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.paymentStatus}
                  onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              {/* Payment Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payment Range (₹)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 p-2 border rounded-md"
                    value={filters.paymentRange.min}
                    onChange={(e) => setFilters({
                      ...filters,
                      paymentRange: { ...filters.paymentRange, min: e.target.value }
                    })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 p-2 border rounded-md"
                    value={filters.paymentRange.max}
                    onChange={(e) => setFilters({
                      ...filters,
                      paymentRange: { ...filters.paymentRange, max: e.target.value }
                    })}
                  />
                </div>
              </div>

              {/* Due Amount Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Due Amount</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.dueAmount}
                  onChange={(e) => setFilters({ ...filters, dueAmount: e.target.value })}
                >
                  <option value="all">All</option>
                  <option value="none">No Due</option>
                  <option value="partial">Partially Due</option>
                  <option value="full">Fully Due</option>
                </select>
              </div>

              {/* Booking Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Booking Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={filters.bookingStatus}
                  onChange={(e) => setFilters({ ...filters, bookingStatus: e.target.value })}
                >
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Search Box */}
              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by Booking ID, User ID, Car ID, or Transaction ID..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                    value={filters.searchQuery}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFilters(prev => ({ ...prev, searchQuery: newValue }));
                    }}
                  />
                  {filters.searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="flex justify-between items-center">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex items-center space-x-2"
                onClick={() => setFilters({
                  paymentStatus: 'all',
                  paymentRange: { min: '', max: '' },
                  dueAmount: 'all',
                  searchQuery: '',
                  bookingStatus: 'all'
                })}
              >
                <Filter size={16} />
                <span>Reset Filters</span>
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={() => setShowAdminCarListingForm(true)}
              >
                <Plus size={20} className="mr-2" />Add Listing
              </button>
            </div>
          </div>
        )}

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left">Booking ID</th>
                <th className="py-2 px-4 border-b text-left">Listing ID</th>
                <th className="py-2 px-4 border-b text-left">User ID</th>
                <th className="py-2 px-4 border-b text-left">Car ID</th>
                <th className="py-2 px-4 border-b text-left">Total Price</th>
                <th className="py-2 px-4 border-b text-left">Paid Price</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">No bookings found matching the filters</td>
                </tr>
              ) : (
                filteredListings.map(listing => (
                  <tr key={listing.booking_id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{listing.booking_id || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{listing.listing_id || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{listing.user_id || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{listing.car_id || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">
                      ₹{listing.total_price?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ₹{listing.paid_price?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-sm ${listing.booking_status === 'completed' ? 'bg-green-100 text-green-800' :
                          listing.booking_status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            listing.booking_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                        }`}>
                        {listing.booking_status?.charAt(0).toUpperCase() + listing.booking_status?.slice(1) || 'N/A'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditListing(listing)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleViewListing(listing)}
                          className="text-green-500 hover:text-green-700"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteListing(listing)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {showAddEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Edit Booking</h2>
                <button onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveListing} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <input
                      type="text"
                      value={formData.user_id}
                      onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car ID</label>
                    <input
                      type="text"
                      value={formData.car_id}
                      onChange={(e) => setFormData({ ...formData, car_id: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={formData.booking_start_date}
                      onChange={(e) => setFormData({ ...formData, booking_start_date: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={formData.booking_end_date}
                      onChange={(e) => setFormData({ ...formData, booking_end_date: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                    <input
                      type="number"
                      value={formData.total_price}
                      onChange={(e) => setFormData({ ...formData, total_price: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Paid Price</label>
                    <input
                      type="number"
                      value={formData.paid_price}
                      onChange={(e) => setFormData({ ...formData, paid_price: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <input
                      type="text"
                      value={formData.transaction_id}
                      onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Booking Status</label>
                    <select
                      value={formData.booking_status}
                      onChange={(e) => setFormData({ ...formData, booking_status: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      value={formData.payment_status}
                      onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModel && selectedListing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Booking Details</h2>
                <button onClick={() => setShowViewModel(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Booking Information</h3>
                  <p>Booking ID: {selectedListing.booking_id}</p>
                  <p>Listing ID: {selectedListing.listing_id}</p>
                  <p>User ID: {selectedListing.user_id}</p>
                  <p>Car ID: {selectedListing.car_id}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Payment Details</h3>
                  <p>Total Price: ₹{selectedListing.total_price?.toLocaleString()}</p>
                  <p>Paid Amount: ₹{selectedListing.paid_price?.toLocaleString()}</p>
                  <p>Transaction ID: {selectedListing.transaction_id}</p>
                  <p>Payment Status: {selectedListing.payment_status}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Booking Status</h3>
                  <p>Current Status: {selectedListing.booking_status}</p>
                  <p>Start Date: {new Date(selectedListing.booking_start_date).toLocaleDateString()}</p>
                  <p>End Date: {new Date(selectedListing.booking_end_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowViewModel(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add New Listing Modal */}
        {showAdminCarListingForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Add New Car Listing</h2>
                <button onClick={() => setShowAdminCarListingForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <AdminCarListingForm onClose={() => setShowAdminCarListingForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAuth(BookingManagement);