import { useState, useEffect } from 'react';
import { Globe, MapPin, Menu, Moon, Sun, X } from "lucide-react";
import { Link } from 'react-router-dom';

function Navbar() {
    const [language, setLanguage] = useState("EN");
    const [location, setLocation] = useState("IN");
    const [theme, setTheme] = useState("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`flex flex-col ${theme}`}>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="/" className="flex-shrink-0">
                                <div className="w-8 h-8 bg-primary rounded-full"></div>
                            </a>
                            <a href="/" className="ml-2 font-bold text-xl">CarConnect</a>
                            {/* <div className="flex space-x-4">
                                <input type="text" placeholder="Search cars..." className="w-40 lg:w-60 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700" />
                            </div> */}
                        </div>
                        <div>
                            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-muted">
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sliding Menu */}
            <div
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ width: '70%', zIndex: 100 }} // Set width to 70% of the screen
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/" className="block px-3 py-2 rounded-md hover:bg-muted text-center">Home</Link>
                    <a href="#services" className="block px-3 py-2 rounded-md hover:bg-muted text-center">Services</a>
                    <Link to="/AboutUs" className="block px-3 py-2 rounded-md hover:bg-muted text-center">About Us</Link>
                    <Link to="/ContactUs" className="block px-3 py-2 rounded-md hover:bg-muted text-center">Contact Us</Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800 items-center">
                    <div className="flex items-center px-5">
                        <button className="p-2 rounded-full hover:bg-muted">
                            <Globe className="h-5 w-5" />
                        </button>
                        <button className="ml-3 px-3 py-2 rounded-md hover:bg-muted">{location}</button>
                        <button className="ml-3 p-2 rounded-full hover:bg-muted" onClick={toggleTheme}>
                            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Link to="/Login">
                            <button className="w-full mt-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-muted">Sign In</button>
                        </Link>
                        <Link to="/Signup">
                            <button className="w-full mt-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900">Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
