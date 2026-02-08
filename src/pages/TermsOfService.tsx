import React from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
    return (
        <>
            <SEO
                title="Terms & Conditions | WBBT Records"
                description="Terms and Conditions for WBBT Records website use and services."
            />
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-gray-300">
                <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-8">Terms of Service</h1>
                <p className="mb-8 text-sm uppercase tracking-widest text-gray-500">Last Updated: October 24, 2026</p>

                <div className="space-y-8 text-lg font-light leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p>By accessing our website at wbbt.net, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
                        <p>Wait But Why Tech (WBBT) Records and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Restrictions</h2>
                        <p>You are specifically restricted from all of the following:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>publishing any Website material in any other media;</li>
                            <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                            <li>publicly performing and/or showing any Website material;</li>
                            <li>using this Website in any way that is or may be damaging to this Website;</li>
                            <li>using this Website in any way that impacts user access to this Website;</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Music Submission & Distribution</h2>
                        <p>When you submit music to WBBT Records via our platform, you grant us a non-exclusive license to distribute, reproduce, and monetize your content according to the specific distribution agreement you sign at that time. You retain full ownership of your master recordings and compositions unless explicitly stated otherwise in a separate recording contract.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                        <p>In no event shall WBBT Records, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. WBBT Records, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
