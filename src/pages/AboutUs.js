import React from 'react';

const teamMembers = [
  {
    name: 'Om Chaudhary',
    role: 'Founder & CEO',
    imageUrl: 'https://via.placeholder.com/150',
    bio: 'Om is the visionary behind the company, with a passion for creating innovative financial solutions. His leadership drives the company forward.',
  },
  {
    name: 'Jane Smith',
    role: 'Chief Financial Officer',
    imageUrl: 'https://via.placeholder.com/150',
    bio: 'Jane has over 20 years of experience in finance and is responsible for the financial health of the company.',
  },
  {
    name: 'Peter Jones',
    role: 'Lead Developer',
    imageUrl: 'https://via.placeholder.com/150',
    bio: 'Peter is a tech enthusiast who leads our development team, turning ideas into powerful, functional products.',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text dark:text-text-inverted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Our Company</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            We are a team of dedicated professionals committed to providing the best financial advisory services. Our mission is to empower you to achieve your financial goals with confidence.
          </p>
        </div>

        {/* Mission and Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To deliver transparent, client-focused financial advice that simplifies complexity and creates lasting value. We believe in building long-term relationships based on trust and integrity.
            </p>
            <div className="h-1 w-20 bg-primary rounded"></div>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To be the most trusted and respected financial advisory firm, known for our expertise, innovation, and unwavering commitment to our clients' success.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Our strength lies in our individual talents and our collective passion for finance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="h-48 bg-gray-200">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
