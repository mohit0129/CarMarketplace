'use client'

import { useState } from 'react'
import { Calendar, Car, MapPin, Search, SlidersHorizontal, Star } from "lucide-react"

export default function CarRental() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])

  const rentalCars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, pricePerDay: 50, image: '/placeholder.svg', rating: 4.5, reviews: 120 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021, pricePerDay: 45, image: '/placeholder.svg', rating: 4.2, reviews: 98 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2023, pricePerDay: 80, image: '/placeholder.svg', rating: 4.8, reviews: 75 },
    { id: 4, make: 'Tesla', model: 'Model 3', year: 2022, pricePerDay: 100, image: '/placeholder.svg', rating: 4.7, reviews: 150 },
    { id: 5, make: 'BMW', model: 'X5', year: 2021, pricePerDay: 120, image: '/placeholder.svg', rating: 4.6, reviews: 88 },
    { id: 6, make: 'Mercedes', model: 'C-Class', year: 2023, pricePerDay: 110, image: '/placeholder.svg', rating: 4.4, reviews: 102 },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800">Rent Your Perfect Car</h1>
            <div className="relative w-full md:w-96">
              <input
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                placeholder="Search by City or Car Model"
                type="search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Flexible rentals with 24/7 support</p>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className={`md:w-64 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Price Range per Day</label>
                  <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$500+</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="rental-duration" className="block text-sm font-medium text-gray-700">Rental Duration</label>
                  <select id="rental-duration" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700">Car Type</label>
                  <select id="car-type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>All Types</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                    <option>Luxury</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700">Pick-up Location</label>
                  <input
                    type="text"
                    id="pickup-location"
                    placeholder="Enter city or airport"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">Transmission</label>
                  <select id="transmission" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>All</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="features" className="block text-sm font-medium text-gray-700">Additional Features</label>
                  <div className="mt-2 space-y-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-700">GPS</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-700">Child Seat</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                      <span className="ml-2 text-sm text-gray-700">Insurance Included</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <section className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Rental Cars</h2>
              <button
                className="md:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="inline-block mr-2 h-4 w-4" />
                Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentalCars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                    height="200"
                    src={car.image}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{`${car.make} ${car.model}`}</h3>
                    <p className="text-sm text-gray-600">{car.year}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{car.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({car.reviews} reviews)</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-lg font-bold">${car.pricePerDay}<span className="text-sm font-normal">/day</span></p>
                      <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Rent Now
                      </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> Available: Jun 1 - Aug 31</p>
                      <p className="flex items-center mt-1"><MapPin className="h-4 w-4 mr-1" /> Pick-up: City Center</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}