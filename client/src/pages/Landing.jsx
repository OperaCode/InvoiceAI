import React, { useState } from "react";
import {
  CheckCircleIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

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
    quote: "InvoiceAI saved me hours every week. Invoices are ready in seconds, and my clients love the clean format.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike A.",
    role: "Startup Founder",
    quote: "We automated all our contractor invoices using InvoiceAI. It's fast, easy, and beautifully simple.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-inter text-gray-900 bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400">
            InvoiceAI
          </h1>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-cyan-500 transition">Home</a>
            <a href="#features" className="text-gray-700 hover:text-cyan-500 transition">Features</a>
            <a href="#testimonials" className="text-gray-700 hover:text-cyan-500 transition">Testimonials</a>
            <a href="/home" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Get Started</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <a href="#home" className="block px-6 py-3 text-gray-700 hover:bg-cyan-50">Home</a>
            <a href="#features" className="block px-6 py-3 text-gray-700 hover:bg-cyan-50">Features</a>
            <a href="#testimonials" className="block px-6 py-3 text-gray-700 hover:bg-cyan-50">Testimonials</a>
            <a href="#start" className="block px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-indigo-600">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-cyan-500 text-white pt-24"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Invoice Smarter with AI
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 leading-relaxed text-white/90">
          InvoiceAI empowers freelancers & startups with AI-generated, ready-to-send invoices — no signup, no hassle.
        </p>
        <a
          href="/home"
          className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-indigo-100 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
        >
          Get Started Free
          <ArrowRightIcon className="w-5 h-5" />
        </a>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-14 text-gray-900">AI Features Built for Speed</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-indigo-100"
              >
                <CheckCircleIcon className="text-cyan-500 w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-14 text-gray-900">Voices from Our Users</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {testimonials.map(({ name, role, quote, image }, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-100 via-white to-gray-100 rounded-2xl p-8 shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img src={image} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-lg italic text-gray-600 mb-4">"{quote}"</p>
                <p className="font-semibold text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="py-24 px-6 bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Smarter Invoicing Starts Now</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Launch your invoice in under a minute. No registration. Just AI magic.
        </p>
        <a
          href="/app"
          className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Try InvoiceAI Free
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} InvoiceAI — AI Invoicing, Reimagined.</p>
        <div className="mt-4 space-x-4">
          <a href="#privacy" className="hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#terms" className="hover:text-indigo-600 transition">Terms</a>
          <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;




// Generate a professional invoice template with placeholders for client name, service description, date, hours, rate, and total.
// Generate an invoice for Jane Doe for website design worth $800, due August 15.