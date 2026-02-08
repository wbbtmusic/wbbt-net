import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, UploadCloud, Radio } from 'lucide-react';
import SEO from '../components/SEO';

const SubmitPage = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen flex flex-col items-center justify-center text-center">
            <SEO
                title="Submit Demo | WBBT Records"
                description="Submit your demo to WBBT Records. We are looking for the next generation of electronic and dark pop artists."
                keywords="Demo Submission, Record Label Submission, Send Demo, Music Submission, WBBT Records Demo"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Submit Demo | Contact WBBT Records",
                    "url": "https://www.wbbt.net/submit",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "WBBT Records",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "Demo Submission",
                            "email": "demo@wbbt.net",
                            "availableLanguage": ["English", "Turkish"],
                            "url": "https://app.wbbt.net"
                        }
                    }
                }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl relative z-10 flex flex-col items-center"
            >
                {/* SLOGAN (Top) */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-purple-500/50"></div>
                    <span className="text-sm font-bold text-purple-400 uppercase tracking-[0.3em]">By Artists, For Artists</span>
                    <div className="h-[1px] w-12 bg-purple-500/50"></div>
                </div>

                {/* HERO SECTION */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-purple-600/20 flex items-center justify-center border border-purple-500/50 animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.4)] p-5">
                        <img src="/favicon.png" alt="WBBT Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    </div>
                </div>

                <h1 className="font-display text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter leading-tight">
                    NEXT GEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">RECORD LABEL</span>
                </h1>

                <p className="text-2xl text-gray-300 font-light mb-12 max-w-2xl">
                    We are <span className="text-white font-bold">NOT</span> a distributor. We are a <span className="text-purple-400 font-bold">Record Label</span>.
                    <br />
                    We don't just upload your music. We build your career.
                </p>

                <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://app.wbbt.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-black text-lg tracking-[0.2em] uppercase hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] mb-24"
                >
                    Submit Demo <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.a>

                {/* EMOTIONAL MANIFESTO */}
                <div className="mb-24 max-w-2xl mx-auto relative">
                    <div className="absolute -left-8 -top-8 text-6xl text-purple-600 opacity-30 font-serif">"</div>
                    <p className="text-xl text-gray-300 font-light italic leading-relaxed">
                        We started in a bedroom, just like you. We know the struggle of refreshing stats, waiting for approval, and fighting for attention. WBBT was built to be the label we wished we had. No corporate suits. No waiting lines. Just pure, unfiltered acceleration for artists who deserve it.
                    </p>
                </div>

                {/* FUGA SECTION (Middle) */}
                <div className="mb-20 w-full flex flex-col items-center">
                    <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-8 bg-white/5 px-4 py-2 rounded-full">
                        Powered by Global Infrastructure
                    </p>
                    <div className="h-32 relative group p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all cursor-pointer">
                        <img
                            src="/images/partners/fuga.webp"
                            alt="FUGA"
                            loading="lazy"
                            className="h-full w-auto object-contain transition-transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* DOWNTOWN & SERVICES SECTION (Bottom) */}
                <div className="w-full bg-[#0a0a0a] rounded-3xl p-8 md:p-16 border border-white/10 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

                    {/* TOP SECTION: LOGO & INTRO */}
                    <div className="flex flex-col items-center text-center mb-16 relative z-10">
                        <div className="relative group w-fit mx-auto mb-8">
                            <div className="relative p-6 transition-transform duration-500 hover:scale-105">
                                <img
                                    src="/images/partners/downtown.webp"
                                    alt="Downtown Music Services"
                                    loading="lazy"
                                    className="h-32 md:h-48 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                            LEAVE THE HASSLES TO US.
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-8">
                            If distribution feels complicated, intimidating, or just plain annoying, fear not. We’ve thought of everything, so you don’t have to.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 text-sm font-bold uppercase tracking-wider text-purple-400">
                            <span className="bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">Free Global Release</span>
                            <span className="bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">No Hidden Fees</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 italic max-w-lg mx-auto md:mx-0">
                            * We take a standard 30% commission, with flexible lower rates available depending on the agreement.
                        </p>
                    </div>

                    {/* BOTTOM GRID: TEXT vs SERVICES */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10 items-start">
                        {/* Left: Downtown Detail Text */}
                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-2xl md:text-3xl tracking-tight border-l-4 border-purple-500 pl-6">Downtown Music Services</h4>
                            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed font-light pl-6 border-l border-white/5">
                                <p>
                                    <strong className="text-white">WBBT Records</strong> collaborates with leading distributors within the <strong className="text-white">Downtown Music Holdings</strong> (Downtown) network. Through this strategic partnership, we provide our artists with access to the infrastructure of the world’s largest music services company.
                                </p>
                                <p>
                                    Downtown is a modern global music company. We help millions of creators, rights holders and their partners to manage their music as a business and get paid fairly for their work. We’re working to build a more equitable global music industry because we believe when creators and their partners are fairly compensated, they are empowered to keep creating and investing back into the world.
                                </p>
                                <p>
                                    We service over <strong className="text-white">50 million music assets</strong> from hundreds of countries across six continents, including some of the most well-known songs in popular music. Working with creators at every stage of their careers, from emerging songwriters to iconic performers, our business model drives equity across the entire global music industry supply chain.
                                </p>
                            </div>
                        </div>

                        {/* Right: Services List */}
                        <div className="space-y-4">
                            {/* NEW SERVICE: Radio Pitching */}
                            <div className="bg-gradient-to-r from-purple-900/40 to-white/5 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all relative overflow-hidden group">
                                <div className="absolute top-3 right-3">
                                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded-full border border-green-500/20 animate-pulse">
                                        NEW
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                                        <Radio size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">Global Radio Pitching</h3>
                                </div>
                                <p className="text-gray-300 text-sm leading-snug mb-3">
                                    We pitch your tracks to a curated network of global radio stations. Real airplay, real exposure.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-900/20 px-2 py-1 rounded inline-block">
                                        100% FREE
                                    </span>
                                    <a href="/services" className="text-xs font-bold text-purple-400 hover:text-white transition-colors ml-auto flex items-center gap-1">
                                        DETAILS <ArrowRight size={12} />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-purple-400 mb-1">Metadata & Assets</h3>
                                <p className="text-gray-400 text-sm leading-snug">
                                    We make sure your songs go up and stay up. Your audio, artwork, and metadata are verified to be good to go before delivery.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-green-400 mb-1">Royalties & Splits</h3>
                                <p className="text-gray-400 text-sm leading-snug mb-2">
                                    All rights holders, including you, are paid accurately and on time. Your collaborators are paid automatically.
                                </p>
                                <a href="/services" className="text-xs font-bold text-white border-b border-purple-500 pb-0.5 hover:text-purple-400 transition-colors">
                                    LEARN MORE
                                </a>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-blue-400 mb-1">Licensing & Covers</h3>
                                <p className="text-gray-400 text-sm leading-snug mb-2">
                                    Your cover-song licenses are properly secured. No takedowns, no legal headaches.
                                </p>
                                <a href="/services" className="text-xs font-bold text-white border-b border-purple-500 pb-0.5 hover:text-purple-400 transition-colors">
                                    LEARN MORE
                                </a>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-pink-400 mb-1">Video Distribution</h3>
                                <p className="text-gray-400 text-sm leading-snug">
                                    Official Music Videos on VEVO, Apple Music, and TIDAL. Monetize your visuals as well as your audio.
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors">
                                <h3 className="text-lg font-bold text-yellow-400 mb-1">Marketing & Strategy</h3>
                                <p className="text-gray-400 text-sm leading-snug">
                                    Smart links, pre-saves, and playlist pitching tools. We give you the data to run your career like a CEO.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SubmitPage;
