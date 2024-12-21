import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, Star, MapPin, Calendar, Car, X } from 'lucide-react'
import { Link } from 'react-router-dom';
import Loader from '../main/Loader';
import API_BASE_URL from '../config/apiConfig';

export default function CarExplore() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [carType, setCarType] = useState('');
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [marketplaceMode, setMarketplaceMode] = useState('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'lowToHigh', 'highToLow'
  const [minRating, setMinRating] = useState(0);
  

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/listings/listings`);
        if (!response.ok) {
          throw new Error('Failed to fetch car listings');
        }
        const data = await response.json();

        const filteredCars = data.filter(car =>
          car.RentSell === (marketplaceMode === 'rent' ? 'Rent' : 'Sell') &&
          car.listing_status === "active"
        );

        const transformedCars = filteredCars.map((car, index) => ({
          id: car.listing_id || index,
          listing_id: car.listing_id,
          make: car.make || 'Unknown',
          model: car.model || 'Model',
          year: car.year || new Date().getFullYear(),
          price: car.price?.$numberDecimal ? parseFloat(car.price.$numberDecimal) : 0,
          mileage: car.mileage || 0,
          carType: car.carType || 'Unknown',
          image: car.images?.[0]?.url || '',
          rentSell: car.RentSell,
          transmission: car.transmission || 'Unknown',
          rating: Math.random() * 2 + 3,
          reviews: Math.floor(Math.random() * 100) + 1,
        }));

        setCars(transformedCars);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [marketplaceMode]);

  // Filter and sort cars
  const getFilteredAndSortedCars = () => {
    let filtered = cars.filter((car) => {
      const isPriceInRange = car.price >= priceRange[0] && car.price <= priceRange[1];
      const isCarTypeMatch = carType ? car.carType.toLowerCase() === carType.toLowerCase() : true;
      const isMakeMatch = make ? car.make.toLowerCase() === make.toLowerCase() : true;
      const isYearMatch = year ? car.year.toString() === year : true;
      const isTransmissionMatch = selectedTransmission === 'All' || car.transmission === selectedTransmission;
      const isRatingMatch = car.rating >= minRating;
      const matchesSearch = searchQuery
        ? (car.make + ' ' + car.model + ' ' + car.year)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
        : true;

      return isPriceInRange && isCarTypeMatch && isMakeMatch &&
        isYearMatch && isTransmissionMatch && matchesSearch &&
        (marketplaceMode === 'buy' || isRatingMatch);
    });

    // Apply sorting
    if (sortOrder !== 'none') {
      filtered.sort((a, b) => {
        if (sortOrder === 'lowToHigh') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return filtered;
  };

  const filteredCars = getFilteredAndSortedCars();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
        <p className="ml-2 text-lg text-gray-600">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p className="text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {marketplaceMode === 'rent' ? 'Rent Your Perfect Car' : 'Find Your Perfect Car'}
            </h1>
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-full p-1 bg-gray-200 dark:bg-gray-700">
                <button
                  className={`px-6 py-1 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${marketplaceMode === 'buy' ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  onClick={() => setMarketplaceMode('buy')}
                >
                  Buy
                </button>
                <button
                  className={`px-6 py-1 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${marketplaceMode === 'rent' ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  onClick={() => setMarketplaceMode('rent')}
                >
                  Rent
                </button>
              </div>
            </div>
            <div className="relative w-full md:w-96">
              <input
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Search by Make, Model, or Year"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </header>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
        {marketplaceMode === 'rent'
          ? 'Quality assured vehicles for your rental needs'
          : 'Quality assured vehicles at competitive prices'}
      </p>
      <main className="flex-grow container mx-auto px-4 py-8 bg-inherit">
        <div className="flex flex-col md:flex-row gap-8">
          <aside
            className={`md:w-64 md:min-w-[260px] ${isFilterOpen ? 'block' : 'hidden md:block'} md:sticky md:top-0 md:h-screen transition-colors duration-200`}
            style={{ zIndex: 10 }}
          >
            <div className="p-6 rounded-lg shadow-md h-auto bg-white dark:bg-gray-800 transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Filters</h2>
              <div className="space-y-6">
                {/* Sort Order */}
                <div>
                  <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sort by Price
                  </label>
                  <select
                    id="sort-order"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="none">Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {marketplaceMode === 'rent' ? 'Price Range Per Day' : 'Price Range'}
                    <span className="float-right">
                      ₹{priceRange[1].toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>₹0</span>
                    <span>₹100,000+</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Make</label>
                  <select
                    id="make"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                  >
                    <option value="">Select make</option>
                    {[...new Set(cars.map(car => car.make))].map(makeName => (
                      <option key={makeName} value={makeName}>{makeName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Car Type</label>
                  <select
                    id="car-type"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    {[...new Set(cars.map(car => car.carType))].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transmission</label>
                  <select
                    id="transmission"
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option>All</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
                  <select
                    id="year"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Select year</option>
                    {[...new Set(cars.map(car => car.year))].sort().map(yearValue => (
                      <option key={yearValue} value={yearValue.toString()}>{yearValue}</option>
                    ))}
                  </select>
                </div>

                {marketplaceMode === 'rent' && (
                  <div>
                    <label htmlFor="rating-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      Minimum Rating
                    </label>
                    <select
                      id="rating-filter"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                    >
                      <option value={0}>All Ratings</option>
                      <option value={1}>1+ Stars</option>
                      <option value={2}>2+ Stars</option>
                      <option value={3}>3+ Stars</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <section className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Available Cars</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
                </p>
              </div>
              <button
                className="md:hidden px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? (
                  <X className="inline-block mr-2 h-4 w-4" />
                ) : (
                  <SlidersHorizontal className="inline-block mr-2 h-4 w-4" />
                )}
                {isFilterOpen ? 'Close Filters' : 'Filters'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col"
                >
                  <img
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                    src={car.image.startsWith('http') ? car.image : `${API_BASE_URL}${car.image}`}
                    style={{ objectFit: "cover", minWidth: "100%" }}
                  />

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {`${car.make} ${car.model}`}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {car.year} • {car.mileage.toLocaleString()} miles • {car.carType}
                    </p>

                    {marketplaceMode === 'rent' && (
                      <p className="flex items-center text-sm mt-2 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {car.rating.toFixed(1)} ({car.reviews} reviews)
                      </p>
                    )}

                    <div className="mt-auto">
                      <p className="text-xl font-bold text-black dark:text-white">
                        ₹{car.price.toLocaleString()}
                        {marketplaceMode === 'rent' && <span className="text-sm font-normal">/Day</span>}
                      </p>

                      <Link to={`/${marketplaceMode}-car/${car.listing_id}`}>
                        <button
                          className="w-full mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                        >
                          {marketplaceMode === 'rent' ? 'Rent Now' : (
                            <>
                              <Car className="inline-block mr-2 h-4 w-4" /> View Details
                            </>
                          )}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No cars found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
