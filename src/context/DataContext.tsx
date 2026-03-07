import React, { createContext, useContext } from 'react';
import { ARTISTS, RELEASES, BLOG_POSTS, ABOUT_CONTENT } from '../data/siteData';
import { Artist, Release, BlogPost, AboutContent } from '../types';

// =============================================================================
// STATIC DATA CONTEXT - No backend, no API calls, just pure static data
// =============================================================================

interface DataContextType {
    artists: Artist[];
    releases: Release[];
    blogPosts: BlogPost[];
    aboutContent: AboutContent;
}

const DataContext = createContext<DataContextType>({
    artists: ARTISTS,
    releases: RELEASES,
    blogPosts: BLOG_POSTS,
    aboutContent: ABOUT_CONTENT,
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    // All data is static - imported directly from siteData.ts
    // No loading states, no API calls, no authentication needed

    return (
        <DataContext.Provider value={{
            artists: ARTISTS,
            releases: RELEASES,
            // Sort blog posts by ID (newest id first) instead of date parsing to avoid NaN errors on mixed languages
            blogPosts: [...BLOG_POSTS].sort((a, b) => b.id - a.id),
            aboutContent: ABOUT_CONTENT,
        }}>
            {children}
        </DataContext.Provider>
    );
};
