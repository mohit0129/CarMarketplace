// 'use client'

// import React, { useEffect } from "react"
// import UserAuth from './UserAuth'
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
// import { Clock, Key, LogOut, User } from 'lucide-react'

// function Dashboard() {
//   const [name, setName] = React.useState("")
//   const [greeting, setGreeting] = React.useState("")
//   const [lastLogin, setLastLogin] = React.useState("")

//   function logout() {
//     localStorage.clear()
//     window.location = 'Login'
//   }

//   // Function to convert string to title case
//   function toTitleCase(str) {
//     return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
//   }

//   // Format date to a readable string
//   const formatDate = (dateString) => {
//     if (!dateString) return ''
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date)
//   }

//   // Get greeting based on time of day
//   const getGreeting = () => {
//     const hour = new Date().getHours()
//     if (hour < 12) return "Good Morning"
//     if (hour < 18) return "Good Afternoon"
//     return "Good Evening"
//   }

//   // Set the name, greeting, and last login on component mount
//   useEffect(() => {
//     const storedName = localStorage.getItem("name")
//     const storedLastLogin = localStorage.getItem("lastLogin")

//     if (storedName) {
//       const formattedName = toTitleCase(storedName)
//       setName(formattedName)
//     }

//     // Set last login if available
//     if (storedLastLogin) {
//       const formattedDate = formatDate(storedLastLogin)
//       setLastLogin(formattedDate)
//     }

//     setGreeting(getGreeting())

//     // Update greeting every minute
//     const interval = setInterval(() => {
//       setGreeting(getGreeting())
//     }, 60000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
//           <div className="p-8 space-y-8">
//             {/* Header Section */}
//             <div className="text-center space-y-2">
//               <div className="inline-block p-3 rounded-full bg-gray-50 mb-4">
//                 <Clock className="w-6 h-6 text-gray-700" />
//               </div>
//               <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
//                 {greeting}
//               </h1>
//               <p className="text-xl text-gray-600">
//                 Welcome back, <span className="font-medium">{name}</span>
//               </p>
//               {lastLogin && (
//                 <div className="mt-2 px-4 py-2 bg-gray-50 rounded-lg">
//                   <p className="text-sm text-gray-500">
//                     Last login: <span className="font-medium text-gray-700">{lastLogin}</span>
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Quick Actions */}
//             <div className="grid gap-4">
//               <Link
//                 to="/Profile"
//                 className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-lg bg-gray-200">
//                     <User className="w-5 h-5 text-gray-700" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900">Your Profile</h3>
//                     <p className="text-sm text-gray-500">View and edit your information</p>
//                   </div>
//                 </div>
//                 <div className="text-gray-400 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                   →
//                 </div>
//               </Link>

//               <Link
//                 to="/ChangePassword"
//                 className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-lg bg-gray-200">
//                     <Key className="w-5 h-5 text-gray-700" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900">Change Password</h3>
//                     <p className="text-sm text-gray-500">Update your security settings</p>
//                   </div>
//                 </div>
//                 <div className="text-gray-400 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                   →
//                 </div>
//               </Link>
//             </div>

//             {/* Logout Button */}
//             <div className="pt-4">
//               <button
//                 onClick={logout}
//                 type="button"
//                 className="w-full group relative flex items-center justify-center gap-2 p-4 rounded-xl bg-black text-white hover:bg-gray-900 transition-all duration-300"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Logout</span>
//                 <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   →
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Time Display */}
//         <div className="mt-6 text-center">
//           <div className="text-gray-500 text-sm">
//             {new Date().toLocaleDateString('en-US', { 
//               weekday: 'long', 
//               year: 'numeric', 
//               month: 'long', 
//               day: 'numeric' 
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserAuth(Dashboard)

import React, { useEffect, useState } from "react";
import UserAuth from "./UserAuth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Clock, Key, LogOut, User, Calendar, X } from "lucide-react";
import API_BASE_URL from '../config/apiConfig';
import { toast } from 'react-toastify';

function Dashboard() {
  const [name, setName] = React.useState("");
  const [greeting, setGreeting] = React.useState("");
  const [lastLogin, setLastLogin] = React.useState("");
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function logout() {
    localStorage.clear();
    window.location = "login";
    alert("You have been logged out!")
  }

  function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("id");
      const response = await fetch(
        `${API_BASE_URL}/api/uid/booking?user_id=${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();

      const transformedBookings = data.map((booking) => ({
        ...booking,
        total_price: booking.total_price?.$numberDecimal || booking.total_price,
        paid_price: booking.paid_price?.$numberDecimal || booking.paid_price,
        payment: booking.payment
          ? {
            ...booking.payment,
            amount: booking.payment.amount?.$numberDecimal || booking.payment.amount,
          }
          : null,
      }));
      setBookings(transformedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedLastLogin = localStorage.getItem("lastLogin");

    if (storedName) {
      const formattedName = toTitleCase(storedName);
      setName(formattedName);
    }

    if (storedLastLogin) {
      const formattedDate = formatDate(storedLastLogin);
      setLastLogin(formattedDate);
    }

    setGreeting(getGreeting());

    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-2">
              <div className="inline-block p-3 rounded-full bg-gray-50 mb-4">
                <Clock className="w-6 h-6 text-gray-700" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {greeting}
              </h1>
              <p className="text-xl text-gray-600">
                Welcome back, <span className="font-medium">{name}</span>
              </p>
              {lastLogin && (
                <div className="mt-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    Last login: <span className="font-medium text-gray-700">{lastLogin}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4">
              <Link
                to="/Profile"
                className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-200">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Your Profile</h3>
                    <p className="text-sm text-gray-500">View and edit your information</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/ChangePassword"
                className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-200">
                    <Key className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your security settings</p>
                  </div>
                </div>
              </Link>

              {/* Booking Details Button */}
              <button
                onClick={() => {
                  if (!showBookings) {
                    fetchBookings();
                  }
                  setShowBookings(!showBookings);
                }}
                className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-gray-200">
                    <Calendar className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Show Booking Details</h3>
                    <p className="text-sm text-gray-500">View your bookings and payments</p>
                  </div>
                </div>
              </button>
            </div>
            <div className="pt-4">
              <button
                onClick={logout}
                type="button"
                className="w-full group relative flex items-center justify-center gap-2 p-4 rounded-xl bg-black text-white hover:bg-gray-900 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
                <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

        </div>
        {/* Time Display */}
        <div className="mt-6 text-center">
          <div className="text-gray-500 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
        {/* Booking Details Modal */}
        {showBookings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <button onClick={() => setShowBookings(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {isLoading ? (
                <p className="text-center text-gray-600">Loading bookings...</p>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900">Booking #{booking.booking_id}</p>
                        <p className="text-gray-900">Transaction ID {booking.transaction_id}</p>
                        <p className="text-sm text-gray-600">Date: {formatDate(booking.booking_start_date)}</p>
                        <p className="text-sm text-gray-600">Booking Status: {booking.payment_status}</p>
                        <p className="text-sm text-gray-600">Payment Status: {booking.booking_status}</p>
                        <p className="text-sm text-gray-600">Total Amount: {booking.total_price}</p>
                        <p className="text-sm text-gray-600">Paid Amount: {booking.paid_price}</p>
                        {booking.payment && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">Payment Details</p>
                            <p className="text-sm text-gray-600">Amount: ${booking.payment.amount}</p>
                            <p className="text-sm text-gray-600">Status: {booking.payment.status}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No bookings found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAuth(Dashboard);
