import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import './LogoScroller.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footers from './Footers';
import Faq_Testimonials from "./Faq_Testemonials";
import FeaturedListings from "./FeaturedListings";

export default function ResponsiveCarMarketplaceLandingPage() {

  // const carBrands = [
  //   "BMW", "Mercedes", "Audi", "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen", "Nissan", "Hyundai"
  // ]
  const scrollerRef = useRef(null);

  const importAll = (requireContext) => requireContext.keys().map(requireContext);
  const images = importAll(require.context('./logos', false, /\.(png|jpe?g|svg)$/));

  useEffect(() => {
    const addAnimation = () => {
      if (scrollerRef.current) {
        scrollerRef.current.dataset.animated = true;

        const scrollerInner = scrollerRef.current.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }
  }, []);



  return (
    <div className={`flex flex-col min-h-screen`}>
      <main className="flex-1">
        <section className="banner" >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Drive Your Dream Car
              </h1>
              <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300">
                Affordable Rides, Just a Click Away. Buy, Rent, or Sell Your Car with Ease.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <Link to="/BuyCar">
                  <button className="px-8 py-3 rounded-md bg-gray text-black bg-white text-lg font-semibold">
                    Browse Cars
                  </button>
                </Link>
                <Link to="../AboutUs">
                  <button className="px-8 py-3 rounded-md border border-white text-white hover:bg-white hover:text-gray-900 text-lg font-semibold">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-transparent"></div>
        </section>

        <section className="logo_scroller">
          <div className="scroller" ref={scrollerRef}>
            <ul className="tag-list scroller__inner">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Logo ${index + 1}`} />
              ))}
            </ul>
          </div>
        </section>

        <section className="up_down">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" id="services" >Our Services</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Buy", description: "Find your perfect car from our wide selection of quality vehicles." },
                { title: "Rent", description: "Flexible rental options for any duration, from a day to months." },
                { title: "Sell", description: "Get the best value for your car with our hassle-free selling process." }
              ].map((service, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="up_down odd_bg dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Browse", description: "Explore our wide selection of cars" },
                { title: "Choose", description: "Select the perfect car for your needs" },
                { title: "Drive", description: "Enjoy your new ride with confidence" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-black text-white w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedListings />

        <section className="up_down odd_bg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Wide selection of quality vehicles",
                "Competitive pricing and financing options",
                "Transparent and hassle-free process",
                "Expert customer support",
                "Flexible rental terms",
                "Secure online transactions",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <ChevronRight className="text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="up_down bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Market Insights</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Average Car Age", value: "6.5 years" },
                { title: "Most Popular Brand", value: "Toyota" },
                { title: "Avg. Rental Duration", value: "4 days" },
                { title: "Electric Car Sales", value: "+25% YoY" },
                { title: "Used Car Market Size", value: "$828 Billion" },
                { title: "Online Car Sales", value: "12% of Total" },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{stat.title}</h3>
                  <p className="text-3xl font-bold text-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Faq_Testimonials />

      </main>
      <Footers />
    </div>
  )
}
