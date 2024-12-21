import { useState, useEffect } from 'react'
import { ArrowRight, Camera, Loader2 } from 'lucide-react'
import axios from 'axios';
import UserAuth from '../auth/UserAuth';
import API_BASE_URL from '../config/apiConfig';

function SellCar() {
  const [step, setStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const storedUserId = localStorage.getItem('id');
  // useEffect(() => {
    

  //   if (storedUserId) {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       user_id: storedUserId  // Keep it as a string
  //     }));
  //   } else {
  //     setError('User ID not found. Please log in again.');
  //   }
  // }, []);

  const userId = localStorage.getItem('id');

  const [formData, setFormData] = useState({
    user_id: String(userId),
    listing_status: 'requested',
    owner: '',
    RentSell: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    condition: '',
    filename: '',
    url: '',
    engine: '',
    transmission: '',
    fuelType: '',
    seatingCapacity: '',
    interiorColor: '',
    exteriorColor: '',
    carType: '',
    vin: '',
    serviceHistory: {
      recentServicing: false,
      noAccidentHistory: false,
      modifications: false
    },
    extraFeatures: {
      gps: false,
      sunroof: false,
      leatherSeats: false,
      backupCamera: false
    },
    certificationReport: null,
    description: '',
    modificationDetails: '',
    contactMethods: [],
    availability: '',
    responseTime: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setSelectedImages(files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    const newUrls = [...imageUrls];

    URL.revokeObjectURL(newUrls[index]);
    newImages.splice(index, 1);
    newUrls.splice(index, 1);

    setSelectedImages(newImages);
    setImageUrls(newUrls);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    const safeValue = value === null ? '' : value;

    if (id.includes('.')) {
      const [parent, child] = id.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError('');

  //   try {
  //     const formDataToSend = new FormData();

  //     Object.keys(formData).forEach(key => {
  //       if (typeof formData[key] === 'object' && formData[key] !== null) {
  //         formDataToSend.append(key, JSON.stringify(formData[key]));
  //       } else {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //     });

  //     selectedImages.forEach((image, index) => {
  //       formDataToSend.append('images', image);
  //     });

  //     const response = await fetch('${API_BASE_URL}/api/listings/listings', {
  //       method: 'POST',
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create listing');
  //     }

  //     const data = await response.json();
  //     console.log('Listing created:', data);

  //     alert('Your car listing has been successfully created!');

  //   } catch (err) {
  //     setError(err.message || 'An error occurred while creating the listing');
  //     console.error('Submission error:', err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate user ID before submission
      // if (!formData.user_id) {
      //   throw new Error('User ID is missing. Please log in again.');
      // }

      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object' && formData[key] !== null) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      selectedImages.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(`${API_BASE_URL}/api/listings/listings`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create listing');
      }

      const data = await response.json();
      console.log('Listing created:', data);

      alert('Your car listing request has been successfully processed!');

    } catch (err) {
      setError(err.message || 'An error occurred while creating the listing');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = (currentStep) => {
    // switch (currentStep) {
    //   case 1:
    //     if (!formData.owner || !formData.RentSell || !formData.make ||
    //       !formData.model || !formData.year || !formData.mileage ||
    //       !formData.price || !formData.location) {
    //       setError('Please fill in all required fields');
    //       return false;
    //     }
    //     break;
    //   case 2:
    //     if (!formData.engine || !formData.transmission || !formData.fuelType ||
    //       !formData.seatingCapacity || !formData.exteriorColor ||
    //       !formData.interiorColor || !formData.carType ||
    //       !formData.condition) {
    //       setError('Please fill in all required fields');
    //       return false;
    //     }
    //     break;
    //   case 4:
    //     if (selectedImages.length === 0) {
    //       setError('Please upload at least one image');
    //       return false;
    //     }
    //     break;
    //   default:
    //     setError('');
    //     return true;
    // }
    setError('');
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sell Your Car Hassle-Free</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Reach thousands of potential buyers with our quick and easy listing process</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-8">
          <p className='dark:text-white font-medium text-xl'>List Your Car</p>
          <p className='dark:text-white font-medium text-xl'>Get Contacted</p>
          <p className='dark:text-white font-medium text-xl'>Sell with Confidence</p>
        </div>

        <div className="flex justify-between mb-8">
          {['Basic Information', 'Car Condition and Specifications', 'Additional Features', 'Images upload'].map((stepTitle, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 <= step ? 'bg-black text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                } transition-colors duration-200`}>
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">{stepTitle}</span>
              {index < 3 && <ArrowRight className="mx-4 text-gray-400 dark:text-gray-600" />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md transition-colors duration-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Step 1: Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Owner</label>
                  <input
                    type="number"
                    id="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter Owners"
                  />
                </div>
                <div>
                  <label htmlFor="RentSell" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rent or Sell</label>
                  <select
                    id="RentSell"
                    value={formData.RentSell}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="">Select</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Car Make</label>
                  <input
                    type="text"
                    id="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter manufacturer"
                  />
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Car Model</label>
                  <input
                    type="text"
                    id="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter model"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year of Manufacture</label>
                  <input
                    type="number"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter year"
                  />
                </div>
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mileage</label>
                  <input
                    type="number"
                    id="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter mileage"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="City or ZIP code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Car Condition and Specifications */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Step 2: Car Condition and Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="engine" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Engine</label>
                  <input
                    type="text"
                    id="engine"
                    value={formData.engine}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter Engine Type"
                  />
                </div>
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Transmission</label>
                  <select
                    id="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="">Select Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="cvt">CVT</option>
                    <option value="semi-automatic">Semi-Automatic</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fuel Type</label>
                  <select
                    id="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="cng">CNG</option>
                    <option value="lpg">LPG</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Seating Capacity</label>
                  <input
                    type="number"
                    id="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleInputChange}
                    min="2"
                    max="15"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter Seating Capacity"
                  />
                </div>
                <div>
                  <label htmlFor="exteriorColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Exterior Color</label>
                  <input
                    type="text"
                    id="exteriorColor"
                    value={formData.exteriorColor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter exterior color"
                  />
                </div>
                <div>
                  <label htmlFor="interiorColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interior Color</label>
                  <input
                    type="text"
                    id="interiorColor"
                    value={formData.interiorColor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter interior color"
                  />
                </div>
                <div>
                  <label htmlFor="carType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Car Type</label>
                  <select
                    id="carType"
                    value={formData.carType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="">Select Car Type</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="truck">Truck</option>
                    <option value="coupe">Coupe</option>
                    <option value="wagon">Wagon</option>
                    <option value="van">Van</option>
                    <option value="convertible">Convertible</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    VIN <span className="text-gray-500 dark:text-gray-400 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Enter VIN number"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vehicle Condition</label>
                <div className="mt-2">
                  <select
                    name="condition"
                    id="condition"
                    value={formData.condition || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="">Select Condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service History</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="serviceHistory.recentServicing"
                      checked={formData.serviceHistory.recentServicing}
                      onChange={handleInputChange}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Recent servicing</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="serviceHistory.noAccidentHistory"
                      checked={formData.serviceHistory.noAccidentHistory}
                      onChange={handleInputChange}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">No accident history</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      id="serviceHistory.modifications"
                      checked={formData.serviceHistory.modifications}
                      onChange={handleInputChange}
                      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Modifications</span>
                  </label>
                </div>
              </div>

              {formData.serviceHistory.modifications && (
                <div className="mt-4">
                  <label htmlFor="modificationDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Modification Details
                  </label>
                  <textarea
                    id="modificationDetails"
                    value={formData.modificationDetails || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                    placeholder="Please describe any modifications made to the vehicle"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Additional Features and Highlights */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Step 3: Additional Features and Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Extra Features</label>
                  <div className="mt-2 space-y-2">
                    {[
                      { key: 'gps', label: 'GPS' },
                      { key: 'sunroof', label: 'Sunroof' },
                      { key: 'leatherSeats', label: 'Leather seats' },
                      { key: 'backupCamera', label: 'Backup camera' }
                    ].map((feature) => (
                      <label key={feature.key} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id={`extraFeatures.${feature.key}`}
                          checked={formData.extraFeatures[feature.key]}
                          onChange={handleInputChange}
                          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="certification" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Certification/Inspection Report</label>
                  <input
                    type="file"
                    id="certification"
                    onChange={handleInputChange}
                    className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    dark:file:bg-gray-700 dark:file:text-gray-300
                    dark:hover:file:bg-gray-600"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  placeholder="Describe the car's condition, any unique features, or recent upgrades"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Photo Upload */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Step 4: Photo Upload</h2>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageSelect}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        multiple
                        maxLength={5}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB (Max 5 images)</p>
                </div>
              </div>

              {imageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Image Tips and Best Practices
                </h3>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  <li>Use natural light for better quality</li>
                  <li>Take photos from multiple angles (front, side, interior)</li>
                  <li>Include close-ups of any special features</li>
                  <li>Avoid using filters</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(step)) {
                    nextStep();
                  }
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={isSubmitting}
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin inline-block mr-2" />
                    Submitting...
                  </>
                ) : (
                  'List My Car'
                )}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default UserAuth(SellCar);