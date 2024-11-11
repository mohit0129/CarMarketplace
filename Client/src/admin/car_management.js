import { useState } from 'react'
import { Search, Filter, Edit, Eye, Trash2, Plus, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react'

export default function CarMarketplace() {
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedListing, setSelectedListing] = useState(null)

  const listings = [
    { id: 1, image: '/placeholder.svg', title: 'Tesla Model 3', category: 'Sedan', price: 45000, status: 'Available' },
    { id: 2, image: '/placeholder.svg', title: 'Ford F-150', category: 'Truck', price: 55000, status: 'Sold' },
    { id: 3, image: '/placeholder.svg', title: 'Toyota RAV4', category: 'SUV', price: 35000, status: 'Rented' }
  ]

  const handleAddEdit = (listing = null) => {
    setSelectedListing(listing)
    setShowAddEditModal(true)
    setCurrentStep(1)
  }

  const handleCloseModal = () => {
    setShowAddEditModal(false)
    setSelectedListing(null)
  }

  const renderStep = () => {
    const stepContent = [
      { title: 'Basic Info', fields: [
        { placeholder: "Car Name" }, { placeholder: "Model" }, { placeholder: "Year", type: "number" },
        { placeholder: "Price", type: "number" }, { component: 'select', options: ['Select Category', 'SUV', 'Sedan', 'Truck'] }
      ]},
      { title: 'Photos', customContent: (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="mx-auto mb-4" size={48} />
          <p>Drag and drop photos here, or click to select files</p>
        </div>
      )},
      { title: 'Additional Details', fields: [
        { placeholder: "Mileage", type: "number" },
        { component: 'select', options: ['Select Fuel Type', 'Gasoline', 'Diesel', 'Electric', 'Hybrid'] },
        { component: 'select', options: ['Select Transmission', 'Automatic', 'Manual'] }
      ]},
      { title: 'Availability', customContent: (
        <>
          <div className="flex items-center space-x-4">
            <label><input type="checkbox" className="mr-2" />Available for Sale</label>
            <label><input type="checkbox" className="mr-2" />Available for Rent</label>
          </div>
          <input className="w-full p-2 border rounded" placeholder="Rental Price (per day)" type="number" />
          <textarea className="w-full p-2 border rounded" placeholder="Rental Terms"></textarea>
        </>
      )}
    ];

    const { title, fields, customContent } = stepContent[currentStep - 1];
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {fields ? fields.map((field, i) => (
          field.component === 'select' ? (
            <select key={i} className="w-full p-2 border rounded">
              {field.options.map(option => <option key={option}>{option}</option>)}
            </select>
          ) : (
            <input key={i} className="w-full p-2 border rounded" {...field} />
          )
        )) : customContent}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Car Marketplace</h1>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6">
        <select className="p-2 border rounded"><option>All Categories</option><option>SUV</option><option>Sedan</option><option>Truck</option></select>
        <div className="flex items-center space-x-2">
          <input type="number" placeholder="Min Price" className="p-2 border rounded w-24" />
          <span>-</span>
          <input type="number" placeholder="Max Price" className="p-2 border rounded w-24" />
        </div>
        <select className="p-2 border rounded"><option>All Statuses</option><option>Available</option><option>Sold</option><option>Rented</option></select>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search listings..." className="w-full pl-10 pr-4 py-2 border rounded" />
        </div>
        <button onClick={() => handleAddEdit()} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <Plus size={20} className="mr-2" />Add Listing
        </button>
      </div>

      {/* Listing Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>{['Image', 'Title', 'Category', 'Price', 'Status', 'Actions'].map(h => (
              <th key={h} className="py-2 px-4 border-b text-left">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b"><img src={listing.image} alt={listing.title} className="w-16 h-16 object-cover rounded" /></td>
                <td className="py-2 px-4 border-b">{listing.title}</td>
                <td className="py-2 px-4 border-b">{listing.category}</td>
                <td className="py-2 px-4 border-b">${listing.price.toLocaleString()}</td>
                <td className="py-2 px-4 border-b"><span className={`px-2 py-1 rounded-full text-xs ${
                  listing.status === 'Available' ? 'bg-green-100 text-green-800' :
                  listing.status === 'Sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>{listing.status}</span></td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button onClick={() => handleAddEdit(listing)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                  <button className="text-green-500 hover:text-green-700"><Eye size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
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
          <button className="p-2 border rounded"><ChevronLeft size={20} /></button>
          <button className="p-2 border rounded"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedListing ? 'Edit' : 'Add'} Listing</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="mb-4">{renderStep()}</div>
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))} disabled={currentStep === 1} className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50">Previous</button>
              <button onClick={() => { if (currentStep < 4) setCurrentStep(prev => prev + 1); else handleCloseModal() }} className="px-4 py-2 bg-blue-500 text-white rounded">
                {currentStep < 4 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
