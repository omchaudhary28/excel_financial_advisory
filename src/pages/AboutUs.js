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
    <div className="bg-background-light dark:bg-black text-text dark:text-text-inverted">
      <section className="py-24 text-center bg-gradient-to-r from-primary to-accent text-text-inverted">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4" data-aos="fade-up">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          We are a team of dedicated professionals committed to providing the best financial advisory services.
        </p>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Our Mission</h2>
            <p className="text-lg text-text-muted dark:text-gray-300 mb-4 leading-relaxed">
              To deliver transparent, client-focused financial advice that simplifies complexity and creates lasting value. We believe in building long-term relationships based on trust and integrity.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Our Vision</h2>
            <p className="text-lg text-text-muted dark:text-gray-300 leading-relaxed">
              To be the most trusted and respected financial advisory firm, known for our expertise, innovation, and unwavering commitment to our clients' success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-muted dark:text-gray-300 leading-relaxed">
              The principles that guide our actions and decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-deeper" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="flex justify-center text-5xl mb-4 text-primary">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-text dark:text-text-inverted">{value.title}</h3>
                <p className="text-text-muted dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Meet Our Team</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-muted dark:text-gray-300 leading-relaxed">
              Our strength lies in our individual talents and our collective passion for finance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-deeper"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="relative">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> {/* Subtle overlay */}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1 text-text dark:text-text-inverted">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-text-muted dark:text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-gray-400 hover:text-primary transition-colors transform hover:scale-110">
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent text-text-inverted text-center">
        <div className="max-w-7xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Ready to build your future?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Let's have a conversation about your financial goals.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary hover:bg-gray-100 hover:text-primary-dark shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
