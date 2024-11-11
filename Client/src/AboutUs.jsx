import { Car, Shield, Cpu, Calendar, Users, DollarSign, Lock, Leaf } from "lucide-react"

function AboutUs() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="container mx-auto px-4 py-8 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to CarConnect – your premier platform for second-hand vehicle purchases and rentals, trusted by customers and industry experts alike.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p>
            At CarConnect, we specialize in providing a seamless, industry-standard experience for buying, selling, and renting pre-owned vehicles. As a leader in automotive e-commerce, our platform connects buyers and renters with high-quality, certified vehicles through cutting-edge technology, extensive listings, and customer-centric service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            To redefine automotive access by combining trust, quality, and technology. We aim to make vehicle ownership and rentals accessible and hassle-free, empowering individuals and businesses to find the right car, van, or SUV for their unique needs.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Rigorous Vehicle Inspections</h3>
                <p className="text-muted-foreground">Each car undergoes a comprehensive multi-point inspection to meet strict quality and safety standards, ensuring peace of mind for all buyers and renters.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Cpu className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Advanced Technology Platform</h3>
                <p className="text-muted-foreground">Our robust, AI-powered platform offers tailored recommendations, secure transactions, and data-driven insights, making it easy for users to find vehicles that match their preferences and budgets.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Calendar className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Flexible Rental Solutions</h3>
                <p className="text-muted-foreground">From daily to long-term rentals, we offer versatile rental plans for personal or commercial use, all with transparent terms and competitive pricing.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">End-to-End Support</h3>
                <p className="text-muted-foreground">Our experienced team supports you every step of the way—from browsing to finalizing your purchase or rental, and beyond.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Why Choose CarConnect?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Certified and Trusted</h3>
                <p className="text-muted-foreground">Our vehicles are certified and trusted by experts, ensuring a reliable and industry-approved buying and renting experience.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <DollarSign className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Competitive Pricing & Transparency</h3>
                <p className="text-muted-foreground">We prioritize transparent pricing models and value assessments, empowering you to make confident, informed decisions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Lock className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Innovative & Secure Platform</h3>
                <p className="text-muted-foreground">With user-friendly interfaces, secure payment gateways, and optimized search features, our platform is designed for convenience and reliability at every stage.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Leaf className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">Environmental Responsibility</h3>
                <p className="text-muted-foreground">We are committed to promoting sustainable automotive practices by facilitating vehicle reuse and reducing carbon footprints through our second-hand marketplace.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Join Us in Driving the Future</h2>
          <p>
            Whether you're looking for your next car or an affordable rental solution, CarConnect combines industry-level standards with the latest technology to meet your automotive needs. Join thousands of satisfied users who trust us for quality, reliability, and a modern approach to vehicle access.
          </p>
          <div className="flex justify-center">
            <Car className="w-12 h-12 text-primary" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutUs;