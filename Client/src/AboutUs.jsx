import { Car, Shield, Cpu, Calendar, Users, DollarSign, Lock, Leaf } from "lucide-react"

function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">About Us</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Welcome to CarConnect – your premier platform for second-hand vehicle purchases and rentals, trusted by customers and industry experts alike.
          </p>
          <div className="pt-4">
            <Car className="w-16 h-16 mx-auto text-black opacity-80" />
          </div>
        </header>

        {/* Who We Are & Mission */}
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              At CarConnect, we specialize in providing a seamless, industry-standard experience for buying, selling, and renting pre-owned vehicles. As a leader in automotive e-commerce, our platform connects buyers and renters with high-quality, certified vehicles through cutting-edge technology, extensive listings, and customer-centric service.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To redefine automotive access by combining trust, quality, and technology. We aim to make vehicle ownership and rentals accessible and hassle-free, empowering individuals and businesses to find the right car, van, or SUV for their unique needs.
            </p>
          </section>
        </div>

        {/* What We Offer */}
        <section className="space-y-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Rigorous Vehicle Inspections</h3>
                  <p className="text-gray-600 leading-relaxed">Each car undergoes a comprehensive multi-point inspection to meet strict quality and safety standards, ensuring peace of mind for all buyers and renters.</p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <Cpu className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Advanced Technology Platform</h3>
                  <p className="text-gray-600 leading-relaxed">Our robust, AI-powered platform offers tailored recommendations, secure transactions, and data-driven insights, making it easy for users to find vehicles that match their preferences and budgets.</p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Flexible Rental Solutions</h3>
                  <p className="text-gray-600 leading-relaxed">From daily to long-term rentals, we offer versatile rental plans for personal or commercial use, all with transparent terms and competitive pricing.</p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">End-to-End Support</h3>
                  <p className="text-gray-600 leading-relaxed">Our experienced team supports you every step of the way—from browsing to finalizing your purchase or rental, and beyond.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose CarConnect */}
        <section className="space-y-12 max-w-6xl mx-auto bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-semibold text-center">Why Choose CarConnect?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-white">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Certified and Trusted</h3>
                  <p className="text-gray-600 leading-relaxed">Our vehicles are certified and trusted by experts, ensuring a reliable and industry-approved buying and renting experience.</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-white">
                  <DollarSign className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Competitive Pricing & Transparency</h3>
                  <p className="text-gray-600 leading-relaxed">We prioritize transparent pricing models and value assessments, empowering you to make confident, informed decisions.</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-white">
                  <Lock className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Innovative & Secure Platform</h3>
                  <p className="text-gray-600 leading-relaxed">With user-friendly interfaces, secure payment gateways, and optimized search features, our platform is designed for convenience and reliability at every stage.</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-white">
                  <Leaf className="w-6 h-6 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Environmental Responsibility</h3>
                  <p className="text-gray-600 leading-relaxed">We are committed to promoting sustainable automotive practices by facilitating vehicle reuse and reducing carbon footprints through our second-hand marketplace.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold">Join Us in Driving the Future</h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you're looking for your next car or an affordable rental solution, CarConnect combines industry-level standards with the latest technology to meet your automotive needs. Join thousands of satisfied users who trust us for quality, reliability, and a modern approach to vehicle access.
          </p>
          <div className="pt-4">
            <Car className="w-12 h-12 mx-auto text-black animate-pulse" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutUs