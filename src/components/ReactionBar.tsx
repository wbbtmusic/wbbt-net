import React, { useState } from 'react';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReactionBarProps {
    slug: string;
}

const ReactionBar: React.FC<ReactionBarProps> = ({ slug }) => {
    const [likes, setLikes] = useState(124); // Mock start count
    const [hasLiked, setHasLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        if (!hasLiked) {
            setLikes(p => p + 1);
            setHasLiked(true);
        } else {
            setLikes(p => p - 1);
            setHasLiked(false);
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl"
        >
            <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${hasLiked ? 'bg-purple-600/20 text-purple-400' : 'hover:bg-white/10 text-white'
                    }`}
            >
                <Heart size={20} className={hasLiked ? "fill-current" : ""} />
                <span className="text-sm font-bold">{likes}</span>
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-all duration-300 ${isBookmarked ? 'text-green-400' : 'text-white hover:bg-white/10'
                    }`}
            >
                <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
            </button>

            <button className="p-2 rounded-full text-white hover:bg-white/10 transition-all duration-300" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <Share2 size={20} />
            </button>
        </motion.div>
    );
};

export default ReactionBar;
