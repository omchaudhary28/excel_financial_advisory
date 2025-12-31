import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: <FaFacebook /> },
    { name: 'Twitter', href: '#', icon: <FaTwitter /> },
    { name: 'LinkedIn', href: '#', icon: <FaLinkedin /> },
    { name: 'Instagram', href: '#', icon: <FaInstagram /> },
    { name: 'YouTube', href: '#', icon: <FaYoutube /> },
    { name: 'Pinterest', href: '#', icon: <FaPinterest /> },
  ];

  return (
    <footer className="bg-background-light dark:bg-background-dark text-text-muted pt-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">FinancialAdvisory</h3>
            <p className="text-base leading-relaxed">
              Your trusted partner in achieving financial success through expert guidance and personalized strategies.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="text-text-muted hover:text-primary transition-all duration-200 transform hover:scale-125" aria-label={social.name}>
                  <div className="w-7 h-7">{social.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-text dark:text-text-inverted mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link></li>
              <li><Link to="/rating" className="hover:text-primary transition-colors duration-200">Rate Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-text dark:text-text-inverted mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-text dark:text-text-inverted mb-4">Stay Updated</h4>
            <p className="text-base mb-4 leading-relaxed">Subscribe to our newsletter for exclusive insights and financial tips.</p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-input rounded-r-none"
                />
                <button type="submit" className="btn-primary rounded-l-none">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm">
            &copy; {currentYear} FinancialAdvisory. All rights reserved.
          </p>
          <div className="text-xs mt-1">
            Made with ❤️ for financial growth.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;