import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Investment Planning',
      description: 'We craft data-driven investment portfolios tailored to your risk tolerance and long-term goals.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Wealth Management',
      description: 'Holistic strategies to grow, protect, and transfer your wealth across generations.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Retirement Planning',
      description: 'Secure your golden years with a robust and tax-efficient retirement plan.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Risk Management',
      description: 'We identify and mitigate financial risks to protect your assets and ensure stability.',
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, Tech Innovations Inc.',
      feedback: 'The wealth management strategy they developed was exceptional. Our company assets are more secure and are growing steadily. A true partner.',
      rating: 5,
    },
    {
      name: 'Sarah Smith',
      role: 'Retired Teacher',
      feedback: 'Planning for retirement was daunting, but their team made it simple and clear. I now feel confident about my financial future.',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Startup Founder',
      feedback: 'Their advice on investment planning and risk management was crucial during our seed round. Invaluable guidance.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-background dark:bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-text dark:text-white mb-6 leading-tight animate-fade-in-up">
            Achieve Financial Freedom
          </h1>
          <p className="text-lg md:text-xl text-text-light dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Expert financial guidance to help you build, manage, and protect your wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/contact"
              className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-secondary hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text dark:text-white mb-4">Our Services</h2>
          <p className="text-lg text-text-light dark:text-gray-400">Comprehensive solutions for your financial needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200 dark:border-gray-700 text-center transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-center text-primary text-5xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-text dark:text-white mb-4">{feature.title}</h3>
              <p className="text-text-light dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {[
            { number: '1,200+', label: 'Clients Served' },
            { number: '20+', label: 'Years of Expertise' },
            { number: '$5B+', label: 'Assets Under Management' },
          ].map((stat, index) => (
            <div key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <div className="text-5xl font-extrabold mb-2">{stat.number}</div>
              <div className="text-lg opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-text-light dark:text-gray-400">Real stories from people we've helped.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img className="w-12 h-12 rounded-full" src={`https://i.pravatar.cc/150?u=${testimonial.name}`} alt={testimonial.name} />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-text dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-text-light dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-text-light dark:text-gray-300 italic">"{testimonial.feedback}"</p>
              <div className="flex mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4" data-aos="fade-up">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Schedule a free consultation with one of our expert advisors and start your journey to financial success.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;