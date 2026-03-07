import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-4">
            <SEO
                title="404 - Page Not Found | WBBT Records"
                description="The page you are looking for does not exist. Return to WBBT Records."
                noindex={true}
            />

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[100px] rounded-full"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-2xl mx-auto text-center"
            >
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-8xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 mb-6 tracking-tighter"
                >
                    404
                </motion.h1>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Track Not Found</h2>
                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto">
                    Looks like this frequency is dead. The release might have been taken down, or the URL is incorrect.
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-sm"
                    >
                        Return to Homepage
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
