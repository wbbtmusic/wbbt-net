import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtistCard } from '../components/Cards';
import { useData } from '../context/DataContext';

import SEO from '../components/SEO';
import { generateOrganizationSchema } from '../utils/seoUtils';

const ArtistsPage = () => {
    const navigate = useNavigate();
    const { artists } = useData();

    const artistsListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": artists.map((artist, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.wbbt.net/artists/${artist.id}`,
            "name": artist.name
        }))
    };

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
            <SEO
                title="Artists & Roster | WBBT Records"
                description="Discover the WBBT Records artist roster. From EDM prodigies to Dark Pop visionaries, meet the talent defining the next generation of sound."
                keywords="WBBT Records Artists, Music Artists, Record Label Roster, Independent Musicians, Electronic Music Artists, EDM Artists, Pop Artists, WBBT, Oyku, Hugola, Voxa, Ava Aurora, Discover New Artists, Türk Sanatçılar, EDM Müzisyen, Bağımsız Müzisyen"
                schema={[generateOrganizationSchema(), artistsListSchema]}
            />
            <header className="mb-24">
                <h1 className="font-display text-8xl md:text-9xl font-black tracking-tighter mb-4 text-white">ROSTER</h1>
                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-purple-900/50" />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map(artist => (
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
        </div>
    );
};

export default ArtistsPage;
