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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from './main/Error';
import Navbar from './main/Navbar';
import Loader from './main/Loader'; 
import BuyCar from './pages/BuyCar';
import BuyCarDetails from './pages/BuyCarDetails';
import CarRental from './pages/CarRental';
import RentCarDetails from './pages/RentCarDetails';
import SellCar from './pages/SellCar';
import ComingSoon from './ComingSoon';
import './ScrollToTopButton.css';
import {ArrowBigUpDash} from 'lucide-react';

function App() {
    const [loading, setLoading] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false); // State for button visibility

    useEffect(() => {
        const initialLoadTimeout = setTimeout(() => {
            setLoading(false);
        }, 4000);

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
            <Router>
                {loading && <Loader />}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/ChangePassword" element={<ChangePassword />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                    <Route path="/BuyCar" element={<BuyCar />} />
                    <Route path="/BuyCarDetails" element={<BuyCarDetails />} />
                    <Route path="/CarRental" element={<CarRental />} />
                    <Route path="/RentCarDetails" element={<RentCarDetails />} />
                    <Route path="/SellCar" element={<SellCar />} />
                    <Route path="/ComingSoon" element={<ComingSoon />} />
                    <Route path="/*" element={<Error />} />
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
