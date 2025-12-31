import React from 'react';

const TermsOfService = () => {
    const sections = [
        { id: 'accounts', title: '1. Accounts' },
        { id: 'intellectual-property', title: '2. Intellectual Property' },
        { id: 'links-other', title: '3. Links To Other Web Sites' },
        { id: 'termination', title: '4. Termination' },
        { id: 'governing-law', title: '5. Governing Law' },
        { id: 'changes', title: '6. Changes' },
        { id: 'contact', title: 'Contact Us' },
    ];
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Terms of Service
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
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by FinancialAdvisory ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>

                <section id="accounts">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">1. Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                    </p>
                </section>

                <section id="intellectual-property">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">2. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features and functionality are and will remain the exclusive property of FinancialAdvisory and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without the prior written consent of FinancialAdvisory.
                    </p>
                </section>

                <section id="links-other">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">3. Links To Other Web Sites</h2>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by FinancialAdvisory. We have no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                    </p>
                </section>

                <section id="termination">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">4. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>
                </section>

                <section id="governing-law">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">5. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of our country, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                    </p>
                </section>

                <section id="changes">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">6. Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                </section>

                <section id="contact">
                    <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at <a href="mailto:terms@financialadvisory.com" className="text-primary hover:underline">terms@financialadvisory.com</a>.
                    </p>
                </section>
            </main>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
