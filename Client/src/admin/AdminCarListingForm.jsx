import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const AdminCarListingForm = () => {
  const [formData, setFormData] = useState({
    listing_status: 'active',
    user_id: '',
    owner: '',
    RentSell: 'Rent',
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    condition: 'Excellent',
    certified: false,
    engine: '',
    transmission: '',
    fuelType: '',
    seatingCapacity: '',
    interiorColor: '',
    exteriorColor: '',
    carType: '',
    vin: '',
    description: '',
    images: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle form data input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection for images
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files);
  };

  // Handle form submission to add a new listing
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('user_id value:', formData.user_id);  // Check what value is being submitted
  
    // Validate user_id is a number
    if (isNaN(formData.user_id) || formData.user_id.trim() === '') {
      alert('Please enter a valid user ID (numeric value).');
      return;  // Prevent form submission if user_id is invalid
    }
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'images') data.append(key, formData[key]);
    });
  
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        data.append('images', selectedFile[i]);
      }
    }
  
    try {
      await axios.post(`{$API_BASE_URL}/api/listings/listings`, data);  // Post to add a new listing
      alert('Listing added successfully!');
      // Optionally, clear the form after successful submission
      setFormData({
        listing_status: 'active',
        user_id: '',
        owner: '',
        RentSell: 'Rent',
        make: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
        location: '',
        condition: 'Excellent',
        certified: false,
        engine: '',
        transmission: '',
        fuelType: '',
        seatingCapacity: '',
        interiorColor: '',
        exteriorColor: '',
        carType: '',
        vin: '',
        description: '',
        images: [],
      });
      setSelectedFile(null);  // Clear selected file
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('Error adding listing');
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Car Listings</h1>

      {/* Scrollable container with dynamic height */}
      <div className="overflow-y-auto h-[calc(100vh-100px)]">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Listing Status */}
          <div className="mb-4">
            <label className="block text-gray-700">Listing Status</label>
            <select
              name="listing_status"
              value={formData.listing_status}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
              <option value="requested">Requested</option>
            </select>
          </div>

          {/* User ID */}
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter numeric User ID"
            />
          </div>

          {/* Owner */}
          <div className="mb-4">
            <label className="block text-gray-700">Owner</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter car owner name"
            />
          </div>

          {/* Rent or Sell */}
          <div className="mb-4">
            <label className="block text-gray-700">Rent or Sell</label>
            <select
              name="RentSell"
              value={formData.RentSell}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </select>
          </div>

          {/* Make */}
          <div className="mb-4">
            <label className="block text-gray-700">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter car make"
            />
          </div>

          {/* Model */}
          <div className="mb-4">
            <label className="block text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter car model"
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label className="block text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter car year"
            />
          </div>

          {/* Mileage */}
          <div className="mb-4">
            <label className="block text-gray-700">Mileage</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter mileage"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter price"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter car location"
            />
          </div>

          {/* Condition */}
          <div className="mb-4">
            <label className="block text-gray-700">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCarListingForm;
