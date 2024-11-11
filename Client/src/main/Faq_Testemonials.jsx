import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDownIcon } from "lucide-react";

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
            <section className="up_down odd_bg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Customer Testimonials</h2>
                    <div className="flex items-center justify-center">
                        <button
                            className="mr-4 border border-gray-300 rounded p-2"
                            onClick={prevTestimonial}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl">
                            {[0, 1, 2].map((offset) => {
                                const index = (currentIndex + offset) % testimonials.length
                                const testimonial = testimonials[index]
                                return (
                                    <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                                        <p className="italic mb-4 text-muted-foreground">"{testimonial.text}"</p>
                                        <p className="font-bold text-foreground">{testimonial.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <button
                            className="ml-4 border border-gray-300 rounded p-2"
                            onClick={nextTestimonial}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>

            <section className="up_down" id="faqs">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="faq">Frequently Asked Questions</h2>
                    <div className="space-y-4 w-full">
                        {faqs.map((faq, i) => (
                            <div key={i} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <button
                                    onClick={() => toggleExpand(i)}
                                    className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                                >
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{faq.q}</h3>
                                    <ChevronDownIcon
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedIndex === i ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {expandedIndex === i && (
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-600 dark:text-gray-300 font-bold">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Faq_Testimonials;