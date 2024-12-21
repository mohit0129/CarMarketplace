import { useState, useEffect } from 'react';
import { Globe, Menu, Moon, Sun, X, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import ccLogo from './cc.jpg';
import User from './User';

function Navbar() {
    const [language, setLanguage] = useState("EN");
    const [location, setLocation] = useState("IN");
    const [theme, setTheme] = useState("light");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for user ID in localStorage
        const userId = localStorage.getItem('id');
        setIsAuthenticated(!!userId); // Set authentication status based on the presence of user ID
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                    <span className="text-white font-bold text-xl"><img src={ccLogo} alt="CC logo" /></span>
                                </div>
                                <span className="font-bold text-xl text-gray-900 dark:text-white transition-colors duration-300">CarConnect</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                            >
                                {theme === "light" ? 
                                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" /> :
                                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                }
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? 
                                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" /> :
                                    <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                }
                            </button>

                            {/* Conditionally render the User component */}
                            {isAuthenticated && <User />}
                        </div>
                    </div>
                </div>
            </header>

            {/* Sliding Menu */}
            <div
                className={`fixed top-0 right-0 w-full sm:w-80 h-full bg-white dark:bg-gray-900 shadow-lg transition-transform transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ zIndex: 100 }}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl"><img src={ccLogo} alt="CC logo" /></span>
                        </div>
                        <span className="font-bold text-xl text-gray-900 dark:text-white">CarConnect</span>
                    </Link>
                    <button
                        onClick={closeMenu}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                <nav className="px-4 pt-6 pb-6 space-y-2">
                    {[{ to: "/", label: "Home" }, { to: "/#services", label: "Services" }, { to: "/AboutUs", label: "About Us" }, { to: "/ContactUs", label: "Contact Us" }, { to: "/Dashboard", label: "Dashboard" }, { to: "/CarExplore", label: "Explore Cars" }, { to: "/SellCar", label: "Sell Car" }].map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className="block py-2 px-4 rounded-lg text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                            onClick={closeMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                            <Globe className="h-5 w-5" />
                            <span>{language}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                            <span>{location}</span>
                        </button>
                    </div>
                    {!isAuthenticated && (
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/Login" className="w-full">
                                <button className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 font-medium">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/Signup" className="w-full">
                                <button className="w-full py-2 px-4 rounded-lg bg-black text-white hover:bg-gray-700 transition-colors duration-300 font-medium">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
