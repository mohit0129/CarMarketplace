import { useState } from 'react';
import TermsAndConditions from '../legal/terms&conditions';
import PrivacyPolicy from '../legal/privacy policy';
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from 'react-router-dom';

function Footers() {
    const openTerms = () => setIsTermsOpen(true);
    const closeTerms = () => setIsTermsOpen(false);

    const openPrivacy = () => setIsPrivacyOpen(true);
    const closePrivacy = () => setIsPrivacyOpen(false);

    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const Thanks = (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Subscribe button clicked!"); // Debugging line
        alert("Thank you for subscribing to us!");
    };

    return (
        <>
            <section className="up_down get_started">
                <div className="container get_text">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="ready_started_text">Ready to Get Started?</h2>
                        <h4>Join thousands of satisfied customers and find your perfect ride today.</h4>
                        <div className="button_group10">
                            <Link to="/Signup">
                                <button className="sign_up">Sign Up Now</button>
                            </Link>
                            <Link to="../AboutUs">
                                <button className="learn_more">Learn More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer_cont">
                    <div className="links_horiz">
                        <div>
                            <h3 className="ql_headings">About Us</h3>
                            <ul className="ql_space">
                                <li><a href="../ComingSoon" className="quick_links">Our Story</a></li>
                                <li><a href="../ComingSoon" className="quick_links">Team</a></li>
                                <li><a href="../ComingSoon" className="quick_links">Careers</a></li>
                                <li><a href="../ComingSoon" className="quick_links">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="ql_headings">Services</h3>
                            <ul className="ql_space">
                                <li><a href="../BuyCar" className="quick_links">Buy a Car</a></li>
                                <li><a href="../CarRental" className="quick_links">Rent a Car</a></li>
                                <li><a href="../SellCar" className="quick_links">Sell Your Car</a></li>
                                <li><a href="../ComingSoon" className="quick_links">Car Financing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="ql_headings">Support</h3>
                            <ul className="ql_space">
                                <li><a href="#faqs" className="quick_links">FAQs</a></li>
                                <li><a href="../ContactUs" className="quick_links">Contact Us</a></li>
                                <li>
                                    <a href="#" onClick={(e) => { e.preventDefault(); openPrivacy(); }} className="quick_links">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => { e.preventDefault(); openTerms(); }} className="quick_links">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                            <TermsAndConditions isOpen={isTermsOpen} onClose={closeTerms} />
                            <PrivacyPolicy isOpen={isPrivacyOpen} onClose={closePrivacy} />
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
                            <p className="mb-1">Stay updated with our latest offers and news</p>
                            <form className="mt-2 sm:mt-0 sm:ml-2 flex flex-col sm:flex-row" onSubmit={Thanks}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="py-2 px-3 flex-grow rounded-md text-white bg-gray-700 mb-2 sm:mb-0 sm:mr-2"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="py-2 px-4 rounded-md text-black bg-gray-200 hover:bg-white"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="copy_right">
                        <p>&copy; 2023 CarConnect. All rights reserved.</p>
                        <div className="social">
                            <a href="https://facebook.com" aria-label="Facebook" className="quick_links">
                                <Facebook className="icons" />
                            </a>
                            <a href="https://x.com" aria-label="X" className="quick_links">
                                <Twitter className="icons" />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" className="quick_links">
                                <Instagram className="icons" />
                            </a>
                            <a href="https://youtube.com" aria-label="YouTube" className="quick_links">
                                <Youtube className="icons" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footers;