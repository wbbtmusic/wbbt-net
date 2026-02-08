import React from 'react';
import { ReleaseCard } from '../components/Cards';
import { useData } from '../context/DataContext';

import SEO from '../components/SEO';
import { generateOrganizationSchema } from '../utils/seoUtils';

const ReleasesPage = () => {
    const { releases } = useData();

    const releasesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": releases.slice(0, 20).map((release, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": "https://wbbt.net/releases", // Ideally this would be individual release pages, but we link to the list
            "name": `${release.title} - ${release.artist}`
        }))
    };

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
            <SEO
                title="New Music Releases | WBBT Records"
                description="Stream the latest releases from WBBT Records. Fresh EDM, Pop, and Experimental tracks from our diverse roster of independent artists."
                keywords="New Music, Music Releases, Spotify Releases, EDM Tracks, Pop Songs, WBBT Records Discography"
                schema={[generateOrganizationSchema(), releasesSchema]}
            />
            <header className="mb-24">
                <h1 className="font-display text-8xl md:text-9xl font-black tracking-tighter mb-4 text-white">RELEASES</h1>
                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-purple-900/50" />
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {releases.map(release => (
                    <ReleaseCard key={release.id} release={release} />
                ))}
            </div>
        </div>
    );
};

export default ReleasesPage;
