import { useState } from 'react'
import { Car, Search, SlidersHorizontal } from "lucide-react"
import { Link } from 'react-router-dom';

export default function BuyCar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])

  const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 25000, mileage: 15000, image: '/placeholder.svg' },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 22000, mileage: 20000, image: '/placeholder.svg' },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2023, price: 35000, mileage: 5000, image: '/placeholder.svg' },
    { id: 4, make: 'Tesla', model: 'Model 3', year: 2022, price: 45000, mileage: 10000, image: '/placeholder.svg' },
    { id: 5, make: 'BMW', model: 'X5', year: 2021, price: 55000, mileage: 25000, image: '/placeholder.svg' },
    { id: 6, make: 'Mercedes', model: 'C-Class', year: 2023, price: 50000, mileage: 8000, image: '/placeholder.svg' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold text-gray-800">Find Your Perfect Car</h1>
            <div className="relative w-full md:w-96">
              <input
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                placeholder="Search by Make, Model, or Price"
                type="search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Quality assured vehicles at competitive prices</p>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className={`md:w-64 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Price Range</label>
                  <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>$0</span>
                    <span>$100,000+</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700">Car Type</label>
                  <select id="car-type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select type</option>
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="truck">Truck</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
                  <select id="make" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select make</option>
                    <option value="toyota">Toyota</option>
                    <option value="honda">Honda</option>
                    <option value="ford">Ford</option>
                    <option value="bmw">BMW</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                  <select id="year" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Select year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
          <section className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Cars</h2>
              <button
                className="md:hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal className="inline-block mr-2 h-4 w-4" />
                Filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" height="200" src={car.image} style={{
                    aspectRatio: "300/200", objectFit: "cover",
                  }} width="300" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{`${car.make} ${car.model}`}</h3>
                    <p className="text-sm text-gray-600">{car.year} • {car.mileage.toLocaleString()} miles</p>
                    <p className="text-lg font-bold mt-2">${car.price.toLocaleString()}</p>
                    <Link to="../BuyCarDetails">
                      <button className="w-full mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Car className="inline-block mr-2 h-4 w-4" /> View Details
                      </button>
                    </Link>
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