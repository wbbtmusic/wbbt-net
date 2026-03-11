import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import seoData from '../../seo_summary.json';
import { PageSEO } from '../types';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    keywords?: string;
    noindex?: boolean;
    nofollow?: boolean;
    schema?: Record<string, any> | Record<string, any>[];
}

const SEO = ({
    title,
    description,
    image,
    type = 'website',
    keywords,
    noindex = false,
    nofollow = false,
    schema
}: SEOProps) => {
    const location = useLocation();
    // Smart canonical: remove trailing slash unless it's root, ensure HTTPS and www if needed
    const baseUrl = 'https://www.wbbt.net';
    const rawPath = location.pathname;
    const cleanPath = rawPath === '/' ? rawPath : rawPath.replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${cleanPath}`;

    // Fallback to static data if props aren't provided
    const pageSEO = !title ? (seoData as PageSEO[]).find(item => item.url === canonicalUrl || item.url === `${baseUrl}${rawPath}`) : null;

    const finalTitle = title || pageSEO?.seo.title || "WBBT Records | Unlimited Free Music Releases & Label Services";
    const finalDesc = description || pageSEO?.seo.description || "Upload your music to Spotify, Apple Music & TikTok for free. Keep 100% of your royalties. WBBT Records is the next-gen record label offering free release services, global radio pitching, and artist development.";
    const finalImage = image || "https://static.wixstatic.com/media/27c1cc_ddcac3da9bea4394b990d38b83009142~mv2.jpg";
    const finalKeywords = keywords || "Free Music Distribution, Best Free Music Distributor, Free Record Label Services, 100% Royalties, Bedava Müzik Dağıtımı, Upload Music to Spotify, Keep 100% Royalties, Vevo Channel Free, Radio PR, Independent Record Label, Music Distribution Service, Spotify Gelir Hesaplama, Unchained Music Review, Music Marketing, Artist Development, Royalty Collection, Kayıt Etiketi, Müzik Dağıtım Platformu, EDM, Dark Pop, London Record Label, Burak Can Öğüt, Free Vevo Distribution, Get Vevo Channel for Free, Fast Music Distribution, RouteNote Alternative, Amuse Alternative, DistroKid Alternative";

    // Build the Organization & MusicLabel Core Schemas
    const baseSchemas = [
        {
            "@context": "https://schema.org",
            "@type": ["MusicGroup", "Organization"],
            "@id": "https://www.wbbt.net/#organization",
            "name": "WBBT Records",
            "legalName": "WBBT Music Group Inc.",
            "alternateName": ["WBBT Recording Limited", "WBBT Music Group", "WBBT"],
            "url": "https://www.wbbt.net",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.wbbt.net/favicon.png",
                "width": 512,
                "height": 512
            },
            "sameAs": [
                "https://www.wikidata.org/wiki/Q138641325",
                "https://www.instagram.com/wbbtmusic",
                "https://twitter.com/wbbtrecords",
                "https://www.youtube.com/@WBBTRecords",
                "https://www.linkedin.com/company/wbbt-records",
                "https://open.spotify.com/artist/1oP8YujvJmuBtwoMD6r2aA",
                "https://music.apple.com/us/artist/wbbt/1667468622",
                "https://www.discogs.com/label/4478524-WBBT-Records"
            ],
            "description": "WBBT Records is a premier UK-based independent record label founded in 2020, specializing in EDM, Dark Pop, and K-Pop. Free music distribution with 100% royalties, Vevo channel distribution, and Spotify playlist pitching.",
            "foundingDate": "2020",
            "foundingLocation": {
                "@type": "Place",
                "name": "London, United Kingdom"
            },
            "founder": {
                "@type": "Person",
                "name": "Burak Can Öğüt",
                "sameAs": ["https://www.wikidata.org/wiki/Q138641365"]
            }
        }
    ];

    const schemas = Array.isArray(schema) ? [...baseSchemas, ...schema] : schema ? [...baseSchemas, schema] : baseSchemas;

    return (
        <Helmet>
            <html lang="en" />
            <title>{finalTitle}</title>
            <meta name="description" content={finalDesc} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Robots */}
            <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />

            {/* Geo & Language Targeting */}
            <meta httpEquiv="content-language" content="en, tr" />
            <meta name="geo.region" content="GB" />
            <meta name="geo.region" content="TR" />
            <meta name="geo.placename" content="London, United Kingdom" />

            {/* Hreflang - Bilingual targeting */}
            <link rel="alternate" hrefLang="en" href={canonicalUrl} />
            <link rel="alternate" hrefLang="tr" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image" content={finalImage} />
            <meta property="og:site_name" content="WBBT Records" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDesc} />
            <meta name="twitter:image" content={finalImage} />

            {/* Structured Data (JSON-LD) */}
            {schemas.map((s, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
