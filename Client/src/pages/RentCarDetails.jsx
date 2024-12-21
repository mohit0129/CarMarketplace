import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, ChevronRight, Share2, Heart, Star, CircleAlert, CheckCircle2, Clock, Shield, Truck, DollarSign, Maximize } from 'lucide-react'
import { Link, useParams } from 'react-router-dom';
import TermsAndConditions from '../legal/terms&conditions';
import API_BASE_URL from '../config/apiConfig';

export default function RentCarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [rentalPeriod, setRentalPeriod] = useState('daily');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [showBreakdown, setShowBreakdown] = useState(false);

    const [selectedAddOns, setSelectedAddOns] = useState({
        insurance: false,
        gps: false,
        childSeat: false,
    });

    const addOnPrices = {
        insurance: 15,
        gps: 5,
        childSeat: 7,
    };

    const [rentalRates, setRentalRates] = useState({
        daily: 0,
        weekly: 0,
        monthly: 0
    });

    const toggleBreakdown = () => {
        setShowBreakdown(!showBreakdown);
    };

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/listings/listings/${id}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (!data) throw new Error('No data received');

                const transformedCar = {
                    id: data.listing_id,
                    make: data.make || 'NA',
                    model: data.model || 'NA',
                    year: data.year || new Date().getFullYear(),
                    mileage: data.mileage || 0,
                    carType: data.carType || 'NA',
                    images: data.images && data.images.length > 0
                        ? data.images.map(image => `${API_BASE_URL}${image.url}`)
                        : ['/placeholder-car-image.jpg'],
                    engine: data.engine || 'NA',
                    transmission: data.transmission || 'NA',
                    fuelType: data.fuelType || 'NA',
                    seatingCapacity: data.seatingCapacity || 'NA',
                    exteriorColor: data.exteriorColor || 'NA',
                    interiorColor: data.interiorColor || 'NA',
                    extraFeatures: data.extraFeatures || {},
                    price: data.price?.$numberDecimal ? parseFloat(data.price.$numberDecimal) : 0,
                    location: data.location || 'NA',
                    extraFeatures: {
                        gps: data.extraFeatures?.gps || false,
                        sunroof: data.extraFeatures?.sunroof || false,
                        leatherSeats: data.extraFeatures?.leatherSeats || false,
                        backupCamera: data.extraFeatures?.backupCamera || false,
                    }
                };

                setCar(transformedCar);
                setRentalRates({
                    daily: Math.round(transformedCar.price),
                    weekly: Math.round(transformedCar.price * 7),
                    monthly: Math.round(transformedCar.price * 30)
                });
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (days <= 0) return 0;

        let basePrice = 0;
        if (rentalPeriod === 'daily') basePrice = days * rentalRates.daily;
        if (rentalPeriod === 'weekly') basePrice = Math.ceil(days / 7) * rentalRates.weekly;
        if (rentalPeriod === 'monthly') basePrice = Math.ceil(days / 30) * rentalRates.monthly;

        const addOnsCost = Object.entries(selectedAddOns)
            .filter(([_, value]) => value)
            .reduce((total, [key]) => total + addOnPrices[key] * days, 0);

        return basePrice + addOnsCost;
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Loading car details...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen text-red-500">
            <p>Error: {error}</p>
        </div>
    );

    if (!car) return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Car not found</p>
        </div>
    );

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            }).catch((error) => console.error("Error sharing:", error));
        } else {
            // Fallback for browsers that do not support the Share API
            const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(document.title)}`;
            window.open(shareUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-background dark:bg-gray-900 flex justify-center">
            <main className="container max-w-[88%] px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <nav className="flex text-sm text-gray-600 dark:text-gray-400" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-200">Home</Link>
                            </li>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <li className="inline-flex items-center">
                                <Link to="/rent" className="hover:text-gray-900 dark:hover:text-gray-200">Rent</Link>
                            </li>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <li><span className="text-gray-400 dark:text-gray-500">{car.make}</span></li>
                            <ChevronRight className="w-4 h-4 mx-1" />
                            <li><span className="text-black dark:text-gray-100 font-semibold">{car.model}</span></li>
                        </ol>
                    </nav>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="p-8 space-y-12">
                        <div className="flex justify-between items-center">
                            <h1 className="text-5xl font-bold text-primary dark:text-gray-100">
                                {car.year} {car.make} {car.model}
                            </h1>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300 transform hover:scale-110"
                                >
                                    <Heart className={`w-8 h-8 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
                                </button>
                                <button className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300 transform hover:scale-110" onClick={handleShare}>
                                    <Share2 className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 justify-center">
                            <div className="flex justify-center items-center" style={{ width: '100%' }}>
                                <div className="relative aspect-video rounded-3xl overflow-hidden" style={{ width: 'calc(100% - 100px)', padding: '10px' }}>
                                    <div className="relative w-full h-full">
                                        <img
                                            alt={`${car.make} ${car.model}`}
                                            src={car.images[currentImageIndex]}
                                            className="absolute inset-0 w-full h-full object-contain rounded-2xl"
                                        />
                                        {car.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)}
                                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                                                >
                                                    <ArrowLeft className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % car.images.length)}
                                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                                                >
                                                    <ArrowRight className="w-6 h-6" />
                                                </button>
                                            </>
                                        )}
                                        {/* <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300">
                                            <Maximize className="w-6 h-6" />
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="grid grid-cols-4 gap-4" style={{ width: '80%', maxWidth: '600px' }}>
                                    {car.images.slice(0, 4).map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`relative aspect-video rounded-xl overflow-hidden transition duration-300 ${index === currentImageIndex ? 'ring-4 ring-primary dark:ring-primary-dark' : 'hover:opacity-75'
                                                }`}
                                            style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 10px)' }}
                                        >
                                            <img
                                                alt={`Car thumbnail ${index + 1}`}
                                                src={image}
                                                className="absolute inset-0 w-full h-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                                    <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Vehicle Specifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Make', value: car.make },
                                            { label: 'Model', value: car.model },
                                            { label: 'Year', value: car.year },
                                            { label: 'Location', value: car.location },
                                            { label: 'Mileage', value: `${car.mileage.toLocaleString()} miles` },
                                            { label: 'Engine', value: car.engine },
                                            { label: 'Transmission', value: car.transmission },
                                            { label: 'Fuel Type', value: car.fuelType },
                                            { label: 'Seating Capacity', value: car.seatingCapacity },
                                            { label: 'Exterior Color', value: car.exteriorColor },
                                            { label: 'Interior Color', value: car.interiorColor },
                                            { label: 'Car Type', value: car.carType },
                                        ].map((spec, index) => (
                                            <div key={index} className="flex flex-col">
                                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{spec.label}</span>
                                                <span className="font-medium text-lg dark:text-gray-200">{spec.value}</span>
                                            </div>
                                        ))}
                                        {car.extraFeatures && (
                                            <div className="mt-4">
                                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Extra Features:</span>
                                                <ul className="list-disc list-inside">
                                                    {Object.entries(car.extraFeatures)
                                                        .filter(([_, value]) => value) // Only include features that are true
                                                        .map(([key]) => (
                                                            <li key={key} className="font-medium text-lg dark:text-gray-200">
                                                                {key
                                                                    .replace(/([A-Z])/g, ' $1') // Convert camelCase to Title Case
                                                                    .replace(/^./, str => str.toUpperCase())} {/* Capitalize the first letter */}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                                    <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Vehicle Condition</h2>
                                    <div className="space-y-6 text-lg mb-2">
                                        <p className="text-gray-700 mb-4 dark:text-gray-100">
                                            This {car.year} {car.make} {car.model} is in excellent condition and regularly maintained. It has undergone a thorough inspection and detailing process to ensure a high-quality rental experience.
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-100">
                                            <li>Last serviced: 1 month ago</li>
                                            <li>Tires replaced: 6 months ago</li>
                                            <li>Interior deep cleaned: Before each rental</li>
                                            <li>No accident history</li>
                                            <li>Non-smoking vehicle</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                                    <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Rental Terms</h2>
                                    <div className="space-y-4 dark:text-gray-100">
                                        <div>
                                            <h3 className="font-medium text-lg mb-2">Mileage Policy</h3>
                                            <p className="text-gray-600 dark:text-gray-300">150 miles per day included. ₹0.25 per additional mile.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-2">Fuel Policy</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Return with same fuel level as pickup.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-2">Insurance</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Basic insurance included. Additional coverage available.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsTermsOpen(true)}
                                            className="text-primary hover:underline dark:text-white"
                                        >
                                            View Full Terms and Conditions
                                        </button>
                                    </div>
                                </div>
                                {/* Customer Reviews */}
                                {/* will add in future */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
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

                            <div className="space-y-8">
                                <div className=' bg-gray-50 dark:bg-gray-700 rounded-3xl p-6'>
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="text-4xl font-bold">₹{rentalRates[rentalPeriod]}</p>
                                            <p className="text-sm text-gray-500">per {rentalPeriod}</p>
                                        </div>
                                        <div className="text-green-500 font-semibold">Available</div>
                                    </div>

                                    <button
                                        onClick={toggleBreakdown}
                                        className="text-lg font-bold text-primary dark:text-primary-dark underline mt-4"
                                    >
                                        {showBreakdown ? 'Hide Rental Pricing' : 'Show Rental Pricing'}
                                    </button>
                                    {showBreakdown && (
                                        <div className="mt-4 text-base">
                                            <p>
                                                <strong>Daily Rate:</strong> ₹{car.price.toLocaleString()}
                                            </p>
                                            <p>
                                                <strong>Weekly Rate:</strong> ₹{car.price * 7}
                                            </p>
                                            <p>
                                                <strong>Monthly Rate:</strong> ₹{car.price * 30}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className=' bg-gray-50 dark:bg-gray-700 rounded-3xl p-6'>
                                    <div className="space-y-4">
                                        <div><br />
                                            <label className="block text-sm font-medium mb-1">Rental Period</label>
                                            <select
                                                value={rentalPeriod}
                                                onChange={(e) => setRentalPeriod(e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            >
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div><br />
                                        <h3 className="text-lg font-semibold mb-4">Book Your Rental</h3>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Pick-up Date</label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Return Date</label>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2">Add-ons</h3>
                                            {Object.entries(addOnPrices).map(([addon, price]) => (
                                                <label key={addon} className="flex items-center space-x-2 mb-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAddOns[addon]}
                                                        onChange={() => setSelectedAddOns(prev => ({
                                                            ...prev,
                                                            [addon]: !prev[addon]
                                                        }))}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <span>{addon.charAt(0).toUpperCase() + addon.slice(1)} (₹{price}/day)</span>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between mb-2">
                                                <span>Total Price:</span>
                                                <span className="font-bold">₹{calculateTotalPrice()}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">Includes all selected add-ons</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Link
                                                to={`/payment/${car.id}`}
                                                className="block w-full"
                                            >
                                                <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-300 flex items-center justify-center">
                                                    <DollarSign className="w-5 h-5 mr-2" />
                                                    Reserve Now
                                                </button>
                                            </Link>
                                            <Link
                                                to="/contactUs"
                                                className="block w-full"
                                            >
                                                <button className="w-full bg-gray-100 text-secondary py-2 px-4 rounded-md hover:bg-secondary/20 transition duration-300">
                                                    Contact Us
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="pt-4 space-y-2">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Shield className="w-4 h-4 mr-2" />
                                                <span>Free cancellation up to 24h before pickup</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Truck className="w-4 h-4 mr-2" />
                                                <span>Free delivery within 50km</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {isTermsOpen && <TermsAndConditions isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />}
        </div>
    );
}

