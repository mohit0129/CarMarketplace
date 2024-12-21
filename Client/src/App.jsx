import React, { useState, useEffect } from 'react';
import Home from './main/Home';
import Login from "./auth/Login";
import Dashboard from "./auth/Dashboard";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ChangePassword from "./auth/ChangePassword";
import Profile from "./auth/Profile";
import AboutUs from "./AboutUs";
import ContactUs from './ContactUs';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Error from './main/Error';
import Navbar from './main/Navbar';
import Loader from './main/Loader';
import CarExplore from './pages/CarExplore';
import BuyCarDetails from './pages/BuyCarDetails';
import RentCarDetails from './pages/RentCarDetails';
import SellCar from './pages/SellCar';
import Payment from './pages/Payment';
import ComingSoon from './ComingSoon';
import AdminDashboard from './admin/AdminDashboard';
import BookingManagement from './admin/BookingManagement';
import CarManagement from './admin/CarManagement';
import PaymentManagement from './admin/PaymentManagement';
import UserManagement from './admin/UserManagement';
import AdminLogin from './admin/AdminLogin';
import ReportDesign from './admin/ReportDesign';
import './ScrollToTopButton.css';
import { ArrowBigUpDash } from 'lucide-react';
// Import React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS



function App() {
    const [loading, setLoading] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false); // State for button visibility

    const ConditionalNavbar = () => {
        const location = useLocation();

        // List of routes where Navbar should not be displayed
        const noNavbarRoutes = [
            '/AdminDashboard',
            '/CarManagement',
            '/BookingManagement',
            '/PaymentManagement',
            '/UserManagement',
            '/AdminLogin',
            '/ReportDesign',
            '/login',
            '/Signup',
            '/Error',
        ];

        return !noNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
    };


    useEffect(() => {
        const initialLoadTimeout = setTimeout(() => {
            setLoading(false);
        }, 2500);

        // Detect scroll to show/hide the button
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            setShowScrollToTop(scrollPosition > windowHeight * 0.4); // Show button after 40% scroll
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(initialLoadTimeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function with animation
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Router>
                {loading && <Loader />}
                <ConditionalNavbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/ChangePassword" element={<ChangePassword />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                    <Route path="/CarExplore" element={<CarExplore />} />
                    <Route path="/BuyCarDetails" element={<BuyCarDetails />} />
                    <Route path="/RentCarDetails" element={<RentCarDetails />} />
                    <Route path="/SellCar" element={<SellCar />} />
                    <Route path="/ComingSoon" element={<ComingSoon />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/CarManagement" element={<CarManagement />} />
                    <Route path="/BookingManagement" element={<BookingManagement />} />
                    <Route path="/PaymentManagement" element={<PaymentManagement />} />
                    <Route path="/UserManagement" element={<UserManagement />} />
                    <Route path="/AdminLogin" element={<AdminLogin />} />
                    <Route path="/ReportDesign" element={<ReportDesign />} />
                    <Route path="/*" element={<Error />} />
                    <Route path="/buy-car/:id" element={<BuyCarDetails />} />
                    <Route path="/buy-car-details/:id" element={<BuyCarDetails />} />
                    <Route path="/rent-car/:id" element={<RentCarDetails />} />
                    <Route path="/payment/:id" element={<Payment />} />
                </Routes>
            </Router>

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <ArrowBigUpDash />
                </div>
            )}
        </>
    );
}

export default App;