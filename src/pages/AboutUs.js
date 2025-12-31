import React from 'react';
import { FaLinkedin, FaTwitter, FaBuilding, FaAward, FaHandshake } from 'react-icons/fa';
import { FiShield, FiTarget, FiZap } from 'react-icons/fi';
import { Link } from "react-router-dom";


const teamMembers = [
  {
    name: 'Om Chaudhary',
    role: 'Founder & CEO',
    imageUrl: 'https://i.pravatar.cc/300?u=om',
    bio: 'Om is the visionary founder, driving the company towards innovative financial solutions with a client-first approach. His expertise in market analysis has been pivotal to our success.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Jane Smith',
    role: 'Chief Financial Officer',
    imageUrl: 'https://i.pravatar.cc/300?u=jane',
    bio: 'With over two decades of experience, Jane masterfully steers the company’s financial strategy, ensuring stability and growth. She is a respected voice in the financial community.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Peter Jones',
    role: 'Lead Developer',
    imageUrl: 'https://i.pravatar.cc/300?u=peter',
    bio: 'Peter is the technical genius behind our cutting-edge platform. He leads the development team with a passion for building secure, scalable, and user-friendly products.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

const values = [
  {
    title: 'Integrity',
    description: 'We uphold the highest ethical standards, ensuring every decision is made with transparency and for the benefit of our clients.',
    icon: <FiShield className="w-10 h-10" />,
  },
  {
    title: 'Client-Centric',
    description: 'Our clients are our top priority. We are dedicated to understanding their needs and exceeding their expectations.',
    icon: <FiTarget className="w-10 h-10" />,
  },
  {
    title: 'Innovation',
    description: 'We are committed to continuous improvement, leveraging technology to provide smarter, more effective financial solutions.',
    icon: <FiZap className="w-10 h-10" />,
  },
];

const history = [
    { year: 2010, event: "Company founded with a mission to democratize financial advisory.", icon: <FaBuilding/> },
    { year: 2015, event: "Reached 1,000 clients and expanded our service offerings.", icon: <FaAward/> },
    { year: 2020, event: "Launched our innovative digital platform, transforming client experience.", icon: <FaHandshake/> },
    { year: 2024, event: "Recognized as 'Financial Advisor of the Year' for our commitment to excellence.", icon: <FaAward/> },
]

const AboutUs = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text dark:text-text-inverted">
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-primary to-secondary">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4" data-aos="fade-up">
            About Our Firm
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            We are a collective of passionate financial experts dedicated to empowering our clients to achieve their financial goals through personalized, data-driven strategies.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6 text-text dark:text-text-inverted">Our Mission</h2>
            <p className="text-lg text-text-muted mb-4 leading-relaxed">
              To deliver transparent, client-focused financial advice that simplifies complexity and creates lasting value. We believe in building long-term relationships based on trust, integrity, and mutual respect.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
                Our goal is to provide you with the clarity and confidence to make informed financial decisions that align with your aspirations.
            </p>
          </div>
          <div data-aos="fade-left" className="text-center">
            <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Vision" className="rounded-lg shadow-2xl"/>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-light dark:bg-background-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
              The principles that define our culture and guide our daily actions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div key={index} className="card text-center p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="flex items-center justify-center h-20 w-20 mx-auto mb-6 bg-primary/10 text-primary rounded-full">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-text dark:text-text-inverted">{value.title}</h3>
                <p className="text-text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Our Journey</h2>
                <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
                A brief history of our milestones and achievements.
                </p>
            </div>
            <div className="relative">
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                {history.map((item, index) => (
                    <div key={index} className="md:flex items-center md:w-full mb-8 relative" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                        <div className="md:w-1/2 md:pr-8 text-right">
                           {index % 2 === 0 && <div className="card p-6 inline-block">
                                <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                                <p className="mt-2 text-text-muted">{item.event}</p>
                            </div>}
                        </div>
                        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white z-10">
                           {item.icon}
                        </div>
                         <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                           {index % 2 !== 0 && <div className="card p-6 inline-block">
                                <h3 className="text-2xl font-bold text-primary">{item.year}</h3>
                                <p className="mt-2 text-text-muted">{item.event}</p>
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-24 bg-background-light dark:bg-background-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 text-text dark:text-text-inverted">Meet Our Leadership Team</h2>
            <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
              The driving force behind our success is our team of dedicated and experienced professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card overflow-hidden text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <img src={member.imageUrl} alt={member.name} className="w-full h-72 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-text dark:text-text-inverted">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.role}</p>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center space-x-5">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors transform hover:scale-110">
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors transform hover:scale-110">
                      <FaTwitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-r from-secondary to-accent text-white text-center">
        <div className="max-w-7xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Ready to Build Your Financial Future?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Let's have a conversation about your financial goals and how we can help you achieve them.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary text-lg font-semibold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
