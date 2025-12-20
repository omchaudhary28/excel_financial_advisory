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
    <div className="space-y-24 pb-24 bg-background-light dark:bg-background-dark">

      {/* ================= HERO ================= */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text">
            Achieve Financial Freedom
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Expert financial guidance to help you build, manage, and protect your wealth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary text-text-inverted font-bold py-4 px-10 rounded-full transition-all duration-200 shadow-lg transform hover:-translate-y-1"
            >
              Get Started
            </Link>

            {!user && (
              <Link
                to="/register"
                className="bg-secondary text-text-inverted font-bold py-4 px-10 rounded-full transition-all duration-200 shadow-lg transform hover:-translate-y-1"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive solutions for your financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 text-center border dark:border-gray-800 hover:-translate-y-2 transition"
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">
          {[
            { number: '1,200+', label: 'Clients Served' },
            { number: '20+', label: 'Years of Expertise' },
            { number: '$5B+', label: 'Assets Under Management' },
          ].map((stat, index) => (
            <div key={index} className="transition-transform duration-200 hover:scale-105">
              <div className="text-5xl font-extrabold mb-2">{stat.number}</div>
              <div className="text-lg opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REAL TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with one of our expert advisors.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary font-bold py-4 px-10 rounded-full hover:scale-105 transition shadow-lg"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
