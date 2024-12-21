// import { useState, useEffect } from 'react';
// import { ArrowLeft, ArrowRight, ChevronRight, Facebook, Heart, Share2, Twitter, CheckCircle } from 'lucide-react';
// import { Link, useParams } from 'react-router-dom';

// export default function BuyCarDetails() {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [downPayment, setDownPayment] = useState(5000);
//   const [loanTerm, setLoanTerm] = useState(60);
//   const [interestRate, setInterestRate] = useState(3.5);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/listings/listings/${id}`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         if (!data) throw new Error('No data received');

//         const transformedCar = {
//           id: data.listing_id,
//           make: data.make || 'NA',
//           model: data.model || 'NA',
//           year: data.year || new Date().getFullYear(),
//           price: data.price?.$numberDecimal ? parseFloat(data.price.$numberDecimal) : 0,
//           mileage: data.mileage || 0,
//           carType: data.carType || 'NA',
//           images: data.images && data.images.length > 0
//             ? data.images.map(image => `${API_BASE_URL}${image.url}`)
//             : ['/placeholder-car-image.jpg'],
//           engine: data.engine || 'NA',
//           transmission: data.transmission || 'NA',
//           fuelType: data.fuelType || 'NA',
//           seatingCapacity: data.seatingCapacity || 'NA',
//           exteriorColor: data.exteriorColor || 'NA',
//           interiorColor: data.interiorColor || 'NA',
//           vin: data.vin || 'NA'
//         };

//         setCar(transformedCar);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchCarDetails();

//     if (id) {
//       sessionStorage.setItem('currentListingId', id);
//     }
//   }, [id]);

//   const calculateMonthlyPayment = () => {
//     if (!car) return '0';
//     const principal = car.price - downPayment;
//     const monthlyRate = interestRate / 100 / 12;
//     const numberOfPayments = loanTerm;
//     const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
//       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
//     return monthlyPayment.toFixed(2);
//   };

//   const testnotify = () => {
//     alert("Thank you for scheduling a test drive. We will contact you soon.");
//   };

//   const taxRate = 0.08;
//   const registrationFee = 300;

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <p>Loading car details...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="flex justify-center items-center min-h-screen text-red-500">
//       <p>Error: {error}</p>
//     </div>
//   );

//   if (!car) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <p>Car not found</p>
//     </div>
//   );

//   const totalCost = car.price + (car.price * taxRate) + registrationFee;

//   return (
//     // <div className="min-h-screen bg-gray-100">
//     //   <header className="bg-white shadow">
//     //     <div className="container mx-auto px-4 py-6">
//     //       <nav className="text-sm breadcrumbs">
//     //         <ul className="flex items-center space-x-2">
//     //           <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
//     //           <ChevronRight className="w-4 h-4 text-gray-500" />
//     //           <li><Link to="/buy-car" className="text-gray-500 hover:text-gray-700">Buy Car</Link></li>
//     //           <ChevronRight className="w-4 h-4 text-gray-500" />
//     //           <li><span className="text-gray-500">{car.make}</span></li>
//     //           <ChevronRight className="w-4 h-4 text-gray-500" />
//     //           <li className="text-gray-900 font-medium">{car.model}</li>
//     //         </ul>
//     //       </nav>
//     //       <h1 className="text-3xl font-bold text-gray-800 mt-4">
//     //         {car.year} {car.make} {car.model}
//     //       </h1>
//     //     </div>
//     //   </header>

//     //   <main className="container mx-auto px-4 py-8">
//     //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//     //       <div className="lg:col-span-2">
//     //         <div className="relative flex items-center justify-center rounded-lg shadow-lg overflow-hidden h-96 bg-gray-200">
//     //           <img
//     //             src={car.images[currentImageIndex]}
//     //             alt={`${car.make} ${car.model}`}
//     //             className="object-cover w-full h-full"
//     //             style={{ minWidth: "100%", objectFit: "cover" }}
//     //             onError={(e) => {
//     //               e.target.src = '/placeholder-car-image.jpg';
//     //             }}
//     //           />
//     //           {car.images.length > 1 && (
//     //             <>
//     //               <button
//     //                 onClick={() => setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)}
//     //                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//     //               >
//     //                 <ArrowLeft className="w-6 h-6" />
//     //               </button>
//     //               <button
//     //                 onClick={() => setCurrentImageIndex((prev) => (prev + 1) % car.images.length)}
//     //                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//     //               >
//     //                 <ArrowRight className="w-6 h-6" />
//     //               </button>
//     //             </>
//     //           )}
//     //         </div>

//     //         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//     //           <h2 className="text-2xl font-semibold mb-4">Vehicle Specifications</h2>
//     //           <div className="grid grid-cols-2 gap-4">
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Make</h3>
//     //               <p>{car.make}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Model</h3>
//     //               <p>{car.model}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Year</h3>
//     //               <p>{car.year}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Mileage</h3>
//     //               <p>{car.mileage.toLocaleString()} miles</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Engine</h3>
//     //               <p>{car.engine}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Transmission</h3>
//     //               <p>{car.transmission}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Fuel Type</h3>
//     //               <p>{car.fuelType}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Seating Capacity</h3>
//     //               <p>{car.seatingCapacity} passengers</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Exterior Color</h3>
//     //               <p>{car.exteriorColor}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Interior Color</h3>
//     //               <p>{car.interiorColor}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Car Type</h3>
//     //               <p>{car.carType}</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">VIN</h3>
//     //               <p>{car.vin}</p>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//     //           <h2 className="text-2xl font-semibold mb-4">Condition Summary</h2>
//     //           <div className="flex items-center mb-4">
//     //             <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
//     //             <span className="font-medium">Certified Pre-Owned</span>
//     //           </div>
//     //           <p className="text-gray-700 mb-4">
//     //             This vehicle has undergone a rigorous inspection and reconditioning process.
//     //             It is in excellent condition and comes with an extended warranty.
//     //           </p>
//     //           <ul className="list-disc list-inside text-gray-700">
//     //             <li>Regular maintenance up to date</li>
//     //             <li>No accident history reported</li>
//     //             <li>New tires installed recently</li>
//     //             <li>Minor wear on driver's seat (see images)</li>
//     //             <li>Small paint touch-up on rear bumper</li>
//     //           </ul>
//     //         </div>

//     //         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//     //           <h2 className="text-2xl font-semibold mb-4">Vehicle History</h2>
//     //           <div className="space-y-4">
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Ownership History</h3>
//     //               <p>1 previous owner (lease vehicle)</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Accident History</h3>
//     //               <p>No accidents or damage reported</p>
//     //             </div>
//     //             <div>
//     //               <h3 className="font-medium text-gray-600">Service Records</h3>
//     //               <ul className="list-disc list-inside text-gray-700">
//     //                 <li>Regular oil changes and tire rotations</li>
//     //                 <li>30,000-mile service completed</li>
//     //                 <li>Brake pads replaced at 25,000 miles</li>
//     //               </ul>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>

//     //       <div className="lg:col-span-1">
//     //         <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-4">
//     //           <div className="flex justify-between items-center mb-4">
//     //             <h2 className="text-3xl font-bold">₹{car.price.toLocaleString()}</h2>
//     //             <button
//     //               onClick={() => setIsWishlisted(!isWishlisted)}
//     //               className={`${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
//     //             >
//     //               <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
//     //             </button>
//     //           </div>
//     //           <p className="text-gray-600 mb-4">
//     //             Starting at ₹{calculateMonthlyPayment()}/month with ₹{downPayment.toLocaleString()} down for {loanTerm} months
//     //           </p>
//     //           <div className="space-y-4">
//     //             <Link to={`/payment/${car.id}`}>
//     //               <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
//     //                 Proceed to Payment
//     //               </button>
//     //             </Link>
//     //             <Link to="/contact-us">
//     //               <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 font-semibold">
//     //                 Contact Us
//     //               </button>
//     //             </Link>
//     //           </div>
//     //           <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//     //             <span>Share this car:</span>
//     //             <div className="flex space-x-2">
//     //               <button className="hover:text-blue-600">
//     //                 <Facebook className="w-5 h-5" />
//     //               </button>
//     //               <button className="hover:text-blue-400">
//     //                 <Twitter className="w-5 h-5" />
//     //               </button>
//     //               <button className="hover:text-green-600">
//     //                 <Share2 className="w-5 h-5" />
//     //               </button>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//     //           <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
//     //           <div className="space-y-2">
//     //             <div className="flex justify-between">
//     //               <span className="text-gray-600">Base Price:</span>
//     //               <span>₹{car.price.toLocaleString()}</span>
//     //             </div>
//     //             <div className="flex justify-between">
//     //               <span className="text-gray-600">Taxes (8%):</span>
//     //               <span>₹{(car.price * taxRate).toLocaleString()}</span>
//     //             </div>
//     //             <div className="flex justify-between">
//     //               <span className="text-gray-600">Registration Fee:</span>
//     //               <span>₹{registrationFee}</span>
//     //             </div>
//     //             <div className="flex justify-between font-semibold">
//     //               <span className="text-gray-600">Total:</span>
//     //               <span>₹{totalCost.toLocaleString()}</span>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         <div className="bg-white rounded-lg shadow-lg p-6">
//     //           <h3 className="text-lg font-semibold mb-4">Schedule a Test Drive</h3>
//     //           <form>
//     //             <div className="space-y-4">
//     //               <div>
//     //                 <label htmlFor="test-drive-date" className="block text-sm font-medium text-gray-700">
//     //                   Preferred Date
//     //                 </label>
//     //                 <input
//     //                   type="date"
//     //                   id="test-drive-date"
//     //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//     //                 />
//     //               </div>
//     //               <div>
//     //                 <label htmlFor="test-drive-time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
//     //                 <select id="test-drive-time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
//     //                   <option>Morning (9AM - 12PM)</option>
//     //                   <option>Afternoon (12PM - 4PM)</option>
//     //                   <option>Evening (4PM - 7PM)</option>
//     //                 </select>
//     //               </div>
//     //             </div>
//     //             <button type="button" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold" onClick={testnotify}>
//     //               Schedule Test Drive
//     //             </button>
//     //           </form>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </main>
//     // </div>
//     <div className="min-h-screen bg-gray-100">
//     <header className="bg-white shadow">
//       <div className="container mx-auto px-4 py-6">
//         <nav className="text-sm breadcrumbs">
//           <ul className="flex items-center space-x-2">
//             <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
//             <ChevronRight className="w-4 h-4 text-gray-500" />
//             <li><Link to="/buy-car" className="text-gray-500 hover:text-gray-700">Buy Car</Link></li>
//             <ChevronRight className="w-4 h-4 text-gray-500" />
//             <li><span className="text-gray-500">{car.make}</span></li>
//             <ChevronRight className="w-4 h-4 text-gray-500" />
//             <li className="text-gray-900 font-medium">{car.model}</li>
//           </ul>
//         </nav>
//         <h1 className="text-3xl font-bold text-gray-800 mt-4">
//           {car.year} {car.make} {car.model}
//         </h1>
//       </div>
//     </header>

//     <main className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="relative flex items-center justify-center rounded-lg shadow-lg overflow-hidden h-96 bg-gray-200">
//             <img
//               src={car.images[currentImageIndex]}
//               alt={`${car.make} ${car.model}`}
//               className="object-cover w-full h-full"
//               style={{ minWidth: "100%", objectFit: "cover" }}
//               onError={(e) => {
//                 e.target.src = '/placeholder-car-image.jpg';
//               }}
//             />
//             {car.images.length > 1 && (
//               <>
//                 <button
//                   onClick={() => setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 >
//                   <ArrowLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={() => setCurrentImageIndex((prev) => (prev + 1) % car.images.length)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//                 >
//                   <ArrowRight className="w-6 h-6" />
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4">Vehicle Specifications</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="font-medium text-gray-600">Make</h3>
//                 <p>{car.make}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Model</h3>
//                 <p>{car.model}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Year</h3>
//                 <p>{car.year}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Mileage</h3>
//                 <p>{car.mileage.toLocaleString()} miles</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Engine</h3>
//                 <p>{car.engine}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Transmission</h3>
//                 <p>{car.transmission}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Fuel Type</h3>
//                 <p>{car.fuelType}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Seating Capacity</h3>
//                 <p>{car.seatingCapacity} passengers</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Exterior Color</h3>
//                 <p>{car.exteriorColor}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Interior Color</h3>
//                 <p>{car.interiorColor}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Car Type</h3>
//                 <p>{car.carType}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">VIN</h3>
//                 <p>{car.vin}</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4">Condition Summary</h2>
//             <div className="flex items-center mb-4">
//               <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
//               <span className="font-medium">Certified Pre-Owned</span>
//             </div>
//             <p className="text-gray-700 mb-4">
//               This vehicle has undergone a rigorous inspection and reconditioning process.
//               It is in excellent condition and comes with an extended warranty.
//             </p>
//             <ul className="list-disc list-inside text-gray-700">
//               <li>Regular maintenance up to date</li>
//               <li>No accident history reported</li>
//               <li>New tires installed recently</li>
//               <li>Minor wear on driver's seat (see images)</li>
//               <li>Small paint touch-up on rear bumper</li>
//             </ul>
//           </div>

//           <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//             <h2 className="text-2xl font-semibold mb-4">Vehicle History</h2>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium text-gray-600">Ownership History</h3>
//                 <p>1 previous owner (lease vehicle)</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Accident History</h3>
//                 <p>No accidents or damage reported</p>
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-600">Service Records</h3>
//                 <ul className="list-disc list-inside text-gray-700">
//                   <li>Regular oil changes and tire rotations</li>
//                   <li>30,000-mile service completed</li>
//                   <li>Brake pads replaced at 25,000 miles</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-3xl font-bold">₹{car.price.toLocaleString()}</h2>
//               <button
//                 onClick={() => setIsWishlisted(!isWishlisted)}
//                 className={`${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
//               >
//                 <Heart className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} />
//               </button>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Starting at ₹{calculateMonthlyPayment()}/month with ₹{downPayment.toLocaleString()} down for {loanTerm} months
//             </p>
//             <div className="space-y-4">
//               <Link to={`/payment/${car.id}`}>
//                 <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">
//                   Proceed to Payment
//                 </button>
//               </Link>
//               <Link to="/contact-us">
//                 <button className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 font-semibold">
//                   Contact Us
//                 </button>
//               </Link>
//             </div>
//             <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
//               <span>Share this car:</span>
//               <div className="flex space-x-2">
//                 <button className="hover:text-blue-600">
//                   <Facebook className="w-5 h-5" />
//                 </button>
//                 <button className="hover:text-blue-400">
//                   <Twitter className="w-5 h-5" />
//                 </button>
//                 <button className="hover:text-green-600">
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//             <h3 className="text-lg font-semibold mb-4">Pricing Breakdown</h3>
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Base Price:</span>
//                 <span>₹{car.price.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Taxes (8%):</span>
//                 <span>₹{(car.price * taxRate).toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Registration Fee:</span>
//                 <span>₹{registrationFee}</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span className="text-gray-600">Total:</span>
//                 <span>₹{totalCost.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Schedule a Test Drive</h3>
//             <form>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="test-drive-date" className="block text-sm font-medium text-gray-700">
//                     Preferred Date
//                   </label>
//                   <input
//                     type="date"
//                     id="test-drive-date"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="test-drive-time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
//                   <select id="test-drive-time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
//                     <option>Morning (9AM - 12PM)</option>
//                     <option>Afternoon (12PM - 4PM)</option>
//                     <option>Evening (4PM - 7PM)</option>
//                   </select>
//                 </div>
//               </div>
//               <button type="button" className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold" onClick={testnotify}>
//                 Schedule Test Drive
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Share2, ChevronLeft, Maximize, Check, CircleAlert, CheckCircle2, Clock, DollarSign, Shield, Truck, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(3.5);
  const [showBreakdown, setShowBreakdown] = useState(false);

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
          location: data.location || 'NA',
          model: data.model || 'NA',
          year: data.year || new Date().getFullYear(),
          price: data.price?.$numberDecimal ? parseFloat(data.price.$numberDecimal) : 0,
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
          vin: data.vin || 'NA',
          owner: data.owner || 'NA',
          certificationReport: data.certificationReport || 'NA',
          extraFeatures: {
            gps: data.extraFeatures?.gps || false,
            sunroof: data.extraFeatures?.sunroof || false,
            leatherSeats: data.extraFeatures?.leatherSeats || false,
            backupCamera: data.extraFeatures?.backupCamera || false,
          }
        };

        setCar(transformedCar);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCarDetails();

    if (id) {
      sessionStorage.setItem('currentListingId', id);
    }
  }, [id]);

  const calculateMonthlyPayment = () => {
    if (!car) return '0';
    const principal = car.price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment.toFixed(2);
  };

  const taxRate = 0.08;
  const registrationFee = 300;

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

  const totalCost = car.price + (car.price * taxRate) + registrationFee;

  const toggleBreakdown = () => {
    setShowBreakdown(!showBreakdown);
  };

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
                <a href="/" className="hover:text-gray-900 dark:hover:text-gray-200">Home</a>
              </li>
              <ChevronRight className="w-4 h-4 mx-1" />
              <li className="inline-flex items-center">
                <a href="/buy" className="hover:text-gray-900 dark:hover:text-gray-200">Buy</a>
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
              <h1 className="text-5xl font-bold text-primary dark:text-gray-100">{car.year} {car.make} {car.model}</h1>
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
                <div
                  className="relative aspect-video rounded-3xl overflow-hidden"
                  style={{ width: 'calc(100% - 100px)', padding: '10px' }}
                >
                  <div className="relative w-full h-full">
                    <img
                      alt="Car image"
                      src={car.images[currentImageIndex]}
                      className="absolute inset-0 w-full h-full object-contain rounded-2xl"
                    />
                    {car.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300"
                        >
                          <ChevronRight className="w-6 h-6" />
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
                <div
                  className="grid grid-cols-4 gap-4"
                  style={{ width: '80%', maxWidth: '600px' }}
                >
                  {car.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-video rounded-xl overflow-hidden transition duration-300 ${index === currentImageIndex
                        ? 'ring-4 ring-primary dark:ring-primary-dark'
                        : 'hover:opacity-75'
                        }`}
                      style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 10px)' }}
                    >
                      <img
                        alt={`Car image ${index + 1}`}
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
                      { label: 'VIN', value: car.vin },
                      { label: 'Condition', value: car.certificationReport },
                      { label: 'Owners', value: car.owner },
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
                  <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Vehicle History</h2>
                  <div className="space-y-6">
                    {[
                      { icon: CircleAlert, title: 'Ownership', description: '1 previous owner (lease vehicle)' },
                      { icon: CheckCircle2, title: 'Accident History', description: 'No accidents or damage reported' },
                      { icon: CheckCircle2, title: 'Service Records', description: 'Regular maintenance up to date' },
                      { icon: Clock, title: 'Last Service', description: '3 months ago' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <item.icon className="w-8 h-8 text-accent dark:text-accent-dark" />
                        <div>
                          <h3 className="font-semibold text-lg dark:text-gray-200">{item.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Condition Summary</h2>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" />
                    <span className="font-semibold text-2xl dark:text-gray-200">Certified Pre-Owned</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                    This vehicle has undergone a rigorous inspection and reconditioning process.
                    It is in excellent condition and comes with an extended warranty.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg font-medium">
                    <li>Regular maintenance up to date</li>
                    <li>No accident history reported</li>
                    <li>New tires installed recently</li>
                    <li>Minor wear on driver's seat (see images)</li>
                    <li>Small paint touch-up on rear bumper</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-3xl p-8">
                  <h2 className="text-3xl font-bold mb-6 text-primary dark:text-gray-100">Pricing</h2>
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-600 rounded-2xl p-6 shadow-md">
                      <p className="text-4xl font-bold text-primary dark:text-gray-100">₹{car.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Starting at ₹{calculateMonthlyPayment()}/month with ₹{downPayment.toLocaleString()} down for {loanTerm} months
                      </p>
                      <button
                        onClick={toggleBreakdown}
                        className="text-lg font-bold text-primary dark:text-primary-dark underline mt-4"
                      >
                        {showBreakdown ? 'Hide Pricing Breakdown' : 'Show Pricing Breakdown'}
                      </button>
                      {showBreakdown && (
                        <div className="mt-4 text-base">
                          <p>
                            <strong>Base Price:</strong> ₹{car.price.toLocaleString()}
                          </p>
                          <p>
                            <strong>Taxes (8%):</strong> ₹{car.price * 0.08}
                          </p>
                          <p>
                            <strong>Registration Fee:</strong> ₹300
                          </p>
                          <p>
                            {/* <strong>Total:</strong> ₹{car.price + car.price * 0.08 + 300} */}
                            <strong>Total:</strong> ₹{totalCost}
                          </p>
                        </div>
                      )}

                    </div>
                    <div className="space-y-4">
                      <Link to={`/payment/${car.id}`} className="block">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white bg-black dark:bg-gray-200 dark:text-gray-800 hover:bg-primary/90 dark:hover:bg-gray-300 h-10 px-4 py-2 w-full btn-primary">
                          <DollarSign className="w-5 h-5 mr-2" />
                          Proceed to Payment
                        </button>
                      </Link>
                      <Link to="/contactUs" className="block">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background dark:bg-gray-700 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-600 h-10 px-4 py-2 w-full btn-secondary">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-600 space-y-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <Shield className="w-5 h-5 text-secondary dark:text-secondary-dark" />
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <Truck className="w-5 h-5 text-secondary dark:text-secondary-dark" />
                        <span>Free delivery within 50km</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">Schedule a Test Drive</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Preferred Date
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background dark:bg-gray-600 dark:text-gray-100 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="date"
                          type="date"
                          name="date"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Preferred Time
                        </label>
                        <select
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background dark:bg-gray-600 dark:text-gray-100 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="time"
                          name="time"
                        >
                          <option value="">Select a time slot</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 3PM)</option>
                          <option value="evening">Evening (3PM - 6PM)</option>
                        </select>
                      </div>
                    </div>
                    <input type='text' className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background dark:bg-gray-600 dark:text-gray-100 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder='Enter your location' required />
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white dark:bg-white dark:text-primary-foreground-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90 h-10 px-4 py-2 w-full"
                      type="submit" >
                      Schedule Test Drive
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* <div>
              <h2 className="text-3xl font-bold mb-8 text-primary dark:text-gray-100">Similar Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: '2022 Toyota Corolla', price: '₹23,000', mileage: 18000, transmission: 'Automatic' },
                  { name: '2022 Mazda 3', price: '₹24,000', mileage: 16500, transmission: 'Manual' },
                  { name: '2022 Hyundai Elantra', price: '₹22,000', mileage: 20000, transmission: 'Automatic' },
                ].map((similarCar, index) => (
                  <a key={index}
                    href={`/car/${index + 1}`}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >
                    <div className="relative aspect-video">
                      <img
                        alt={similarCar.name}
                        src={`/placeholder.svg?height=200&width=300&text=${similarCar.name.replace(/\s+/g, '+')}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-2 dark:text-gray-100">{similarCar.name}</h3>
                      <div className="space-y-1">
                        <p className="text-primary dark:text-primary-dark font-bold text-lg">{similarCar.price}</p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span>{similarCar.mileage.toLocaleString()} miles</span>
                          <span className="mx-2">•</span>
                          <span>{similarCar.transmission}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}