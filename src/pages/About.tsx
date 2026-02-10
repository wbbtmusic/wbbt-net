import React from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { useData } from '../context/DataContext';
import SEO from '../components/SEO';
import { generateOrganizationSchema } from '../utils/seoUtils';

const AboutPage = () => {
    const { aboutContent } = useData();

    return (
        <div className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto text-white">
            <SEO
                title="About WBBT Records | Independent Record Label London — Free Distribution"
                description="Learn about WBBT Records, a UK-based independent record label founded by Burak Can Öğüt. Free music distribution, artist development, and marketing services. Bağımsız kayıt etiketi, Londra müzik etiketi."
                keywords="About WBBT Records, Independent Record Label, Bağımsız Kayıt Etiketi, Londra Müzik Etiketi, Burak Can Öğüt, Free Distribution, UK Label"
                schema={generateOrganizationSchema()}
            />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
            >
                <h1 className="font-display text-5xl md:text-7xl font-black mb-12 tracking-tighter">
                    {aboutContent.title}
                </h1>

                <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-16">
                    {aboutContent.paragraphs.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }} />
                    ))}
                </div>

                {/* Founder's Story Section */}
                {aboutContent.founderStory && (
                    <div className="mb-16 p-8 md:p-12 border border-purple-500/20 rounded-3xl bg-purple-900/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />

                        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-white relative z-10">
                            The Founder's Journey
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-gray-300 relative z-10">
                            {aboutContent.founderStory.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                        <h3 className="font-bold text-2xl mb-4 text-purple-400">{aboutContent.missionTitle}</h3>
                        <p className="text-sm text-gray-400">
                            {aboutContent.missionText}
                        </p>
                    </div>
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                        <h3 className="font-bold text-2xl mb-6 text-purple-400">{aboutContent.contactTitle}</h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Digital</h4>
                                <p className="text-sm text-gray-300 mb-1">
                                    Inquiries: <a href={`mailto:${aboutContent.contactEmail}`} className="text-white hover:text-purple-400 transition-colors font-semibold">{aboutContent.contactEmail}</a>
                                </p>
                                <p className="text-sm text-gray-300">
                                    Demos: <a href={aboutContent.contactDemoUrl} className="text-white hover:text-purple-400 transition-colors font-semibold">Submit Portal</a>
                                </p>
                            </div>

                            {aboutContent.address && (
                                <div className="pt-6 border-t border-white/10">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Headquarters</h4>
                                    <div className="text-sm text-gray-300 leading-relaxed font-mono">
                                        <p>{aboutContent.address.line1}</p>
                                        <p>{aboutContent.address.line2}</p>
                                        <p>{aboutContent.address.line3}</p>
                                        <p>{aboutContent.address.city}, {aboutContent.address.state}</p>
                                        <p>{aboutContent.address.zip}</p>
                                        <p className="font-bold text-white mt-1">{aboutContent.address.country}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;
