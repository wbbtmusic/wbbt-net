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

    const finalTitle = title || pageSEO?.seo.title || "WBBT Records | UK Independent Record Label & Distributor";
    const finalDesc = description || pageSEO?.seo.description || "WBBT Records is a premier UK-based independent record label empowering artists with distribution, marketing, and creative services. Home of WBBT, Oyku, and future-forward music.";
    const finalImage = image || "https://static.wixstatic.com/media/27c1cc_ddcac3da9bea4394b990d38b83009142~mv2.jpg";
    const finalKeywords = keywords || "WBBT Records, Record Label UK, Independent Label, Music Distribution, Electronic Music, Dark Pop, Artist Development";

    const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

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
