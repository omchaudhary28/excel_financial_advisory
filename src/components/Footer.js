import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: <FaFacebook className="w-6 h-6" /> },
    { name: 'Twitter', href: '#', icon: <FaTwitter className="w-6 h-6" /> },
    { name: 'LinkedIn', href: '#', icon: <FaLinkedin className="w-6 h-6" /> },
    { name: 'Instagram', href: '#', icon: <FaInstagram className="w-6 h-6" /> },
    { name: 'YouTube', href: '#', icon: <FaYoutube className="w-6 h-6" /> },
    { name: 'Pinterest', href: '#', icon: <FaPinterest className="w-6 h-6" /> },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">FinancialAdvisory</h3>
            <p className="text-sm">
              Your trusted partner in financial success.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="hover:text-primary transition-all duration-200 transform hover:scale-115">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors transform hover:-translate-y-1">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors transform hover:-translate-y-1">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors transform hover:-translate-y-1">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors transform hover:-translate-y-1">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors transform hover:-translate-y-1">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter to get the latest news and updates.</p>
            <form>
              <div className="flex">
                <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent" />
                <button type="submit" className="bg-primary text-text-inverted px-4 rounded-r-md transition-all duration-200 transform hover:scale-110">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm">
            &copy; {currentYear} FinancialAdvisory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;