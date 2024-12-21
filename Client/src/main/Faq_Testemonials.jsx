import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDownIcon } from 'lucide-react';

function Faq_Testimonials() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const faqs = [
        { q: "How do I buy a car?", a: "Browse our listings, select a car, and follow the purchase process. We'll guide you through every step." },
        { q: "Can I rent a car?", a: "Yes, we offer flexible rental options for various car models. Check our rental listings for availability." },
        { q: "How do I sell my car?", a: "List your car on our platform by providing details and photos. We'll connect you with potential buyers." },
        { q: "Is there a warranty?", a: "We offer warranties on eligible vehicles. Check individual listings for warranty details." },
        { q: "Can I test drive before buying?", a: "You can schedule a test drive for any car you're interested in purchasing." },
        { q: "What payment methods are accepted?", a: "We accept various payment methods including credit cards, bank transfers, and financing options." },
    ];

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const testimonials = [
        { name: "John D.", text: "Great experience! Found my dream car at an affordable price." },
        { name: "Sarah M.", text: "The rental process was smooth and hassle-free. Highly recommend!" },
        { name: "Mike T.", text: "Sold my car quickly and got a fair price. Excellent service!" },
        { name: "Emily R.", text: "The customer service was outstanding. They really went above and beyond." },
        { name: "David L.", text: "I was impressed by the wide selection of vehicles. Found exactly what I needed." },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div>
            <section className="py-20 bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">Customer Testimonials</h2>
                    <div className="flex items-center justify-center">
                        <button
                            className="mr-4 border border-gray-300 dark:border-gray-600 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={prevTestimonial}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </button>
                        <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl">
                            {[0, 1, 2].map((offset) => {
                                const index = (currentIndex + offset) % testimonials.length
                                const testimonial = testimonials[index]
                                return (
                                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                        <p className="italic mb-4 text-gray-600 dark:text-gray-300">"{testimonial.text}"</p>
                                        <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <button
                            className="ml-4 border border-gray-300 dark:border-gray-600 rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={nextTestimonial}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-800" id="faqs">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                    <div className="space-y-6 w-full max-w-3xl mx-auto">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden transition duration-300 ease-in-out">
                                <button
                                    onClick={() => toggleExpand(i)}
                                    className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                                >
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{faq.q}</h3>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedIndex === i ? 'transform rotate-180' : ''}`}
                                    />
                                </button>
                                <div 
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                        expandedIndex === i ? 'max-h-40 pb-6' : 'max-h-0'
                                    }`}
                                >
                                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Faq_Testimonials;

