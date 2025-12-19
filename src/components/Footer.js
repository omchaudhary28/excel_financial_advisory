import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg> },
    { name: 'Twitter', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.848-.764-.024-1.482-.232-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.245-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.096 7.14 2.096 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.604 .91-.658 1.7-1.476 2.323-2.41z"/></svg> },
    { name: 'LinkedIn', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
    { name: 'Instagram', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg> },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">FinancialAdvisory</h3>
            <p className="text-sm">
              Your trusted partner in financial success.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} className="hover:text-primary transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter to get the latest news and updates.</p>
            <form>
              <div className="flex">
                <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                <button type="submit" className="bg-primary text-white px-4 rounded-r-md hover:bg-opacity-90 transition-colors">
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