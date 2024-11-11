'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Car, ChevronRight, Clock, DollarSign, Facebook, Heart, Info, MapPin, MessageSquare, Phone, Share2, Star, Twitter, CheckCircle } from "lucide-react"

export default function BuyCarDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(3.5)

  const carImages = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carImages.length) % carImages.length)
  }

  const carPrice = 25999
  const taxRate = 0.08
  const registrationFee = 300

  const calculateMonthlyPayment = () => {
    const principal = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return monthlyPayment.toFixed(2)
  }

  const totalCost = carPrice + (carPrice * taxRate) + registrationFee

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <nav className="text-sm breadcrumbs">
            <ul className="flex items-center space-x-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Home</a></li>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Buy Car</a></li>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <li><a href="#" className="text-gray-500 hover:text-gray-700">Toyota</a></li>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <li className="text-gray-900 font-medium">Camry</li>
            </ul>
          </nav>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">2021 Toyota Camry LE</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={carImages[currentImageIndex]}
                alt={`Car Image ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-4 flex space-x-2 overflow-x-auto">
              {carImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 ${
                    index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                </button>
              ))}
            </div>

            {/* Vehicle Specifications */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Make</h3>
                  <p>Toyota</p>
                </div>
                <div>
                  <h3 className="font-medium">Model</h3>
                  <p>Camry</p>
                </div>
                <div>
                  <h3 className="font-medium">Year</h3>
                  <p>2021</p>
                </div>
                <div>
                  <h3 className="font-medium">Mileage</h3>
                  <p>15,000 miles</p>
                </div>
                <div>
                  <h3 className="font-medium">Engine</h3>
                  <p>2.5L 4-cylinder</p>
                </div>
                <div>
                  <h3 className="font-medium">Transmission</h3>
                  <p>Automatic</p>
                </div>
                <div>
                  <h3 className="font-medium">Fuel Type</h3>
                  <p>Gasoline</p>
                </div>
                <div>
                  <h3 className="font-medium">Seating Capacity</h3>
                  <p>5 passengers</p>
                </div>
                <div>
                  <h3 className="font-medium">Exterior Color</h3>
                  <p>Midnight Black Metallic</p>
                </div>
                <div>
                  <h3 className="font-medium">Interior Color</h3>
                  <p>Black</p>
                </div>
                <div>
                  <h3 className="font-medium">Trim</h3>
                  <p>LE</p>
                </div>
                <div>
                  <h3 className="font-medium">VIN</h3>
                  <p>1HGBH41JXMN109186</p>
                </div>
              </div>
            </div>

            {/* Condition Summary */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Condition Summary</h2>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-medium">Certified Pre-Owned</span>
              </div>
              <p className="text-gray-700 mb-4">
                This vehicle has undergone a rigorous 160-point inspection and reconditioning process. It is in excellent condition and comes with an extended warranty.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Regular maintenance up to date</li>
                <li>No accident history reported</li>
                <li>New tires installed 3 months ago</li>
                <li>Minor wear on driver's seat (see images)</li>
                <li>Small paint touch-up on rear bumper</li>
              </ul>
            </div>

            {/* Vehicle History */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Vehicle History</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Ownership History</h3>
                  <p>1 previous owner (lease vehicle)</p>
                </div>
                <div>
                  <h3 className="font-medium">Accident History</h3>
                  <p>No accidents or damage reported</p>
                </div>
                <div>
                  <h3 className="font-medium">Service Records</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Regular oil changes and tire rotations</li>
                    <li>30,000-mile service completed</li>
                    <li>Brake pads replaced at 25,000 miles</li>
                  </ul>
                </div>
              </div>
              <button className="mt-4 text-blue-600 hover:underline">View Full Vehicle History Report</button>
            </div>

            {/* Warranty Information */}
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Warranty Information</h2>
              <p className="text-gray-700 mb-4">
                This Certified Pre-Owned vehicle comes with the following warranty coverage:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>2-year/40,000-mile Comprehensive Warranty</li>
                <li>7-year/100,000-mile Powertrain Warranty</li>
                <li>24/7 Roadside Assistance</li>
              </ul>
              <p className="text-gray-700">
                Extended warranty options are available for purchase. Ask our sales representative for more details.
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Pricing and Call to Action */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">${carPrice.toLocaleString()}</h2>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
                >
                  <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Starting at ${calculateMonthlyPayment()}/month with {downPayment.toLocaleString()} down for {loanTerm} months</p>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Buy Now
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                  Contact Us
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span>Share this car:</span>
                <div className="flex space-x-2">
                  <button  className="hover:text-blue-600">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="hover:text-blue-400">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="hover:text-green-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${carPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8%):</span>
                  <span>${(carPrice * taxRate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Fee:</span>
                  <span>${registrationFee}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Financing Calculator */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Financing Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700">Down Payment</label>
                  <input
                    type="number"
                    id="down-payment"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="loan-term" className="block text-sm font-medium text-gray-700">Loan Term (months)</label>
                  <input
                    type="number"
                    id="loan-term"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                  <input
                    type="number"
                    id="interest-rate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Estimated Monthly Payment</h4>
                <p className="text-2xl font-bold">${calculateMonthlyPayment()}</p>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                Apply for Financing
              </button>
            </div>

            {/* Contact Seller Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
                  </div>
                </div>
                <button type="submit" className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>

            {/* Schedule Test Drive */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Schedule a Test Drive</h3>
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="test-drive-date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input type="date" id="test-drive-date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  </div>
                  <div>
                    <label htmlFor="test-drive-time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <select id="test-drive-time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                      <option>Morning (9AM - 12PM)</option>
                      <option>Afternoon (12PM - 4PM)</option>
                      <option>Evening (4PM - 7PM)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Schedule Test Drive
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Similar Cars for Sale */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Cars You Might Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((car) => (
              <div key={car} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="/placeholder.svg" alt={`Similar Car ${car}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">2020 Honda Accord LX</h3>
                  <p className="text-gray-600 mb-2">$23,999</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">25,000 miles</span>
                    <button className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}