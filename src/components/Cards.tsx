import React, { useRef, useEffect, useState } from 'react';
import TiltCard from './TiltCard';
import { Lock, Play } from 'lucide-react';
import { Artist, Release } from '../types';

// Hook for detecting if element is in viewport (for mobile scroll-based effects)
const useInView = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger when element is 30% visible
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, isInView };
};

interface ArtistCardProps {
    artist: Artist;
    onClick?: () => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
    const { ref, isInView } = useInView();

    return (
        <div ref={ref}>
            <TiltCard
                onClick={artist.comingSoon ? undefined : onClick}
                className={`group relative aspect-[3/4] w-full bg-[#111] overflow-hidden ${artist.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'} border border-white/10 rounded-none hover:border-purple-500/50 transition-colors`}
            >
                <img
                    src={artist.image}
                    alt={artist.name}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover filter contrast-125 transition-all duration-700 ${artist.comingSoon
                        ? 'opacity-30 blur-sm grayscale'
                        : isInView
                            ? 'grayscale-0 md:grayscale md:group-hover:grayscale-0'
                            : 'grayscale'
                        }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-colors ${isInView ? 'via-purple-900/10 md:via-transparent md:group-hover:via-purple-900/10' : ''}`} />

                {artist.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border border-white/20 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
                            <Lock size={14} className="text-gray-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Locked</span>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-z-10">
                    <h3 className="font-display text-4xl font-black mb-1 tracking-tight text-white mix-blend-difference group-hover:text-purple-100 transition-colors">
                        {artist.name}
                    </h3>
                    <p className={`text-xs uppercase tracking-widest mb-4 transition-opacity duration-500 ${isInView ? 'opacity-100 text-purple-400 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'}`}>
                        {artist.role}
                    </p>
                    <div className={`w-full h-[1px] bg-purple-500 origin-left transition-transform duration-500 ${isInView ? 'scale-x-100 md:scale-x-0 md:group-hover:scale-x-100' : 'scale-x-0'}`} />
                </div>
            </TiltCard>
        </div>
    );
};

interface ReleaseCardProps {
    release: Release;
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release }) => {
    const { ref, isInView } = useInView();

    return (
        <div ref={ref}>
            <TiltCard
                className="min-w-[180px] md:min-w-[240px] bg-[#0a0a0a] group cursor-pointer hover:border-purple-500/50 border border-white/10 transition-colors"
                onClick={() => {
                    if (release.spotify) window.open(release.spotify, '_blank');
                }}
            >
                <div className="relative aspect-square overflow-hidden border-b border-white/10">
                    <img
                        src={release.cover}
                        alt={release.title}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-500 ${isInView
                            ? 'grayscale-0 md:grayscale md:group-hover:grayscale-0'
                            : 'grayscale'
                            }`}
                    />
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isInView ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0'}`}>
                        <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center bg-purple-600/80 backdrop-blur-md shadow-lg shadow-purple-500/50">
                            <Play size={20} fill="white" className="ml-1 text-white" />
                        </div>
                    </div>
                </div>
                <div className="pt-4 px-2 transform translate-z-10 pb-4">
                    <h4 className={`font-bold text-base leading-tight truncate transition-colors ${isInView ? 'text-purple-300 md:text-gray-200 md:group-hover:text-purple-300' : 'text-gray-200'}`}>{release.title}</h4>
                    <p className={`text-xs uppercase tracking-wider mt-1 truncate transition-colors ${isInView ? 'text-white md:text-gray-500 md:group-hover:text-white' : 'text-gray-500'}`}>{release.artist}</p>
                </div>
            </TiltCard>
        </div>
    );
};
