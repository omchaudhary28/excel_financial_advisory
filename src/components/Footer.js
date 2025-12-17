import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark dark:bg-black text-text-inverted dark:text-text-inverted py-12 mt-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 animate-fade-in-up"
          data-aos="fade-up"
        >
          {/* Company Info */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-bold text-primary mb-4">FinancialAdvisory</h3>
            <p className="text-text-inverted dark:text-text-inverted text-sm">
              Your trusted partner in financial success. We help you make smart financial decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-text-inverted dark:text-text-inverted text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-text-inverted dark:text-text-inverted hover:text-primary transition-colors duration-300 hover:translate-x-2 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-text-inverted dark:text-text-inverted hover:text-primary transition-colors duration-300 hover:translate-x-2 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h4 className="text-text-inverted dark:text-text-inverted text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center hover-scale">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@financial.com
              </li>
              <li className="flex items-center hover-scale">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.021.054.645 1.735 2.433 3.523C7.622 9.861 9.49 10.64 10.949 10.949l.923-1.487a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57a2 2 0 01-2-2v-1a24 24 0 00-11-11v-2a2 2 0 012-2z" />
                </svg>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div
          className="flex justify-center items-center gap-6 py-6 border-t border-gray-300 dark:border-gray-700 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
            <a
              key={social}
              href={`/${social.toLowerCase()}`}
              className="text-text-inverted dark:text-text-inverted hover:text-primary hover-scale transition-all duration-300"
              title={social}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="text-center pt-6 border-t border-gray-300 dark:border-gray-700 text-text-inverted dark:text-text-inverted text-sm"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p>
            &copy; {currentYear} FinancialAdvisory. All rights reserved. |{' '}
            <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link to="/terms-of-service" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
