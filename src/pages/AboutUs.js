import React from 'react';

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
    icon: '🛡️',
  },
  {
    title: 'Client-Centric',
    description: 'Our clients are at the heart of everything we do. Your success is our success.',
    icon: '🎯',
  },
  {
    title: 'Innovation',
    description: 'We embrace change and continuously seek better ways to serve our clients.',
    icon: '💡',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-background-light dark:bg-gray-900 text-text dark:text-white">
      {/* Header Section */}
      <section className="py-24 text-center bg-gradient-to-r from-primary to-accent text-white">
        <h1 className="text-5xl font-extrabold mb-4" data-aos="fade-up">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90" data-aos="fade-up" data-aos-delay="100">
          We are a team of dedicated professionals committed to providing the best financial advisory services.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              To deliver transparent, client-focused financial advice that simplifies complexity and creates lasting value. We believe in building long-term relationships based on trust and integrity.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              To be the most trusted and respected financial advisory firm, known for our expertise, innovation, and unwavering commitment to our clients' success.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The principles that guide our actions and decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
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
                  <img src={member.imageUrl} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.424.727-.666 1.581-.666 2.477 0 1.61.82 3.027 2.053 3.848-.764-.024-1.482-.232-2.11-.583v.062c0 2.256 1.605 4.14 3.737 4.568-.39.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.307 3.2 4.34 3.245-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.096 7.14 2.096 8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.604 .91-.658 1.7-1.476 2.323-2.41z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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