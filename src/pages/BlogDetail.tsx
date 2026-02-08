import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Calendar, User, Tag, ArrowLeft, X, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import QuizSection from '../components/QuizSection';
import { generateBlogPostingSchema, generateBreadcrumbSchema } from '../utils/seoUtils';

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { blogPosts } = useData();

    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="pt-40 text-center text-white h-screen flex flex-col items-center justify-center bg-[#050505]">
                <h1 className="text-4xl font-bold mb-4 text-gradient-purple">Post Not Found</h1>
                <button onClick={() => navigate('/blog')} className="px-6 py-3 bg-white/10 glass-panel rounded-full font-bold hover:bg-purple-600/20 transition-all border border-white/10">Back to Journal</button>
            </div>
        );
    }

    // Calculate Read Time (approx 200 words per minute)
    const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const breadcrumbs = [
        { name: 'Home', item: '/' },
        { name: 'Blog', item: '/blog' },
        { name: post.title, item: `/blog/${post.slug}` }
    ];

    return (
        <div className="min-h-screen w-full bg-[#050505] relative z-50 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <SEO
                title={`${post.title} | WBBT Records Journal`}
                description={post.metaDesc || post.content.substring(0, 160).replace(/<[^>]*>/g, '')}
                image={post.image}
                type="article"
                keywords={post.tags || post.category}
                schema={[generateBlogPostingSchema(post), generateBreadcrumbSchema(breadcrumbs)]}
            />

            {/* Close Button */}
            <button
                onClick={() => navigate('/blog')}
                className="fixed top-8 right-8 z-[100] p-4 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group shadow-2xl hover:shadow-purple-500/50"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* Hero Header - Immersive Parallax Feel */}
                <div className="h-[75vh] w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
                    <img
                        src={post.image}
                        alt={post.title}
                        fetchPriority="high"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 max-w-5xl mx-auto">
                        <div className="flex gap-4 mb-8">
                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-purple-900/20 glow-box-purple">
                                <Tag size={12} className="text-purple-400" /> {post.category}
                            </span>
                        </div>
                        <h1 className="font-display text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-8 text-sm text-gray-300 uppercase tracking-widest font-bold border-t border-white/10 pt-8">
                            <span className="flex items-center gap-2"><User size={14} className="text-cyan-400" /> {post.author}</span>
                            <span className="flex items-center gap-2"><Calendar size={14} className="text-purple-400" /> {post.date}</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-pink-400" /> {readTime} min read</span>
                        </div>
                    </div>
                </div>

                {/* Content Container - Narrower for Editorial Feel */}
                <article className="max-w-[800px] mx-auto px-6 py-20 text-gray-300 leading-relaxed text-lg lg:text-xl relative z-20">

                    {/* Intro / Hook (First paragraph styling) */}
                    <style>{`
                    .blog-content > p:first-of-type {
                        font-size: 1.35em;
                        line-height: 1.6;
                        color: #e5e7eb;
                        margin-bottom: 3rem;
                        font-weight: 300;
                        border-left: 4px solid #c084fc;
                        padding-left: 2rem;
                        background: linear-gradient(to right, rgba(192, 132, 252, 0.05), transparent);
                    }
                `}</style>

                    {/* Main Content Render */}
                    <div className="w-full overflow-hidden break-words blog-content">
                        <div
                            className="prose prose-invert prose-purple prose-lg max-w-none w-full
                        [&>p]:mb-8 [&>p]:leading-loose
                        [&>h2]:text-4xl [&>h2]:font-black [&>h2]:mb-8 [&>h2]:mt-20 [&>h2]:text-transparent [&>h2]:bg-clip-text [&>h2]:bg-gradient-to-r [&>h2]:from-white [&>h2]:to-purple-200 [&>h2]:tracking-tight
                        [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-12 [&>h3]:text-cyan-300
                        [&>ul]:list-none [&>ul]:pl-0 [&>ul]:mb-8 [&>ul]:space-y-4
                        [&>ul>li]:pl-8 [&>ul>li]:relative [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-3 [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-cyan-400 [&>ul>li]:before:rounded-full [&>ul>li]:before:shadow-[0_0_10px_rgba(34,211,238,0.8)]
                        [&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-8 [&>ol]:space-y-4 [&>ol>li::marker]:text-purple-400 [&>ol>li::marker]:font-bold
                        [&>blockquote]:border-l-0 [&>blockquote]:bg-white/5 [&>blockquote]:backdrop-blur-sm [&>blockquote]:border [&>blockquote]:border-white/10 [&>blockquote]:p-10 [&>blockquote]:my-16 [&>blockquote]:not-italic [&>blockquote]:text-2xl [&>blockquote]:font-medium [&>blockquote]:text-white [&>blockquote]:rounded-3xl [&>blockquote]:shadow-2xl [&>blockquote]:relative [&>blockquote]:overflow-hidden [&>blockquote]:glow-box-purple
                        [&>blockquote]:before:content-['\\201C'] [&>blockquote]:before:absolute [&>blockquote]:before:top-[-10px] [&>blockquote]:before:left-6 [&>blockquote]:before:text-[8rem] [&>blockquote]:before:text-purple-500/20 [&>blockquote]:before:font-serif
                        [&>img]:rounded-3xl [&>img]:w-full [&>img]:my-16 [&>img]:shadow-2xl [&>img]:border [&>img]:border-white/10
                        [&>a]:text-cyan-400 [&>a]:no-underline [&>a]:border-b [&>a]:border-cyan-400/30 hover:[&>a]:border-cyan-400 hover:[&>a]:text-cyan-300 hover:[&>a]:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all
                        [&>hr]:border-white/10 [&>hr]:my-20"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content, {
                                    ADD_TAGS: ['iframe', 'style', 'script', 'link', 'meta', 'div', 'span', 'applet', 'object'],
                                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'class', 'src', 'width', 'height', 'id', 'name', 'title', 'style', 'autoplay', 'loop', 'muted', 'playsinline', 'class']
                                })
                            }}
                        />
                    </div>

                    {/* Quiz Section (Interaction) */}
                    <QuizSection category={post.category} />



                    {/* Related Posts Section (To add length and value) */}
                    <aside className="mt-32 border-t border-white/10 pt-20">
                        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-12 flex items-center gap-4">
                            <span className="w-3 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            Read Next
                        </h3>
                        <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts
                                .filter(p => p.category === post.category && p.slug !== post.slug)
                                .slice(0, 3)
                                .map(related => (
                                    <div
                                        key={related.id}
                                        onClick={() => {
                                            navigate(`/blog/${related.slug}`);
                                            window.scrollTo(0, 0);
                                        }}
                                        className="group cursor-pointer glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/30"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors z-10" />
                                            <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                                                    {related.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-colors line-clamp-2">
                                                {related.title}
                                            </h4>
                                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-medium">
                                                <span>{related.date}</span>
                                                <span className="text-purple-500">•</span>
                                                <span>{related.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </nav>
                    </aside>

                </article>

                {/* Footer Nav */}
                <div className="border-t border-white/10 py-32 text-center mt-20 bg-gradient-to-b from-[#050505] to-purple-900/10 relative">
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all hover:tracking-[0.3em] duration-300 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Journal
                    </button>
                    <p className="mt-8 text-gray-500 text-sm">WBBT Records © 2026</p>
                </div>

            </motion.div>
        </div>
    );
};

export default BlogDetail;
