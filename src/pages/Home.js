import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiTrendingUp,
  FiShield,
  FiBriefcase,
  FiBarChart2,
} from 'react-icons/fi';
import Testimonials from "../components/Testimonials";

function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: <FiBriefcase className="h-12 w-12 text-primary" />,
      title: 'Investment Planning',
      description:
        'We craft data-driven investment portfolios tailored to your risk tolerance and long-term goals.',
    },
    {
      icon: <FiBarChart2 className="h-12 w-12 text-primary" />,
      title: 'Wealth Management',
      description:
        'Holistic strategies to grow, protect, and transfer your wealth across generations.',
    },
    {
      icon: <FiTrendingUp className="h-12 w-12 text-primary" />,
      title: 'Retirement Planning',
      description:
        'Secure your golden years with a robust and tax-efficient retirement plan.',
    },
    {
      icon: <FiShield className="h-12 w-12 text-primary" />,
      title: 'Risk Management',
      description:
        'We identify and mitigate financial risks to protect your assets and ensure stability.',
    },
  ];

  return (
    <div className="space-y-24 pb-24 bg-background-light dark:bg-background-dark text-text dark:text-text-inverted">

      {/* ================= HERO ================= */}
      <section className="relative py-24 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text leading-tight">
            Achieve Financial Freedom with Expert Guidance
          </h1>

          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed">
            Personalized strategies to help you build, manage, and protect your wealth for a secure future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get Started
            </Link>

            {!user && (
              <Link
                to="/register"
                className="btn-secondary"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text dark:text-text-inverted">Our Services</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to meet your unique goals and aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-deeper"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-center mb-6 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-text dark:text-text-inverted">{feature.title}</h3>
              <p className="text-text-muted text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 md:px-10">
          {[
            { number: '1,200+', label: 'Clients Served' },
            { number: '20+', label: 'Years of Expertise' },
            { number: '$5B+', label: 'Assets Under Management' },
          ].map((stat, index) => (
            <div key={index} className="transition-transform duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay={index * 150}>
              <div className="text-6xl font-extrabold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REAL TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Ready to Take the Next Step Towards Financial Clarity?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Schedule a free, no-obligation consultation with one of our expert financial advisors today.
          </p>
          <Link
            to="/contact"
            className="btn-primary bg-white text-primary hover:bg-gray-100 hover:text-primary-dark shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
