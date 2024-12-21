import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

function FeaturedListings() {
    const [selectedOption, setSelectedOption] = useState('buy');
    const [buyListings, setBuyListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/listings/listings`);
                if (!response.ok) {
                    throw new Error('Failed to fetch car listings');
                }
                const data = await response.json();

                // Filter and transform buy listings
                const saleCars = data
                    .filter(car => car.RentSell === 'Sell' && car.listing_status === "active")
                    .slice(0, 6)
                    .map((car, index) => ({
                        id: car.listing_id || index,
                        model: `${car.make} ${car.model}`,
                        type: `${car.carType} • ${car.transmission || 'Unknown'} • ${car.fuelType || 'Unknown'}`,
                        price: `₹${parseFloat(car.price?.$numberDecimal || 0).toLocaleString()}`,
                        image: car.images?.[0]?.url ?
                            (car.images[0].url.startsWith('http') ?
                                car.images[0].url :
                                `${API_BASE_URL}${car.images[0].url}`) :
                            ''
                    }));

                // Filter and transform rent listings
                const rentCars = data
                    .filter(car => car.RentSell === 'Rent' && car.listing_status === "active")
                    .slice(0, 6)
                    .map((car, index) => ({
                        id: car.listing_id || index,
                        model: `${car.make} ${car.model}`,
                        type: `${car.carType} • ${car.transmission || 'Unknown'} • ${car.fuelType || 'Unknown'}`,
                        price: `₹${parseFloat(car.price?.$numberDecimal || 0).toLocaleString()}/month`,
                        image: car.images?.[0]?.url ?
                            (car.images[0].url.startsWith('http') ?
                                car.images[0].url :
                                `${API_BASE_URL}${car.images[0].url}`) :
                            ''
                    }));

                setBuyListings(saleCars);
                setRentListings(rentCars);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-600 dark:text-gray-300">Loading featured listings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl sm:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Featured Listings</h2>

                <div className="flex justify-center mb-10">
                    <div className="inline-flex rounded-full p-1 bg-gray-200 dark:bg-gray-700">
                        <button
                            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${selectedOption === 'buy' ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                            onClick={() => setSelectedOption('buy')}
                        >
                            Buy
                        </button>
                        <button
                            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${selectedOption === 'rent' ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                            onClick={() => setSelectedOption('rent')}
                        >
                            Rent
                        </button>
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {(selectedOption === 'buy' ? buyListings : rentListings).map((listing) => (
                        <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black dark:focus-within:ring-white">
                            <div className="h-56 bg-cover bg-center">
                                <img
                                    alt={`${listing.make} ${listing.model}`}
                                    className="w-full h-48 object-fill"
                                    src={listing.image.startsWith('http') ? listing.image : `${API_BASE_URL}${listing.image}`}
                                    style={{ objectFit: "fill", minWidth: "100%", height: "-webkit-fill-available" }}
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{listing.model}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{listing.type}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-2xl text-gray-900 dark:text-white">{listing.price}</span>
                                    <Link to={`/${selectedOption === 'buy' ? 'buy-car' : 'rent-car'}/${listing.id}`}>
                                        <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link to="CarExplore">
                    <button
                        className="px-8 py-3 bg-black text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center" >
                        Explore More
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default FeaturedListings;

