import { Artist, Release, BlogPost } from '../types';

export const generateOrganizationSchema = () => ({
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
    "image": "https://www.wbbt.net/favicon.png",
    "description": "WBBT Records is a premier UK-based independent record label founded in 2020, specializing in EDM, Dark Pop, and K-Pop. We offer free music distribution with 100% royalties, Vevo channel distribution, and Spotify playlist pitching.",
    "sameAs": [
        "https://www.wikidata.org/wiki/Q138641325",
        "https://www.instagram.com/wbbtmusic",
        "https://twitter.com/wbbtrecords",
        "https://www.youtube.com/@WBBTRecords",
        "https://www.linkedin.com/company/wbbt-records",
        "https://open.spotify.com/artist/1oP8YujvJmuBtwoMD6r2aA",
        "https://music.apple.com/us/artist/wbbt/1667468622",
        "https://www.discogs.com/label/4478524-WBBT-Records",
        "https://musicbrainz.org/label/WBBT-Records"
    ],
    "founder": {
        "@type": "Person",
        "@id": "https://www.wbbt.net/#founder",
        "name": "Burak Can Öğüt",
        "url": "https://www.wbbt.net/artists/wbbt",
        "jobTitle": "Founder & CEO",
        "sameAs": [
            "https://www.wikidata.org/wiki/Q138641365",
            "https://www.instagram.com/burakcanogut",
            "https://www.linkedin.com/in/burakcanogut",
            "https://open.spotify.com/artist/1oP8YujvJmuBtwoMD6r2aA"
        ]
    },
    "foundingDate": "2020",
    "foundingLocation": {
        "@type": "Place",
        "name": "London, United Kingdom"
    },
    "areaServed": "Worldwide",
    "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 2,
        "maxValue": 10
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "UNIT 2 HORTON INDUSTRIAL PARK, HORTON ROAD",
        "addressLocality": "WEST DRAYTON",
        "addressRegion": "MIDDLESEX",
        "postalCode": "UB7 8JD",
        "addressCountry": "GB"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@wbbt.net",
        "url": "https://www.wbbt.net/contact"
    },
    "knowsAbout": ["Music Distribution", "Record Label", "Artist Management", "Music Production", "EDM", "Dark Pop", "K-Pop"],
    "genre": ["Electronic Dance Music", "Dark Pop", "K-Pop", "Phonk", "Hip-Hop"],
    "member": [
        { "@type": "Person", "name": "HUGOLA", "url": "https://www.wbbt.net/artists/hugola" },
        { "@type": "Person", "name": "OYKU", "url": "https://www.wbbt.net/artists/oyku" },
        { "@type": "Person", "name": "AVA AURORA", "url": "https://www.wbbt.net/artists/ava-aurora" },
        { "@type": "Person", "name": "VOXA", "url": "https://www.wbbt.net/artists/voxa" },
        { "@type": "Person", "name": "VIXT", "url": "https://www.wbbt.net/artists/vixt" },
        { "@type": "Person", "name": "brokeplus", "url": "https://www.wbbt.net/artists/brokeplus" }
    ]
});

export const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WBBT Records",
    "url": "https://www.wbbt.net",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.wbbt.net/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
});

export const generateMusicGroupSchema = (artist: Artist) => ({
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": artist.name,
    "url": `https://www.wbbt.net/artists/${artist.id}`,
    "image": artist.image,
    "description": artist.bio,
    "sameAs": Object.values(artist.links || {}).filter(Boolean),
    "genre": artist.role.split('&')[0].trim(),
    "member": {
        "@type": "Person",
        "name": artist.realName
    }
});

export const generateMusicAlbumSchema = (release: Release) => ({
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": release.title,
    "byArtist": {
        "@type": "MusicGroup",
        "name": release.artist
    },
    "image": release.cover,
    "url": `https://www.wbbt.net/releases`,
    "albumProductionType": "https://schema.org/StudioAlbum",
    "numTracks": 1 // Simplified as we don't have track counts in basic Release type yet
});

export const generateBlogPostingSchema = (post: BlogPost) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [
        post.image
    ],
    "datePublished": post.date,
    "dateModified": post.lastModified || post.date,
    "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://www.wbbt.net/about"
    },
    "publisher": {
        "@type": "Organization",
        "name": "WBBT Records",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.wbbt.net/favicon.png"
        }
    },
    "description": post.metaDesc || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.wbbt.net/blog/${post.slug}`
    },
    "keywords": post.tags || post.category
});

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.item.startsWith('http') ? item.item : `https://www.wbbt.net${item.item}`
    }))
});

export const generateServiceSchema = (serviceName: string, serviceType: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceType,
    "provider": {
        "@type": "Organization",
        "name": "WBBT Records",
        "url": "https://www.wbbt.net"
    },
    "description": description,
    "areaServed": "Global",
    "url": "https://www.wbbt.net/services"
});

export const generateContactPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Submit Demo | Contact WBBT Records",
    "url": "https://www.wbbt.net/submit",
    "mainEntity": {
        "@type": "Organization",
        "name": "WBBT Records",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Girişimci / Demo Submission",
            "email": "demo@wbbt.net",
            "url": "https://app.wbbt.net"
        }
    }
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

