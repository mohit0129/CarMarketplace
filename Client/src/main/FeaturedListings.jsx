import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function FeaturedListings() {
    const [selectedOption, setSelectedOption] = useState('buy'); // State to track selected option
    const navigate = useNavigate(); // Initialize navigate function from React Router

    // Sample listings for Buy and Rent
    const buyListings = [
        { id: 1, model: 'Car Model 1', type: 'Sedan • Automatic • Petrol', price: '$30,000' },
        { id: 2, model: 'Car Model 2', type: 'SUV • Manual • Diesel', price: '$35,000' },
        { id: 3, model: 'Car Model 3', type: 'Convertible • Automatic • Electric', price: '$20,000' },
        { id: 4, model: 'Car Model 4', type: 'Luxury • Manual • Electric', price: '$19,000' },
        { id: 5, model: 'Car Model 5', type: 'Convertible • Manual • Petrol', price: '$40,000' },
        { id: 6, model: 'Car Model 6', type: 'Sports car • Automatic • Petrol', price: '$50,000' },
    ];

    const rentListings = [
        { id: 1, model: 'Car Model 1', type: 'Sedan • Automatic • Petrol', price: '$500/month' },
        { id: 2, model: 'Car Model 2', type: 'SUV • Manual • Diesel', price: '$600/month' },
        { id: 3, model: 'Car Model 3', type: 'Luxury • Automatic • Electric', price: '$750/month' },
        { id: 4, model: 'Car Model 4', type: 'Convertible • Automatic • Electric', price: '$750/month' },
        { id: 5, model: 'Car Model 5', type: 'Sports Car • Automatic • Electric', price: '$750/month' },
        { id: 6, model: 'Car Model 6', type: 'Convertible • Automatic • Electric', price: '$750/month' },
    ];

    // Determine which listings to display
    const listings = selectedOption === 'buy' ? buyListings : rentListings;

    // Function to handle Explore More button click
    const handleExploreMore = () => {
        if (selectedOption === 'buy') {
            navigate('/BuyCar'); // Navigate to BuyCar component
        } else {
            navigate('/CarRental'); // Navigate to RentCar component
        }
    };

    return (
        <div>
            <section className="up_down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured Listings</h2>
                    <div className="flex justify-center mb-8">
                        <button 
                            className={`px-6 py-2 ${selectedOption === 'buy' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-l-md`} 
                            onClick={() => setSelectedOption('buy')}
                        >
                            Buy
                        </button>
                        <button 
                            className={`px-6 py-2 ${selectedOption === 'rent' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-r-md`} 
                            onClick={() => setSelectedOption('rent')}
                        >
                            Rent
                        </button>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {listings.map((listing) => (
                            <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gray-200 dark:bg-gray-700 h-48"></div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{listing.model}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{listing.type}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white">{listing.price}</span>
                                        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-black">View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mb-12 py-10">
                        <button className="explore_more" onClick={handleExploreMore}>
                            Explore More <ChevronRight style={{ marginLeft: '5px' }} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FeaturedListings;
