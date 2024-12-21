import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Edit, Eye, Trash2, Plus, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';
import Sidebar from './Sidebar';
import AdminCarListingForm from './AdminCarListingForm';
import { Link } from 'react-router-dom';
import AdminAuth from './AdminAuth';
import API_BASE_URL from '../config/apiConfig';

function CarManagement() {
  const [listings, setListings] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModel, setShowViewModel] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAdminCarListingForm, setShowAdminCarListingForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    carType: 'Select Category',
    mileage: '',
    fuelType: 'Select Fuel Type',
    transmission: 'Select Transmission',
    listing_status: 'NA'
  });

  const parseAmount = (amount) => {
    if (amount === null || amount === undefined) return 0;
    if (typeof amount === 'number') return amount;
    if (typeof amount === 'object' && amount.$numberDecimal) {
      return parseFloat(amount.$numberDecimal);
    }
    const parsed = parseFloat(amount);
    if (!isNaN(parsed)) return parsed;
    console.error('Unexpected amount format:', amount);
    return 0;
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings/listings`);
      const processedListings = response.data.map(listing => ({
        ...listing,
        price: parseAmount(listing.price)
      }));
      setListings(processedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      alert('Failed to fetch listings');
    }
  };

  const handleViewListing = async (listing) => {
    if (!listing || !listing.listing_id) {
      console.error('Invalid listing:', listing);
      alert('Cannot view listing: Invalid listing data');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings/listings/${listing.listing_id}`);
      setSelectedListing(response.data);
      setShowViewModel(true);
    } catch (error) {
      console.error('Error fetching listing details:', error);
      alert(`Failed to fetch listing details: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleEditListing = async (listing) => {
    if (!listing || !listing.listing_id) {
      console.error('Invalid listing data:', listing);
      alert('Cannot edit listing: Invalid listing data');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/listings/listings/${listing.listing_id}`);
      if (!response.data) {
        throw new Error('No data returned from the server');
      }
      setSelectedListing(response.data);
      setFormData({
        make: response.data.make || '',
        model: response.data.model || '',
        year: response.data.year?.toString() || '',
        price: response.data.price?.toString() || '',
        carType: response.data.carType || 'Select Category',
        mileage: response.data.mileage?.toString() || '',
        fuelType: response.data.fuelType || 'Select Fuel Type',
        transmission: response.data.transmission || 'Select Transmission',
        listing_status: response.data.listing_status || 'NA',
      });
      setShowAddEditModal(true);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error fetching listing for edit:', error);
      alert(`Failed to fetch listing for editing: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleSaveListing = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending form data:', formData);
      const response = await axios.put(`${API_BASE_URL}/api/listings/listings/${selectedListing.listing_id}`, formData);
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
    if (!listing || !listing._id) {
      console.error('Invalid listing:', listing);
      alert('Cannot delete listing: Invalid listing data');
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/api/listings/listings/${listing._id}`);
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
    setCurrentStep(1);
    setFormData({
      make: '',
      model: '',
      year: '',
      price: '',
      carType: 'Select Category',
      mileage: '',
      fuelType: 'Select Fuel Type',
      transmission: 'Select Transmission',
      listing_status: 'NA'
    });
  };

  const handleOpenForm = () => {
    setShowAdminCarListingForm(true);
  };

  const handleCloseForm = () => {
    setShowAdminCarListingForm(false);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getImageUrl = (image) => {
    if (!image) return '/default-car-image.jpg';
    if (Array.isArray(image) && image.length > 0) {
      return image[0].startsWith('http') ? image[0] : `${API_BASE_URL}${image[0]}`;
    }
    return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
  };

  const filteredListings = listings.filter(listing => {
    const categoryMatch = selectedCategory === "All Categories" || listing.carType === selectedCategory;
    const priceMatch = (minPrice === "" || listing.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || listing.price <= parseFloat(maxPrice));
    const statusMatch = selectedStatus === "All Statuses" || listing.listing_status === selectedStatus;
    const searchMatch = searchTerm === "" ||
      listing.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.model?.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && priceMatch && statusMatch && searchMatch;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Car Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter size={20} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={handleOpenForm}
            >
              <Plus size={20} className="mr-2" />Add Listing
            </button>
          </div>

        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option>All Categories</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Truck</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option>All Statuses</option>
                  <option>active</option>
                  <option>sold</option>
                  <option>rented</option>
                  <option>requested</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {['Images', 'Title', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                  <th key={h} className="py-2 px-4 border-b text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredListings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No listings available</td>
                </tr>
              ) : (
                filteredListings.map(listing => (
                  <tr key={listing._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img
                          alt={`${listing.make} ${listing.model}`}
                          className="w-full h-48 object-cover"
                          src={ `${API_BASE_URL}${listing.image}`}
                          style={{ objectFit: "cover", minWidth: "100%" }}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{listing.make || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{listing.carType || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">
                      ₹{listing.price ? listing.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${listing.listing_status === 'active' ? 'bg-green-100 text-green-800' :
                        listing.listing_status === 'Sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                        {listing.listing_status || 'N/A'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b flex space-x-2">
                      <button
                        onClick={() => handleEditListing(listing)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleViewListing(listing)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showAddEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Edit Car Listing</h2>
                <button onClick={handleCloseModal}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveListing}>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Make</label>
                      <input
                        type="text"
                        name="make"
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Model</label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Year</label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Car Type</label>
                      <select
                        name="carType"
                        value={formData.carType}
                        onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                      >
                        <option value="Select Category">Select Category</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        className="p-2 border rounded w-full"
                      >
                        <option value="Select Fuel Type">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Transmission</label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                        className="p-2 border rounded w-full"
                      >
                        <option value="Select Transmission">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Mileage</label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        name="listing_status"
                        value={formData.listing_status}
                        onChange={(e) => setFormData({ ...formData, listing_status: e.target.value })}
                        className="p-2 border rounded w-full"
                      >
                        <option value="NA">Not Available</option>
                        <option value="active">Active</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <input
                      type="file"
                      multiple
                      name="images"
                      className="p-2 border rounded w-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {showViewModel && selectedListing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Listing Details</h2>
                <button onClick={() => setShowViewModel(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Make:</h3>
                    <p>{selectedListing.make}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Model:</h3>
                    <p>{selectedListing.model}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Year:</h3>
                    <p>{selectedListing.year}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Price:</h3>
                    <p>₹{selectedListing.price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Car Type:</h3>
                    <p>{selectedListing.carType}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Fuel Type:</h3>
                    <p>{selectedListing.fuelType}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Transmission:</h3>
                    <p>{selectedListing.transmission}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Status:</h3>
                    <p>{selectedListing.listing_status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAdminCarListingForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Add New Car Listing</h2>
                <button onClick={handleCloseForm}>
                  <X size={20} />
                </button>
              </div>
              <AdminCarListingForm onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAuth(CarManagement);