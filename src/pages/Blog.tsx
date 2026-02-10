import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import TiltCard from '../components/TiltCard';
import { BookOpen, Calendar, User, Tag } from 'lucide-react';

import SEO from '../components/SEO';

const BlogPage = () => {
    const { blogPosts } = useData();

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen relative z-10">
            <SEO
                title="Music Industry Blog | Tips, Tutorials & News — WBBT Records"
                description="Free guides on music production, marketing, distribution, Spotify growth, TikTok strategy, and artist development. Expert tips and industry insights from WBBT Records. Müzik prodüksiyon ipuçları."
                keywords="Music Blog, Music Production Tips, How to Grow on Spotify, TikTok Music Marketing, Music Distribution Guide, Music Industry News, Artist Development Tips, Record Label Blog, Music Marketing Strategy, Free Music Resources, Müzik Prodüksiyon, Sanatçı İpuçları, Müzik Endüstrisi"
            />
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <header className="mb-24 relative">
                <h1 className="font-display text-8xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-purple-500/50">
                    JOURNAL
                </h1>
                <div className="w-full h-[1px] bg-gradient-to-r from-white/20 via-purple-500/50 to-transparent" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.sort((a, b) => b.id - a.id).length > 0 ? (
                    blogPosts.map(post => {
                        const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
                        return (
                            <Link key={post.id} to={`/blog/${categorySlug}/${post.slug}`}>
                                <TiltCard className="bg-black/40 backdrop-blur-sm group cursor-pointer border border-white/10 hover:border-purple-500/50 rounded-2xl overflow-hidden h-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                                    <div className="aspect-video relative overflow-hidden">
                                        <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-lg">
                                                <Tag size={10} className="text-purple-400" /> {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-6 text-xs text-gray-400 mb-4 uppercase tracking-widest font-medium">
                                            <span className="flex items-center gap-2"><Calendar size={12} className="text-purple-500" /> {post.date}</span>
                                            <span className="flex items-center gap-2"><User size={12} className="text-cyan-500" /> {post.author}</span>
                                        </div>
                                        <h3 className="font-display text-2xl font-bold mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all text-white">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-sm line-clamp-3 mb-6">
                                            {post.metaDesc || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 transition-all group-hover:gap-3">
                                            Read Article <BookOpen size={14} />
                                        </div>
                                    </div>
                                </TiltCard>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 glow-box-purple">
                            <BookOpen className="text-purple-500" size={48} />
                        </div>
                        <h3 className="font-display text-3xl font-bold text-white mb-2">No Articles Yet</h3>
                        <p className="text-gray-500">Check back later for the latest news and updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
