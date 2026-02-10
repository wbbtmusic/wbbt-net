import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Globe2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Marquee, PartnersMarquee } from '../components/Marquee';
import { ReleaseCard, ArtistCard } from '../components/Cards';
import { useData } from '../context/DataContext';
import { HeroParticleText } from '../components/ThreeBackground';
import SEO from '../components/SEO';
import { generateOrganizationSchema, generateWebSiteSchema } from '../utils/seoUtils';

const HomePage = () => {
    const navigate = useNavigate();
    const { releases, artists } = useData();

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
            <SEO
                schema={[generateOrganizationSchema(), generateWebSiteSchema()]}
                title="WBBT Records | Free Music Distribution & Independent Record Label"
                description="UK-based independent record label offering free music distribution to Spotify, Apple Music & 150+ platforms. Artist development, marketing, PR & creative services. Bedava müzik dağıtımı, bağımsız kayıt etiketi."
                keywords="WBBT Records, Free Music Distribution, Record Label, Independent Label, Bedava Müzik Dağıtımı, Kayıt Etiketi, Bağımsız Sanatçı, Müzik Dağıtım Platformu, Artist Development, EDM, Dark Pop, London"
            />

            {/* Semantic H1 for SEO (Visually removed but present for bots) */}
            <h1 className="sr-only">WBBT Records - Independent Record Label & Music Distributor UK</h1>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-20 pt-0 relative"
            >
                {/* 3D Particle Text */}
                <div className="w-full h-[40vh] md:h-[50vh] relative hero-particle-container">
                    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                        <HeroParticleText />
                    </Canvas>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 border-t border-white/10 pt-4 relative z-10 gap-4">
                    <p className="text-sm uppercase tracking-widest text-gray-400 max-w-md group hover:text-purple-300 transition-colors">
                        A movement born from the digital void. Monochromatic aesthetics meet technicolor soundscapes.
                    </p>
                    <p className="text-xl font-display font-bold text-white">EST. 2020</p>
                </div>
            </motion.div>

            <Marquee />

            <section className="mb-20 relative z-10">
                <div className="flex justify-between items-baseline mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-purple-500 rounded-full inline-block animate-pulse" /> Latest Releases
                    </h2>
                    <Link to="/releases" className="text-xs uppercase tracking-widest hover:text-purple-400 hover:underline text-white">View All</Link>
                </div>

                <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                    {releases.slice(0, 6).map(release => (
                        <ReleaseCard key={release.id} release={release} />
                    ))}
                </div>
            </section>

            {/* Mission & Commission Section */}
            <section className="mb-40 relative z-10 max-w-4xl mx-auto text-center px-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />

                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 relative z-10">
                    BY ARTISTS, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">FOR ARTISTS.</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-10 relative z-10">
                    We built the system we wished we had. A full-service distribution powerhouse designed to protect your rights, amplify your reach, and ensure you get paid what you deserve. No corporate games, just pure support.
                </p>

                <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 relative z-10 hover:bg-white/10 transition-colors group">
                    <p className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">Transparent Pricing</p>
                    <p className="text-sm md:text-base text-gray-400 max-w-2xl">
                        We take a standard <span className="text-white font-bold">30% commission</span>, allowing us to invest back into your career.
                        <br className="hidden md:block" />
                        <span className="opacity-70 text-xs md:text-sm mt-2 block">
                            (Flexible rates available depending on agreement & roster scope)
                        </span>
                    </p>
                </div>
            </section>

            {/* Statistics Strip Section */}
            <section className="mb-40 relative z-10">
                <div className="border-y border-white/20 bg-white/5 backdrop-blur-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
                        <div className="p-12 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                            <BarChart3 className="w-8 h-8 text-white mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-purple-400" />
                            <span className="font-display text-5xl md:text-6xl font-black tracking-tight text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2">320M+</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-purple-300 transition-colors">Total Streams</span>
                        </div>
                        <div className="p-12 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors relative overflow-hidden">
                            <Users className="w-8 h-8 text-white mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-purple-400" />
                            <span className="font-display text-5xl md:text-6xl font-black tracking-tight text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2">420+</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-purple-300 transition-colors">Artists Signed</span>
                            <span className="text-[10px] text-gray-600 mt-3 italic block opacity-70 group-hover:opacity-100 transition-opacity">
                                Unfortunately we can't show them all :)
                            </span>
                        </div>
                        <div className="p-12 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-colors">
                            <Globe2 className="w-8 h-8 text-white mb-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:text-purple-400" />
                            <span className="font-display text-5xl md:text-6xl font-black tracking-tight text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2">150+</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-purple-300 transition-colors">Countries Reached</span>
                        </div>
                    </div>
                </div>

                {/* Animated Partners Marquee */}
                <PartnersMarquee />
            </section>

            <section className="mb-40 relative z-10">
                <div className="flex justify-between items-baseline mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white">
                        <span className="w-2 h-2 bg-purple-500 rounded-full inline-block animate-pulse" /> Top Artists
                    </h2>
                    <Link to="/artists" className="text-xs uppercase tracking-widest hover:text-purple-400 hover:underline text-white">Full Roster</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {artists.slice(0, 4).map(artist => (
                        <ArtistCard
                            key={artist.id}
                            artist={artist}
                            onClick={() => {
                                if (artist.comingSoon) return;
                                navigate(`/artists/${artist.id}`);
                            }}
                        />
                    ))}
                </div>
            </section>

            <section className="py-24 border-t border-b border-white/10 text-center relative z-10 rounded-3xl bg-white/5 backdrop-blur-sm overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h2 className="font-display text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase opacity-90 relative text-white">Send Your<br />Demo</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg font-light relative">
                    We are always listening. If you have the sound of the future, we want to hear it.
                </p>
                <a
                    href="https://app.wbbt.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 border border-purple-500/30 rounded-full text-white text-sm font-bold uppercase tracking-[0.2em] hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 relative shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)]"
                >
                    Submit Now
                </a>
            </section>
        </div>
    );
};

export default HomePage;
