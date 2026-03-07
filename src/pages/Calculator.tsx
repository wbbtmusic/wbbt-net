import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { Globe, Headphones, DollarSign, AlertCircle } from 'lucide-react';

const Calculator: React.FC = () => {
    const [streams, setStreams] = useState<number>(1000000);
    const [platform, setPlatform] = useState<'spotify' | 'apple' | 'youtube'>('spotify');
    const [region, setRegion] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

    // Highly accurate 2026 realistic streaming rates based on region (in USD)
    const rates = {
        spotify: {
            tier1: 0.00390, // USA, UK, Norway, Denmark (Premium heavy)
            tier2: 0.00180, // Eastern Europe, Spain, Italy
            tier3: 0.00060  // Turkey, India, Latin America (Lower subs, ad-heavy)
        },
        apple: {
            tier1: 0.00800, // Apple is generally higher and strictly premium
            tier2: 0.00450,
            tier3: 0.00150
        },
        youtube: {
            tier1: 0.00200, // YouTube Premium + Ads
            tier2: 0.00080,
            tier3: 0.00030
        }
    };

    const calculateEarnings = () => {
        return (streams * rates[platform][region]).toFixed(2);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[#030303]">
            <SEO
                title="Global Spotify Royalty Calculator 2026 | Streaming Payouts"
                description="Calculate exactly how much money 1 million streams pays on Spotify, Apple Music, and YouTube. Real data for USA, UK, India, Turkey, and LATAM."
                keywords="spotify royalty calculator, apple music payouts, 1 million streams money, music distribution royalties, youtube music payout, streaming revenue 2026"
                type="website"
            />

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none blur-[120px] opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none blur-[120px] opacity-30"></div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <DollarSign size={14} /> 2026 Updated Rates
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight font-display">
                        Global Music <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Royalties</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Stop guessing. Calculate exactly how much money your streams generate based on the platform and your listener demographics.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-stretch mb-16">
                    {/* Controls Panel */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="space-y-10 relative z-10">

                            {/* Platform Select */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-300 font-bold mb-4 uppercase tracking-widest text-xs">
                                    <Headphones size={14} className="text-gray-500" /> Select Platform
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setPlatform('spotify')}
                                        className={`py-4 rounded-xl border text-sm font-bold transition-all ${platform === 'spotify' ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)] glow-box-green' : 'bg-black border-white/5 text-gray-400 hover:border-white/20'}`}
                                    >
                                        Spotify
                                    </button>
                                    <button
                                        onClick={() => setPlatform('apple')}
                                        className={`py-4 rounded-xl border text-sm font-bold transition-all ${platform === 'apple' ? 'bg-pink-500/10 border-pink-500 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.15)] glow-box-pink' : 'bg-black border-white/5 text-gray-400 hover:border-white/20'}`}
                                    >
                                        Apple Music
                                    </button>
                                    <button
                                        onClick={() => setPlatform('youtube')}
                                        className={`py-4 rounded-xl border text-sm font-bold transition-all ${platform === 'youtube' ? 'bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)] ' : 'bg-black border-white/5 text-gray-400 hover:border-white/20'}`}
                                    >
                                        YouTube
                                    </button>
                                </div>
                            </div>

                            {/* Region Select */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-300 font-bold mb-4 uppercase tracking-widest text-xs">
                                    <Globe size={14} className="text-purple-400" /> Listener Geography
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setRegion('tier1')}
                                        className={`py-3 px-4 rounded-xl border text-left transition-all ${region === 'tier1' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-black border-white/5 hover:border-white/20'}`}
                                    >
                                        <span className={`block font-bold text-sm ${region === 'tier1' ? 'text-purple-400' : 'text-gray-300'}`}>Tier 1</span>
                                        <span className="text-xs text-gray-500 block mt-1">USA, UK, Nordics</span>
                                    </button>
                                    <button
                                        onClick={() => setRegion('tier2')}
                                        className={`py-3 px-4 rounded-xl border text-left transition-all ${region === 'tier2' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-black border-white/5 hover:border-white/20'}`}
                                    >
                                        <span className={`block font-bold text-sm ${region === 'tier2' ? 'text-purple-400' : 'text-gray-300'}`}>Tier 2</span>
                                        <span className="text-xs text-gray-500 block mt-1">Europe, Japan, AUS</span>
                                    </button>
                                    <button
                                        onClick={() => setRegion('tier3')}
                                        className={`py-3 px-4 rounded-xl border text-left transition-all ${region === 'tier3' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-black border-white/5 hover:border-white/20'}`}
                                    >
                                        <span className={`block font-bold text-sm ${region === 'tier3' ? 'text-purple-400' : 'text-gray-300'}`}>Tier 3</span>
                                        <span className="text-xs text-gray-500 block mt-1">LATAM, Turkey, India</span>
                                    </button>
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between items-end mb-6">
                                    <label className="block text-gray-400 font-bold uppercase tracking-widest text-xs">Total Streams</label>
                                    <span className="text-4xl font-black text-white">{new Intl.NumberFormat('en-US').format(streams)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000"
                                    max="50000000"
                                    step="10000"
                                    value={streams}
                                    onChange={(e) => setStreams(parseInt(e.target.value))}
                                    className="w-full h-3 bg-black rounded-full appearance-none flex items-center cursor-pointer border border-white/10 accent-white"
                                />
                                <div className="flex justify-between text-xs font-bold text-gray-600 mt-4">
                                    <span>1K</span>
                                    <span>50M+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="bg-black/60 rounded-3xl p-10 border border-white/10 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-white/20 transition-all">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <p className="text-gray-500 mb-6 uppercase tracking-[0.3em] text-xs font-bold">Estimated Gross Revenue</p>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={`${platform}-${region}-${streams}`}
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <p className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 mb-2">
                                    ${calculateEarnings()}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl text-left w-full flex items-start gap-4">
                            <AlertCircle className="text-purple-400 shrink-0 mt-1" size={20} />
                            <div>
                                <p className="text-sm text-gray-300">
                                    <strong>Important Note on Payouts:</strong>
                                    <br />The figures above are <em>gross estimates</em>. Actual payouts vary constantly based on platform revenue pools, user subscription types (Family vs. Solo), and currency exchange rates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google AdSense Integration */}
                <div className="w-full bg-black/50 border border-white/5 rounded-2xl p-4 flex justify-center items-center mb-16 min-h-[120px]">
                    <p className="text-gray-700 text-xs text-center mb-2 w-full absolute pointer-events-none">Advertisement</p>
                    <ins className="adsbygoogle"
                        style={{ display: 'block', width: '100%', minHeight: '90px' }}
                        data-ad-client="ca-pub-9997362639948029"
                        data-ad-slot="1234567890"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                    <script dangerouslySetInnerHTML={{
                        __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
                    }}></script>
                </div>

                {/* Deep SEO Educational Content */}
                <div className="mt-12 bg-black/40 border border-white/5 p-8 md:p-12 rounded-3xl">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 border-b border-white/10 pb-6 font-display">The Complete Guide: How Much Does Spotify Pay Per Stream in 2026?</h2>

                    <div className="prose prose-invert max-w-none text-gray-300 mb-12">
                        <p className="text-lg leading-relaxed mb-6">
                            Independent musicians frequently ask: <em>"How much is 1 million streams worth?"</em> or <em>"What is the Spotify royalty calculator formula?"</em> The truth is, there is no single, fixed pay-per-stream rate anywhere in the music industry. DSPs (Digital Service Providers) like Spotify, Apple Music, and YouTube operate on a "pro-rata" or "streamshare" system.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            This means the total revenue generated by a platform in a specific country (from subscriptions and ads) is pooled together and then divided among all the artists who accumulated streams that month. Because of this, the value of a stream constantly fluctuates based on demographic factors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-black text-white mb-4">1. Top Tier Nations (Highest Payouts)</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Streams originating from the United States, United Kingdom, Norway, and Switzerland yield the highest payouts. Listeners in these regions pay premium subscription prices (often $10.99 or more), meaning the revenue pool is massive. Over 1,000 streams in a Tier 1 country can push <strong>$4.00 to $4.50</strong>.</p>
                        </div>
                        <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-black text-white mb-4">2. Emerging Markets (Lower Payouts)</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">If your core audience is based in Turkey, India, Brazil, or the Philippines, the subscription cost per user is dramatically lower (e.g., heavily discounted student or local pricing). Consequently, 1,000 streams from emerging markets may only generate between <strong>$0.50 and $1.00</strong>.</p>
                        </div>
                        <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-black text-white mb-4">3. The 1,000 Stream Threshold Rule</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">As of early 2026, major DSPs implemented a critical rule to combat artificial streaming: Tracks that do not exceed 1,000 total streams in a 12-month period <strong>do not generate royalties</strong>. This money is then redistributed to working, professional artists.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/20 to-black p-8 rounded-2xl border-l-4 border-purple-500">
                        <h4 className="text-2xl font-bold text-white mb-4">Apple Music vs. Spotify vs. YouTube</h4>
                        <p className="text-gray-300 leading-relaxed">
                            <strong>Apple Music</strong> consistently boasts one of the highest average per-stream rates in the industry because it does not have a free, ad-supported tier. Every Apple Music listener is a paying subscriber.<br /><br />
                            <strong>Spotify</strong> offers a massive user base, but its payout is diluted by millions of free-tier listeners who generate revenue merely through interstitial ads, which pay out significantly less than paid subscriptions.<br /><br />
                            <strong>YouTube</strong> (specifically Content ID and ad-supported viewing) often yields the lowest per-stream rate, though YouTube Premium streams compensate artists at a highly competitive level.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
