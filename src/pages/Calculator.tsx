import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const Calculator: React.FC = () => {
    const [streams, setStreams] = useState<number>(100000);
    const [platform, setPlatform] = useState<'spotify' | 'apple' | 'youtube'>('spotify');

    // Approximate rates per stream (in USD)
    const rates = {
        spotify: 0.00318,
        apple: 0.008,
        youtube: 0.002
    };

    const calculateEarnings = () => {
        return (streams * rates[platform]).toFixed(2);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
            <SEO
                title="Spotify Gelir Hesaplama (2024 Royalty Calculator) | WBBT Records"
                description="Spotify, Apple Music ve YouTube Music dinlenme (stream) gelirlerinizi saniyeler içinde hesaplayın. 1 milyon dinlenme ne kadar kazandırır? WBBT Records Royalties Calculator."
                keywords="spotify gelir hesaplama, spotify ne kadar veriyor, 1 milyon dinlenme kaç para, spotify dinlenme geliri, apple music royalty calculator, youtube music royalties, stream gelirleri, wbbt records"
                type="website"
            />

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none blur-3xl opacity-50"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Spotify <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Gelir Hesaplama</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Müziğinizin dijital platformlarda ne kadar kazandırdığını öğrenin.
                        Güncel (2024) ortalama stream başına ödeme tutarlarına göre hesaplanmıştır.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Glass glare effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>

                    {/* Inputs */}
                    <div className="space-y-8 relative z-10">
                        <div>
                            <label className="block text-gray-300 font-medium mb-3">Platform Seçin (Select Platform)</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setPlatform('spotify')}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${platform === 'spotify' ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    Spotify
                                </button>
                                <button
                                    onClick={() => setPlatform('apple')}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${platform === 'apple' ? 'bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    Apple Music
                                </button>
                                <button
                                    onClick={() => setPlatform('youtube')}
                                    className={`py-3 rounded-xl border text-sm font-medium transition-all ${platform === 'youtube' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'}`}
                                >
                                    YouTube
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-3">
                                <label className="block text-gray-300 font-medium">Toplam Dinlenme (Total Streams)</label>
                                <span className="text-2xl font-bold text-white">{new Intl.NumberFormat('en-US').format(streams)}</span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="10000000"
                                step="1000"
                                value={streams}
                                onChange={(e) => setStreams(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-2 mt-2">
                                <span>1K</span>
                                <span>10M+</span>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="bg-black/40 rounded-2xl p-8 border border-white/5 text-center flex flex-col justify-center h-full relative z-10">
                        <p className="text-gray-400 mb-2 uppercase tracking-widest text-sm font-bold">Tahmini Kazanç (Estimated Earnings)</p>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={`${platform}-${streams}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <p className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4">
                                    ${calculateEarnings()}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                            *Bu tutarlar brüttür. Dağıtım şirketinizin (DistroKid, TuneCore vb.) komisyonları düşüldükten sonra net tutar değişebilir. <br />
                            <span className="text-purple-400 font-medium mt-2 block">WBBT Records ile dağıtırsanız %100'ü sizin olur.</span>
                        </p>
                    </div>
                </div>

                <div className="mt-20 prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Spotify Dinlenme Geliri Neye Göre Değişir?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">1. Dinleyicinin Ülkesi</h3>
                            <p className="text-gray-400 text-sm">ABD (Tier 1) üzerinden gelen 1.000 dinlenme ortalama $3-$4 kazandırırken, Türkiye (Tier 3) gibi ülkelerden gelen streamler $0.5-$1 arasında kazandırır.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">2. Hesap Türü (Premium vs Free)</h3>
                            <p className="text-gray-400 text-sm">Spotify Premium kullanıcılarının dinlemeleri, reklam destekli ücretsiz kullanıcıların dinlemelerinden çok daha yüksek ödeme sağlar.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">3. Dağıtım Şirketi (Distributor) Anlaşmanız</h3>
                            <p className="text-gray-400 text-sm">Eğer distribütörünüz %15-20 arası bir pay alıyorsa, hesaplanan tutarın sadece %80'i elinize geçer. WBBT Records sanatçıların %100 telif hakkını korur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
