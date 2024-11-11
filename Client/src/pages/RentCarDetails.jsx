'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Calendar, Car, ChevronRight, Clock, DollarSign, Facebook, Heart, Info, MapPin, MessageSquare, Phone, Share2, Star, Twitter } from "lucide-react"

export default function RentCarDetails() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [rentalPeriod, setRentalPeriod] = useState('daily')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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

    const rentalRates = {
        daily: 59,
        weekly: 350,
        monthly: 1200
    }

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0
        const start = new Date(startDate)
        const end = new Date(endDate)
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        if (rentalPeriod === 'daily') return days * rentalRates.daily
        if (rentalPeriod === 'weekly') return Math.ceil(days / 7) * rentalRates.weekly
        if (rentalPeriod === 'monthly') return Math.ceil(days / 30) * rentalRates.monthly
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <nav className="text-sm breadcrumbs">
                        <ul className="flex items-center space-x-2">
                            <li><a href="#" className="text-gray-500 hover:text-gray-700">Home</a></li>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                            <li><a href="#" className="text-gray-500 hover:text-gray-700">Rent Car</a></li>
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
                                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
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
                                    className={`flex-shrink-0 ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
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
                            </div>
                            <div className="mt-4">
                                <h3 className="font-medium">Additional Features</h3>
                                <ul className="list-disc list-inside mt-2">
                                    <li>GPS Navigation System</li>
                                    <li>Bluetooth Connectivity</li>
                                    <li>Backup Camera</li>
                                    <li>Apple CarPlay & Android Auto</li>
                                    <li>Adaptive Cruise Control</li>
                                </ul>
                            </div>
                        </div>

                        {/* Vehicle Condition and Details */}
                        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Vehicle Condition</h2>
                            <p className="text-gray-700 mb-4">
                                This 2021 Toyota Camry LE is in excellent condition and regularly maintained. It has undergone a thorough inspection and detailing process to ensure a high-quality rental experience.
                            </p>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Last serviced: 1 month ago</li>
                                <li>Tires replaced: 6 months ago</li>
                                <li>Interior deep cleaned: Before each rental</li>
                                <li>No accident history</li>
                                <li>Non-smoking vehicle</li>
                            </ul>
                        </div>

                        {/* Rental Terms and Conditions */}
                        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Rental Terms and Conditions</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">Mileage Policy</h3>
                                    <p>150 miles per day included. $0.25 per additional mile.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Fuel Policy</h3>
                                    <p>Return the car with the same amount of fuel as at pickup.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Cleanliness</h3>
                                    <p>Please return the car in the same condition as received. A cleaning fee may apply if excessive cleaning is required.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Late Returns</h3>
                                    <p>A grace period of 29 minutes is allowed for returns. Late returns may incur additional hourly or daily charges.</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Cancellation Policy</h3>
                                    <p>Free cancellation up to 24 hours before pickup. Cancellations within 24 hours of pickup may be subject to a fee.</p>
                                </div>
                            </div>
                            <button className="mt-4 text-blue-600 hover:underline">View Full Terms and Conditions</button>
                        </div>

                        {/* Customer Reviews */}
                        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">4.8 out of 5 (based on 47 reviews)</span>
                            </div>
                            <div className="space-y-4">
                                <div className="border-b pb-4">
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">John D. - Rented for 3 days</span>
                                    </div>
                                    <p className="text-gray-700">Great car! Very clean and well-maintained. The pickup and drop-off process was smooth. Would definitely rent again.</p>
                                </div>
                                <div className="border-b pb-4">
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4].map((star) => (
                                                <Star key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                            ))}
                                            <Star className="w-4 h-4 text-gray-300" />
                                        </div>
                                        <span className="ml-2 text-sm text-gray-600">Sarah M. - Rented for 1 week</span>
                                    </div>
                                    <p className="text-gray-700">The car was comfortable for our family trip. Fuel efficiency was great. Only minor issue was a slight delay at pickup.</p>
                                </div>
                            </div>
                            <button className="mt-4 text-blue-600 hover:underline">Read all reviews</button>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        {/* Key Rental Information */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-3xl font-bold">${rentalRates[rentalPeriod]}</h2>
                                <span className="text-gray-600">per {rentalPeriod.slice(0, -2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-green-600 font-semibold">Available</span>
                                <button className="text-red-500 hover:text-red-600">
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                                    Book Now
                                </button>
                                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                                    Check Availability
                                </button>
                            </div>
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                <span>Share this car:</span>
                                <div className="flex space-x-2">
                                    <button className="hover:text-blue-600">
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

                        {/* Rental Pricing Breakdown */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Rental Pricing</h3>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Daily Rate:</span>
                                    <span>${rentalRates.daily}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Weekly Rate:</span>
                                    <span>${rentalRates.weekly}</span>

                                </div>
                                <div className="flex justify-between">
                                    <span>Monthly Rate:</span>
                                    <span>${rentalRates.monthly}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Rental Period</label>
                                <select
                                    value={rentalPeriod}
                                    onChange={(e) => setRentalPeriod(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p>Mileage: 150 miles/day included</p>
                                <p>Additional miles: $0.25/mile</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="font-medium mb-2">Add-ons</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Insurance ($15/day)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">GPS ($5/day)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2">Child Seat ($7/day)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Book Your Rental</h3>
                            <form>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                                        <input
                                            type="date"
                                            id="pickup-date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Return Date</label>
                                        <input
                                            type="date"
                                            id="return-date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700">Pick-up Location</label>
                                        <select
                                            id="pickup-location"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        >
                                            <option>Downtown Office</option>
                                            <option>Airport Location</option>
                                            <option>Suburban Branch</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="return-location" className="block text-sm font-medium text-gray-700">Return Location</label>
                                        <select
                                            id="return-location"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        >
                                            <option>Same as pick-up</option>
                                            <option>Downtown Office</option>
                                            <option>Airport Location</option>
                                            <option>Suburban Branch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h4 className="font-medium mb-2">Estimated Total</h4>
                                    <p className="text-2xl font-bold">${calculateTotalPrice()}</p>
                                    <p className="text-sm text-gray-600">Final price may vary based on add-ons and actual rental duration</p>
                                </div>
                                <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                                    Reserve Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Similar Cars for Rent */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Similar Cars for Rent</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((car) => (
                            <div key={car} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src="/placeholder.svg" alt={`Similar Car ${car}`} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">2022 Honda Accord LX</h3>
                                    <p className="text-gray-600 mb-2">$65/day</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                                            <span className="ml-1 text-sm text-gray-600">4.7 (52 reviews)</span>
                                        </div>
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
