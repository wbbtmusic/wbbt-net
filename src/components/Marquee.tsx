import React from 'react';

export const Marquee = () => (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-white/5 backdrop-blur-sm py-6 mb-20">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
            {Array(8).fill("UNLIMITED FREE RELEASES • WBBT RECORDS • FUTURE OF SOUND • DARK POP • EDM • PHONK • ").map((text, i) => (
                <span key={i} className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-white to-purple-600 opacity-90">{text}</span>
            ))}
        </div>
        <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap flex gap-16 items-center">
            {Array(8).fill("UNLIMITED FREE RELEASES • WBBT RECORDS • FUTURE OF SOUND • DARK POP • EDM • PHONK • ").map((text, i) => (
                <span key={i} className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-white to-purple-600 opacity-90">{text}</span>
            ))}
        </div>
    </div>
);

export const PartnersMarquee = () => {
    const partners = [
        "SPOTIFY", "APPLE MUSIC", "BEATPORT", "SOUNDCLOUD", "YOUTUBE MUSIC",
        "DEEZER", "TIDAL", "AMAZON MUSIC", "TIKTOK", "INSTAGRAM", "BANDCAMP",
        "TRAXSOURCE", "JUNO DOWNLOAD", "SHAZAM", "PANDORA"
    ];

    return (
        <div className="relative flex overflow-x-hidden opacity-40 hover:opacity-80 transition-opacity duration-700 py-6 mt-8">
            <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                {partners.concat(partners).map((text, i) => (
                    <span key={i} className="text-lg font-bold tracking-[0.2em] text-white/80 hover:text-purple-400 transition-colors">{text}</span>
                ))}
            </div>
            <div className="absolute top-0 py-6 animate-marquee2 whitespace-nowrap flex gap-16 items-center">
                {partners.concat(partners).map((text, i) => (
                    <span key={i} className="text-lg font-bold tracking-[0.2em] text-white/80 hover:text-purple-400 transition-colors">{text}</span>
                ))}
            </div>
        </div>
    );
};
