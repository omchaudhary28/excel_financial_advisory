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
    <div className="space-y-12 md:space-y-16 pb-12 md:pb-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12 items-center">
          <div className="text-center md:text-center animate-fade-in-up" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-blue-500 bg-clip-text text-transparent mb-6 leading-tight">
              Clarity and Strategy For Your Financial Future
            </h1>
            <p className="text-lg md:text-xl text-text dark:text-text-inverted mb-8 max-w-2xl mx-auto">
              We provide bespoke financial advisory services to help you navigate market complexities and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-center animate-scale-up">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover-lift shadow-lg"
              >
                Book a Free Consultation
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="border-2 border-primary text-primary dark:text-primary-light hover:bg-primary-light/10 dark:hover:bg-background-dark font-bold py-3 px-8 rounded-lg transition-all duration-300 hover-scale"
                >
                  Create an Account
                </Link>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-text dark:text-text-inverted mb-4">Our Core Services</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-background-light dark:bg-background-dark rounded-xl shadow-md dark:shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover-lift text-center"
            >
              <div className="flex justify-center text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text dark:text-text-inverted mb-3">{feature.title}</h3>
              <p className="text-text-muted dark:text-text-muted leading-relaxed text-sm">{feature.description}</p>
              <div className="mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full mx-auto"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-4 sm:mx-6 lg:mx-8 py-12 bg-gradient-to-r from-primary-dark to-secondary-dark rounded-2xl text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {[
            { number: '500+', label: 'Happy Clients' },
            { number: '15+', label: 'Years of Experience' },
            { number: '$2B+', label: 'In Assets Managed' },
          ].map((stat, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="animate-fade-in-up"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-primary-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 overflow-hidden">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-text dark:text-text-inverted mb-4">Trusted by Leaders</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex w-max animate-scroll gap-6">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="w-72 sm:w-80 md:w-96 flex-shrink-0 bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-primary dark:border-primary-light hover-lift"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl animate-pulse-glow">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-text-muted dark:text-text-muted mb-4 italic">"{testimonial.feedback}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-text dark:text-text-inverted">{testimonial.name}</p>
                <p className="text-sm text-text-muted dark:text-text-muted">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-4 sm:mx-6 lg:mx-8 py-16 bg-gradient-to-r from-blue-700 to-slate-800 dark:bg-background-dark rounded-2xl text-white text-center shadow-xl px-4">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
          Take Control of Your Financial Future
        </h2>
        <p className="text-blue-200 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Our expert advisors are ready to help you build a resilient financial strategy. Schedule a complimentary consultation today to get started.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg animate-bounce-smooth"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Request a Free Consultation
        </Link>
      </section>
    </div>
  );
}

export default Home;
