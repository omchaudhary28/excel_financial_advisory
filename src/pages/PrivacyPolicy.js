import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'info-collection', title: '1. Information We Collect' },
    { id: 'info-use', title: '2. How We Use Your Information' },
    { id: 'log-files', title: '3. Log Files' },
    { id: 'security', title: '4. Security' },
    { id: 'external-links', title: '5. Links to Other Sites' },
    { id: 'policy-changes', title: '6. Changes to This Privacy Policy' },
    { id: 'contact', title: 'Contact Us' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Privacy Policy
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                Last updated: December 31, 2025
            </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
            <aside className="lg:col-span-1 mb-12 lg:mb-0" data-aos="fade-right">
                <nav className="sticky top-24">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                    <ul className="space-y-2">
                        {sections.map(section => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none" data-aos="fade-up" data-aos-delay="100">
                <p>
                    Your privacy is important to us. It is FinancialAdvisory's policy to respect your privacy regarding any information we may collect from you across our website. We are committed to protecting your personal information and your right to privacy.
                </p>

                <section id="info-collection">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">1. Information We Collect</h2>
                    <p>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. The types of personal information we may collect include your name, email address, phone number, and any other information you voluntarily provide to us.
                    </p>
                </section>

                <section id="info-use">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for various purposes, including to:
                    </p>
                    <ul>
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Improve, personalize, and expand our services.</li>
                        <li>Understand and analyze how you use our services.</li>
                        <li>Develop new products, services, features, and functionality.</li>
                        <li>Communicate with you for customer service, updates, and marketing.</li>
                        <li>Process your transactions.</li>
                        <li>Find and prevent fraud.</li>
                    </ul>
                </section>

                <section id="log-files">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">3. Log Files</h2>
                    <p>
                        FinancialAdvisory follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date and time stamp, and referring/exit pages. This data is not linked to any personally identifiable information and is used for analyzing trends and administering the site.
                    </p>
                </section>

                <section id="security">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">4. Security of Your Information</h2>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                    </p>
                </section>

                <section id="external-links">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">5. Links to Other Sites</h2>
                    <p>
                        Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                    </p>
                </section>

                <section id="policy-changes">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">6. Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
                    </p>
                </section>

                <section id="contact">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@financialadvisory.com" className="text-primary hover:underline">privacy@financialadvisory.com</a>.
                    </p>
                </section>
            </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
