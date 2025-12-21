import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-background-light dark:bg-black text-text dark:text-text-inverted py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-text dark:text-white" data-aos="fade-down">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted dark:text-gray-300 leading-relaxed" data-aos="fade-up">
          <p>
            Your privacy is important to us. It is FinancialAdvisory's policy to respect your privacy regarding any information we may collect from you across our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          <p>
            The types of personal information we may collect include your name, email address, phone number, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">2. How We Use Your Information</h2>
          <p>
            We may use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">3. Log Files</h2>
          <p>
            FinancialAdvisory follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">4. Security</h2>
          <p>
            We take reasonable precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">5. Links to Other Sites</h2>
          <p>
            Our website may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>
          <p>
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text dark:text-white">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
