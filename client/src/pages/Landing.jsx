import React, { useState } from "react";
import { CheckCircleIcon, ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const features = [
  { title: "AI-Powered Invoice Generation", description: "Create professional invoices instantly with smart automation." },
  { title: "Customizable Templates", description: "Choose from sleek, professional designs tailored to your brand." },
  { title: "Client Editing Interface", description: "Easily edit and manage client details in real-time." },
  { title: "Instant Preview & Send", description: "Preview your invoice and send it directly to clients." },
  { title: "No Signup Needed", description: "Get started immediately without any account setup." },
  { title: "Secure & Fast Delivery", description: "Ensure safe and rapid delivery of invoices to your clients." },
];

const testimonials = [
  {
    name: "Jane D.",
    role: "Freelance Designer",
    quote: "QuickBill saved me hours every week. Invoices are ready in seconds, and my clients love the clean format.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike A.",
    role: "Startup Founder",
    quote: "We automated all our contractor invoices using QuickBill. It's fast, easy, and beautifully simple.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-inter text-gray-900 bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">QuickBill</h1>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-indigo-600 transition">Home</a>
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition">Testimonials</a>
            <a href="#start" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Get Started</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <a href="#home" className="block px-6 py-3 text-gray-600 hover:bg-indigo-50">Home</a>
            <a href="#features" className="block px-6 py-3 text-gray-600 hover:bg-indigo-50">Features</a>
            <a href="#testimonials" className="block px-6 py-3 text-gray-600 hover:bg-indigo-50">Testimonials</a>
            <a href="#start" className="block px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 text-white pt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-fade-in-up">QuickBill</h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
          Generate and send professional invoices in seconds with AI-powered simplicity. Fill, edit, preview, and send effortlessly.
        </p>
        <a
          href="#start"
          className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Get Started
          <ArrowRightIcon className="w-5 h-5" />
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Why Choose QuickBill?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <CheckCircleIcon className="text-green-500 w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map(({ name, role, quote, image }, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <img src={image} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                <p className="text-lg italic text-gray-600 mb-4">"{quote}"</p>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="start" className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Invoicing Smarter Today</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Experience the easiest way to create and send invoices. No account needed, just results.
        </p>
        <a
          href="/app"
          className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Launch App Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} QuickBill. Built with ❤️ by Opera for freelancers & small teams.</p>
        <div className="mt-4 space-x-4">
          <a href="#privacy" className="hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#terms" className="hover:text-indigo-600 transition">Terms of Service</a>
          <a href="#contact" className="hover:text-indigo-600 transition">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;