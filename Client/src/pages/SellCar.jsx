'use client'

import { useState } from 'react'
import { ArrowRight, Camera, Car, Check, ChevronDown, Facebook, User, Info, Mail, MessageSquare, Phone, Share2, Star, Upload } from "lucide-react"

export default function SellCar() {
  const [step, setStep] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Sell Your Car Hassle-Free</h1>
          <p className="mt-2 text-gray-600">Reach thousands of potential buyers with our quick and easy listing process</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Selling Process Summary */}
        <div className="flex justify-between mb-8">
          {['List Your Car', 'Get Contacted', 'Sell with Confidence'].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                {index + 1}
              </div>
              <span className="ml-2">{step}</span>
              {index < 2 && <ArrowRight className="mx-4" />}
            </div>
          ))}
        </div>

        {/* Login or Account Creation Prompt */}
        {!isLoggedIn && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Sign In or Sign Up to List Your Car</h2>
            <div className="flex space-x-4">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <User className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Facebook className="w-5 h-5 mr-2" />
                Sign in with Facebook
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Mail className="w-5 h-5 mr-2" />
                Sign in with Email
              </button>
            </div>
          </div>
        )}

        {/* Car Details Form */}
        <form className="bg-white p-6 rounded-lg shadow">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700">Car Make</label>
                  <select id="make" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Select Make</option>
                    <option>Toyota</option>
                    <option>Ford</option>
                    <option>Honda</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700">Car Model</label>
                  <select id="model" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Select Model</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
                  <input type="number" id="year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter year" />
                </div>
                <div>
                  <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">Mileage</label>
                  <input type="number" id="mileage" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter mileage" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="number" id="price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter price" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" id="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="City or ZIP code" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Car Condition and Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                  <select id="transmission" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fuel-type" className="block text-sm font-medium text-gray-700">Fuel Type</label>
                  <select id="fuel-type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="exterior-color" className="block text-sm font-medium text-gray-700">Exterior Color</label>
                  <input type="text" id="exterior-color" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter color" />
                </div>
                <div>
                  <label htmlFor="interior-color" className="block text-sm font-medium text-gray-700">Interior Color</label>
                  <input type="text" id="interior-color" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter color" />
                </div>
                <div>
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700">Car Type</label>
                  <select id="car-type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Hatchback</option>
                    <option>Truck</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN (Optional)</label>
                  <input type="text" id="vin" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter VIN" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Vehicle Condition</label>
                <div className="mt-2 flex space-x-4">
                  {['Excellent', 'Good', 'Fair'].map((condition) => (
                    <label key={condition} className="inline-flex items-center">
                      <input type="radio" className="form-radio" name="condition" value={condition} />
                      <span className="ml-2">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Service and Maintenance</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Recent servicing</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">No accident history</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Modifications</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Additional Features and Highlights</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Extra Features</label>
                  <div className="mt-2 space-y-2">
                    {['GPS', 'Sunroof', 'Leather seats', 'Backup camera'].map((feature) => (
                      <label key={feature} className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="ml-2">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="certification" className="block text-sm font-medium text-gray-700">Certification/Inspection Report</label>
                  <input type="file" id="certification" className="mt-1 block w-full" />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Describe the car's condition, any unique features, or recent upgrades"></textarea>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 4: Photo and Video Upload</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo Upload</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload files</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="video-link" className="block text-sm font-medium text-gray-700">Video Link</label>
                  <input type="url" id="video-link" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter video URL" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700">Image Tips and Best Practices</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                  <li>Use natural light for better quality</li>
                  <li>Take photos from multiple angles (front, side, interior)</li>
                  
                  <li>Include close-ups of any special features</li>
                  <li>Avoid using filters</li>
                </ul>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 5: Contact Preferences and Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
                  <div className="mt-2 space-x-4">
                    {['Phone', 'Email', 'Platform Messaging'].map((method) => (
                      <label key={method} className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="ml-2">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability for Calls</label>
                  <input type="text" id="availability" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="e.g., Weekdays 9AM-5PM" />
                </div>
                <div>
                  <label htmlFor="response-time" className="block text-sm font-medium text-gray-700">Estimated Response Time</label>
                  <select id="response-time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Within 24 hours</option>
                    <option>1-2 days</option>
                    <option>3-5 days</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">Pricing Suggestions</h3>
                <div className="mt-2 p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">Based on your car's details, we suggest a price range of:</p>
                  <p className="text-lg font-semibold mt-1">$15,000 - $18,000</p>
                  <p className="text-xs text-gray-500 mt-1">This is an AI-driven suggestion based on current market trends.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
            )}
            {step < 5 ? (
              <button type="button" onClick={nextStep} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
                Next
              </button>
            ) : (
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
                List My Car
              </button>
            )}
          </div>
        </form>

        {/* Success Message and Next Steps (shown after form submission) */}
        <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your car listing is now live.</span>
          <div className="mt-2">
            <button className="mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Manage Listing
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Inquiries
            </button>
          </div>
        </div>

        {/* Seller Dashboard */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Seller Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium">Listing Management</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">Edit Listing</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Pause Listing</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Delete Listing</a></li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium">Inquiries and Messages</h3>
              <p className="mt-2 text-sm text-gray-600">You have 3 new messages</p>
              <button className="mt-2 text-blue-600 hover:underline">View All</button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium">Listing Analytics</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Views: 245</li>
                <li>Inquiries: 12</li>
                <li>Favorites: 8</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <MessageSquare className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="font-medium">Customer Support</h3>
            <p className="mt-1 text-sm text-gray-600">Need help? Chat with our support team.</p>
            <button className="mt-2 text-blue-600 hover:underline">Start Chat</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <Info className="h-6 w-6 text-green-500 mb-2" />
            <h3 className="font-medium">FAQs & Guides</h3>
            <p className="mt-1 text-sm text-gray-600">Find answers to common questions.</p>
            <button className="mt-2 text-blue-600 hover:underline">View FAQs</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-medium">Trust & Safety</h3>
            <p className="mt-1 text-sm text-gray-600">Learn about our seller protection policies.</p>
            <button className="mt-2 text-blue-600 hover:underline">Read More</button>
          </div>
        </div>
      </main>
    </div>
  )
}