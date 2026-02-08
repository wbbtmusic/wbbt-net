import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Instagram, Twitter, Mail, ArrowRight, Play, X, Headphones, Mic2, MonitorPlay } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ReleaseCard } from '../components/Cards';

import SEO from '../components/SEO';

const ArtistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { artists, releases } = useData();
    const [showReleasesModal, setShowReleasesModal] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showReleasesModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showReleasesModal]);

    const artist = artists.find(a => a.id === id);

    if (!artist) {
        return (
            <div className="pt-40 text-center text-white h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
                <p className="text-gray-400 mb-8">The artist you are looking for does not exist or has been removed.</p>
                <button onClick={() => navigate('/artists')} className="px-6 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-700 transition-colors">Back to Roster</button>
            </div>
        );
    }

    // Schema for MusicGroup/Person
    const artistSchema = {
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        "name": artist.name,
        "url": `https://www.wbbt.net/artists/${artist.id}`,
        "image": artist.image,
        "description": artist.bio,
        "sameAs": Object.values(artist.links)
    };

    // Improved release filtering - check if artist name appears in the release artist field
    const artistName = artist.name.toUpperCase();
    const artistReleases = releases.filter(r => {
        const releaseArtist = r.artist.toUpperCase();
        // Direct match or collaboration (X, feat., &, vs, with)
        return releaseArtist === artistName ||
            releaseArtist.includes(artistName + ' X') ||
            releaseArtist.includes('X ' + artistName) ||
            releaseArtist.includes(artistName + ' &') ||
            releaseArtist.includes('& ' + artistName) ||
            releaseArtist.startsWith(artistName + ' ') ||
            releaseArtist.endsWith(' ' + artistName) ||
            releaseArtist === artistName;
    });

    return (
        <div className="min-h-screen bg-[#050505]">
            <SEO
                title={`${artist.name} | WBBT Records Artist`}
                description={artist.bio.substring(0, 160)}
                image={artist.image}
                keywords={`${artist.name}, WBBT Records, ${artist.role}, Music Artist, Electronic Music`}
                schema={artistSchema}
            />
            {/* Close Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-8 right-8 z-50 p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Hero Header */}
            <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />

                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    src={artist.banner}
                    className="w-full h-full object-cover object-top opacity-80"
                />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-4 py-2 bg-purple-600/90 backdrop-blur-md text-white border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
                                {artist.role}
                            </span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-6xl md:text-[10rem] leading-[0.8] font-black text-white mix-blend-difference mb-4 md:mb-8">
                            {artist.name}
                        </h1>
                        <div className="flex gap-2 md:gap-4 flex-wrap">
                            {Object.entries(artist.links).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 md:p-4 border border-white/20 rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-white"
                                >
                                    {platform === 'instagram' && <Instagram size={20} />}
                                    {platform === 'twitter' && <Twitter size={20} />}
                                    {platform === 'spotify' && <Headphones size={20} />}
                                    {platform === 'youtube' && <MonitorPlay size={20} />}
                                    {platform === 'apple' && <Mic2 size={20} />}
                                    {platform === 'soundcloud' && <Globe size={20} />}
                                </a>
                            ))}
                            <a
                                href={`mailto:${artist.email}`}
                                className="p-3 md:p-4 border border-white/20 rounded-full hover:bg-purple-600 hover:border-purple-600 hover:scale-110 transition-all duration-300 text-white"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-24 px-4 md:px-24 mb-32 mt-6 md:-mt-20 relative z-30">
                {/* BIO */}
                <div className="lg:col-span-7">
                    <p className="text-2xl md:text-4xl font-light leading-relaxed text-gray-300 mb-16">
                        {artist.bio}
                    </p>

                    <div className="mb-20">
                        <h3 className="font-bold text-lg mb-8 uppercase tracking-widest flex items-center gap-2 text-white">
                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Top Tracks
                        </h3>
                        <div className="space-y-2">
                            {artist.topTracks.length > 0 ? artist.topTracks.map((track, i) => (
                                <div key={i} className="group flex items-center justify-between p-6 border border-white/5 hover:border-purple-500/30 hover:bg-purple-900/10 rounded-xl transition-all duration-300 cursor-pointer text-white">
                                    <div className="flex items-center gap-6">
                                        <span className="text-4xl font-black text-white/5 group-hover:text-purple-500/50 transition-colors">0{i + 1}</span>
                                        <div>
                                            <h4 className="font-bold text-xl group-hover:text-purple-300 transition-colors">{track}</h4>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest">{artist.name}</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 transition-all">
                                        <Play size={20} className="ml-1 text-white" />
                                    </div>
                                </div>
                            )) : (
                                <div className="text-gray-500 italic">No tracks listed yet.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SIDEBAR info */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="p-8 border border-white/10 rounded-2xl bg-[#0a0a0a]">
                        <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Latest Release</h3>
                        {artistReleases.length > 0 ? (
                            <ReleaseCard release={artistReleases[0]} />
                        ) : (
                            <div className="text-gray-500 italic">No releases found.</div>
                        )}
                        {artistReleases.length > 1 && (
                            <button
                                onClick={() => setShowReleasesModal(true)}
                                className="w-full mt-6 py-4 border border-white/10 text-white rounded-xl hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            >
                                View All Releases ({artistReleases.length}) <ArrowRight size={14} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-6 bg-white/5 rounded-2xl text-center">
                            <div className="text-3xl font-black text-white mb-1">{artistReleases.length}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">Total Releases</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Releases Modal */}
            <AnimatePresence>
                {showReleasesModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg overflow-y-auto overscroll-contain"
                        onClick={() => setShowReleasesModal(false)}
                        data-lenis-prevent
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ delay: 0.1 }}
                            className="min-h-screen py-10 md:py-20 px-4 md:px-24"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
                                <div>
                                    <h2 className="text-3xl md:text-6xl font-black text-white mb-2">
                                        All Releases
                                    </h2>
                                    <p className="text-gray-400 text-sm md:text-lg">{artist.name} • {artistReleases.length} releases</p>
                                </div>
                                <button
                                    onClick={() => setShowReleasesModal(false)}
                                    className="p-3 md:p-4 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Releases Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                                {artistReleases.map((release, index) => (
                                    <motion.div
                                        key={release.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ReleaseCard release={release} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArtistDetail;
