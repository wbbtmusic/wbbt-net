import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy | WBBT Records"
                description="Privacy Policy for WBBT Records - How we collect, use, and protect your data."
            />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-gray-300">
                <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-8">Privacy Policy</h1>
                <p className="mb-8 text-sm uppercase tracking-widest text-gray-500">Last Updated: October 24, 2026</p>

                <div className="space-y-8 text-lg font-light leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>Welcome to WBBT Records ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (wbbt.net) and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                        <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@wbbt.net" className="text-purple-400 hover:text-purple-300">privacy@wbbt.net</a></p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
