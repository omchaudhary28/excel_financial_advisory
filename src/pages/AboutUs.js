import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiShield, FiTarget, FiZap } from 'react-icons/fi';

const teamMembers = [
  {
    name: 'Om Chaudhary',
    role: 'Founder & CEO',
    imageUrl: 'https://i.pravatar.cc/150?u=om',
    bio: 'Om is the visionary behind the company, with a passion for creating innovative financial solutions.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Jane Smith',
    role: 'Chief Financial Officer',
    imageUrl: 'https://i.pravatar.cc/150?u=jane',
    bio: 'Jane has over 20 years of experience in finance and is responsible for the financial health of the company.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Peter Jones',
    role: 'Lead Developer',
    imageUrl: 'https://i.pravatar.cc/150?u=peter',
    bio: 'Peter is a tech enthusiast who leads our development team, turning ideas into powerful, functional products.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const values = [
  {
    title: 'Integrity',
    description: 'We adhere to the highest ethical standards, ensuring transparency and trust.',
    icon: <FiShield className="w-12 h-12" />,
  },
  {
    title: 'Client-Centric',
    description: 'Our clients are at the heart of everything we do. Your success is our success.',
    icon: <FiTarget className="w-12 h-12" />,
  },
  {
    title: 'Innovation',
    description: 'We embrace change and continuously seek better ways to serve our clients.',
    icon: <FiZap className="w-12 h-12" />,
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-background-dark text-gray-800 dark:text-text-inverted">
      <section className="py-24 text-center bg-gradient-to-r from-primary to-accent text-white">
        <h1 className="text-5xl font-extrabold mb-4" data-aos="fade-up">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90" data-aos="fade-up" data-aos-delay="100">
          We are a team of dedicated professionals committed to providing the best financial advisory services.
        </p>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              To deliver transparent, client-focused financial advice that simplifies complexity and creates lasting value. We believe in building long-term relationships based on trust and integrity.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              To be the most trusted and respected financial advisory firm, known for our expertise, innovation, and unwavering commitment to our clients' success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The principles that guide our actions and decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="flex justify-center text-5xl mb-4 text-primary">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our strength lies in our individual talents and our collective passion for finance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="relative">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-64 object-cover dark:opacity-80" />
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold mb-4" data-aos="fade-up">Ready to build your future?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Let's have a conversation about your financial goals.
          </p>
          <a href="/contact" className="bg-white text-primary font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg" data-aos="fade-up" data-aos-delay="200">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
